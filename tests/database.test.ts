import { PGlite } from "@electric-sql/pglite";
import { readFile } from "node:fs/promises";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
const alice = "00000000-0000-4000-8000-000000000001";
const bob = "00000000-0000-4000-8000-000000000002";
let db: PGlite;
async function asUser<T>(id: string, query: string) {
  await db.exec(
    `set role authenticated; select set_config('request.jwt.claim.sub','${id}',false);`,
  );
  try {
    return (await db.query<T>(query)).rows;
  } finally {
    await db.exec("reset role");
  }
}
beforeAll(async () => {
  db = new PGlite();
  await db.exec(
    `create role anon; create role authenticated; create schema auth; create table auth.users(id uuid primary key); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$; grant usage on schema auth to authenticated,anon; grant execute on function auth.uid() to authenticated,anon; insert into auth.users values('${alice}'),('${bob}');`,
  );
  await db.exec(
    await readFile(
      "supabase/migrations/20261022113603_learning_platform.sql",
      "utf8",
    ),
  );
  await db.exec(await readFile("supabase/seed.sql", "utf8"));
}, 30000);
afterAll(async () => {
  await db?.close();
});
describe("SQL authorization and real PostgreSQL RLS", () => {
  it("seed can run repeatedly without duplicate lessons", async () => {
    await db.exec(await readFile("supabase/seed.sql", "utf8"));
    expect(
      (
        await db.query<{ count: number }>(
          "select count(*)::int as count from public.lessons",
        )
      ).rows[0].count,
    ).toBe(19);
  });
  it("anonymous visitors read published content but cannot grade", async () => {
    await db.exec("set role anon");
    try {
      expect(
        (await db.query("select * from public.lessons")).rows,
      ).toHaveLength(19);
      await expect(
        db.query(
          "select public.submit_quiz('linux-filrettigheder',array[1,1])",
        ),
      ).rejects.toThrow(/permission denied/);
    } finally {
      await db.exec("reset role");
    }
  });
  it("users cannot read answer keys or write course content", async () => {
    await expect(
      asUser(alice, "select * from private.answer_keys"),
    ).rejects.toThrow(/permission denied/);
    await expect(
      asUser(alice, "update public.courses set title='changed'"),
    ).rejects.toThrow(/permission denied/);
  });
  it("enrollment is owner scoped and idempotent", async () => {
    await asUser(
      alice,
      `insert into public.enrollments(user_id,course_id) values('${alice}','system-security') on conflict(user_id,course_id) do nothing`,
    );
    await asUser(
      alice,
      `insert into public.enrollments(user_id,course_id) values('${alice}','system-security') on conflict(user_id,course_id) do nothing`,
    );
    expect(
      await asUser(alice, "select * from public.enrollments"),
    ).toHaveLength(1);
    expect(await asUser(bob, "select * from public.enrollments")).toHaveLength(
      0,
    );
    await expect(
      asUser(
        alice,
        `insert into public.enrollments(user_id,course_id) values('${bob}','network-security')`,
      ),
    ).rejects.toThrow(/row-level security/);
  });
  it("quiz scoring persists trusted progress and cannot be forged", async () => {
    const rows = await asUser<{ result: { score: number } }>(
      alice,
      "select public.submit_quiz('linux-filrettigheder',array[1,1]) as result",
    );
    expect(rows[0].result.score).toBe(100);
    expect(
      await asUser(alice, "select * from public.lesson_progress"),
    ).toHaveLength(1);
    expect(
      await asUser(bob, "select * from public.lesson_progress"),
    ).toHaveLength(0);
    expect(
      await asUser(bob, "select * from public.quiz_attempts"),
    ).toHaveLength(0);
    await expect(
      asUser(
        alice,
        `insert into public.lesson_progress(user_id,lesson_id) values('${alice}','mindste-privilegium')`,
      ),
    ).rejects.toThrow(/permission denied/);
    await expect(
      asUser(
        alice,
        `insert into public.quiz_attempts(user_id,quiz_id,score,answers) values('${alice}','mindste-privilegium',100,'[]')`,
      ),
    ).rejects.toThrow(/permission denied/);
  });
  it("failed attempts never complete a lesson", async () => {
    const rows = await asUser<{ result: { score: number } }>(
      bob,
      "select public.submit_quiz('linux-filrettigheder',array[0,0]) as result",
    );
    expect(rows[0].result.score).toBe(0);
    expect(
      await asUser(bob, "select * from public.lesson_progress"),
    ).toHaveLength(0);
  });
  it("rejects malformed answers before persistence", async () => {
    await expect(
      asUser(
        bob,
        "select public.submit_quiz('mindste-privilegium',array[99,0])",
      ),
    ).rejects.toThrow(/Invalid option/);
    await expect(
      asUser(bob, "select public.submit_quiz('mindste-privilegium',array[1])"),
    ).rejects.toThrow(/Invalid answer count/);
    await expect(
      asUser(
        bob,
        "select public.submit_quiz('mindste-privilegium',array[null,0]::integer[])",
      ),
    ).rejects.toThrow(/Invalid option/);
  });
  it("profile ownership cannot be reassigned", async () => {
    await asUser(
      bob,
      `insert into public.profiles(id,display_name) values('${bob}','Bob') on conflict(id) do update set display_name='Bob'`,
    );
    expect(
      await asUser(alice, `select * from public.profiles where id='${bob}'`),
    ).toHaveLength(0);
    await expect(
      asUser(
        bob,
        `update public.profiles set id='00000000-0000-4000-8000-000000000003' where id='${bob}'`,
      ),
    ).rejects.toThrow(/row-level security/);
  });
  it("manual lab completion remains private and cannot claim automatic validation", async () => {
    await asUser(
      alice,
      `insert into public.lab_progress(user_id,lab_id) values('${alice}','linux-permissions')`,
    );
    expect(await asUser(bob, "select * from public.lab_progress")).toHaveLength(
      0,
    );
    await expect(
      asUser(
        bob,
        `insert into public.lab_progress(user_id,lab_id,validation_method) values('${bob}','linux-permissions','automatic')`,
      ),
    ).rejects.toThrow(/check constraint/);
  });
  it("unpublished courses hide descendants and reject enrollment", async () => {
    await db.exec(
      "update public.courses set published=false where id='network-security'",
    );
    expect(
      await asUser(
        alice,
        "select * from public.lessons where id='trusselsmodellering'",
      ),
    ).toHaveLength(0);
    await expect(
      asUser(
        bob,
        `insert into public.enrollments(user_id,course_id) values('${bob}','network-security')`,
      ),
    ).rejects.toThrow(/row-level security/);
    await expect(
      asUser(
        bob,
        "select public.submit_quiz('trusselsmodellering',array[1,1])",
      ),
    ).rejects.toThrow(/Quiz unavailable/);
    await db.exec(
      "update public.courses set published=true where id='network-security'",
    );
  });
});
