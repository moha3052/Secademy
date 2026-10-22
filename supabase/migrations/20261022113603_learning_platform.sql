-- Public learning content, owner-scoped progress, and private quiz answer keys.
create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create table public.courses (
 id text primary key, slug text unique not null, title text not null, description text not null,
 difficulty text not null default 'beginner', published boolean not null default false,
 created_at timestamptz not null default now()
);
create table public.modules (
 id text primary key, course_id text not null references public.courses(id) on delete cascade,
 title text not null, position integer not null check(position>0), unique(course_id,position)
);
create table public.lessons (
 id text primary key, module_id text not null references public.modules(id) on delete cascade,
 slug text unique not null, title text not null, content_reference text not null,
 position integer not null check(position>0), published boolean not null default false,
 search_document tsvector generated always as (to_tsvector('simple',title || ' ' || slug)) stored,
 unique(module_id,position)
);
create index lessons_search_idx on public.lessons using gin(search_document);
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default '' check(length(display_name)<=60), avatar_url text,
 experience_level text check(experience_level in ('beginner','intermediate','advanced')),
 learning_goal text check(learning_goal in ('exams','career','development','interest')),
 learning_interest text check(learning_interest in ('system','network','ethical','python')),
 onboarded boolean not null default false, last_lesson_id text references public.lessons(id),
 created_at timestamptz not null default now()
);
create table public.enrollments (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 course_id text not null references public.courses(id), created_at timestamptz not null default now(), unique(user_id,course_id)
);
create table public.lesson_progress (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 lesson_id text not null references public.lessons(id), status text not null default 'completed' check(status='completed'),
 completed_at timestamptz not null default now(), unique(user_id,lesson_id)
);
create table public.quizzes (id text primary key, lesson_id text unique not null references public.lessons(id),title text not null);
create table public.questions (
 id text primary key,quiz_id text not null references public.quizzes(id) on delete cascade,
 question_type text not null check(question_type in ('multiple_choice','true_false')),prompt text not null,
 position integer not null check(position>=0),unique(quiz_id,position)
);
create table public.question_options (
 id text primary key, question_id text not null references public.questions(id) on delete cascade,
 label text not null, position integer not null check(position>=0),unique(question_id,position)
);
create table private.answer_keys (
 question_id text primary key references public.questions(id) on delete cascade,
 correct_position integer not null, explanation text not null
);
alter table private.answer_keys enable row level security;
revoke all on private.answer_keys from public,anon,authenticated;
create table public.quiz_attempts (
 id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,
 quiz_id text not null references public.quizzes(id),score integer not null check(score between 0 and 100),
 answers jsonb not null,created_at timestamptz not null default now()
);
create index attempts_user_created on public.quiz_attempts(user_id,created_at desc);
create index attempts_quiz on public.quiz_attempts(quiz_id);
create table public.labs (id text primary key,title text not null,description text not null,difficulty text not null default 'beginner',published boolean not null default false);
create table public.lab_progress (
 id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,
 lab_id text not null references public.labs(id),validation_method text not null default 'manual' check(validation_method='manual'),
 completed_at timestamptz not null default now(),unique(user_id,lab_id)
);
create index enrollment_course on public.enrollments(course_id);
create index progress_lesson on public.lesson_progress(lesson_id);
create index lab_progress_lab on public.lab_progress(lab_id);
create index profile_last_lesson on public.profiles(last_lesson_id);

alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.profiles enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.quizzes enable row level security;
alter table public.questions enable row level security;
alter table public.question_options enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.labs enable row level security;
alter table public.lab_progress enable row level security;

revoke all on public.courses,public.modules,public.lessons,public.quizzes,public.questions,public.question_options,public.labs,public.profiles,public.enrollments,public.lesson_progress,public.quiz_attempts,public.lab_progress from anon,authenticated;
grant select on public.courses,public.modules,public.lessons,public.quizzes,public.questions,public.question_options,public.labs to anon,authenticated;
grant select,insert,update on public.profiles to authenticated;
grant select,insert on public.enrollments,public.lab_progress to authenticated;
grant select on public.lesson_progress,public.quiz_attempts to authenticated;

create policy published_courses on public.courses for select to anon,authenticated using(published);
create policy published_modules on public.modules for select to anon,authenticated using(exists(select 1 from public.courses c where c.id=course_id and c.published));
create policy published_lessons on public.lessons for select to anon,authenticated using(published and exists(select 1 from public.modules m where m.id=module_id));
create policy published_quizzes on public.quizzes for select to anon,authenticated using(exists(select 1 from public.lessons l where l.id=lesson_id));
create policy published_questions on public.questions for select to anon,authenticated using(exists(select 1 from public.quizzes q where q.id=quiz_id));
create policy published_options on public.question_options for select to anon,authenticated using(exists(select 1 from public.questions q where q.id=question_id));
create policy published_labs on public.labs for select to anon,authenticated using(published);
create policy own_profile_select on public.profiles for select to authenticated using(id=(select auth.uid()));
create policy own_profile_insert on public.profiles for insert to authenticated with check(id=(select auth.uid()));
create policy own_profile_update on public.profiles for update to authenticated using(id=(select auth.uid())) with check(id=(select auth.uid()));
create policy own_enrollment_select on public.enrollments for select to authenticated using(user_id=(select auth.uid()));
create policy own_enrollment_insert on public.enrollments for insert to authenticated with check(user_id=(select auth.uid()) and exists(select 1 from public.courses c where c.id=course_id and c.published));
create policy own_progress on public.lesson_progress for select to authenticated using(user_id=(select auth.uid()));
create policy own_attempts on public.quiz_attempts for select to authenticated using(user_id=(select auth.uid()));
create policy own_labs_select on public.lab_progress for select to authenticated using(user_id=(select auth.uid()));
create policy own_labs_insert on public.lab_progress for insert to authenticated with check(user_id=(select auth.uid()) and exists(select 1 from public.labs l where l.id=lab_id and l.published));

-- The private definer is necessary to read keys and atomically write trusted scores.
-- Identity always comes from the verified JWT, never from a function argument.
create function private.grade_quiz(p_lesson_id text,p_answers integer[]) returns jsonb
language plpgsql security definer set search_path='' as $$
declare
 v_user uuid:=auth.uid(); v_quiz text; v_course text; v_count integer; v_correct integer:=0;
 v_score integer; v_feedback jsonb:='[]'::jsonb; q record; v_is_correct boolean;
begin
 if v_user is null then raise exception 'Authentication required' using errcode='42501'; end if;
 select quizzes.id,modules.course_id into v_quiz,v_course from public.quizzes
 join public.lessons on lessons.id=quizzes.lesson_id join public.modules on modules.id=lessons.module_id
 join public.courses on courses.id=modules.course_id
 where quizzes.lesson_id=p_lesson_id and lessons.published and courses.published;
 if v_quiz is null then raise exception 'Quiz unavailable'; end if;
 -- Serialize attempts per user and quiz to avoid concurrent submissions bypassing cooldown.
 perform pg_advisory_xact_lock(hashtextextended(v_user::text||v_quiz,0));
 if exists(select 1 from public.quiz_attempts where user_id=v_user and quiz_id=v_quiz and created_at>now()-interval '2 seconds') then raise exception 'Wait before retrying'; end if;
 select count(*) into v_count from public.questions where quiz_id=v_quiz;
 if v_count=0 or coalesce(cardinality(p_answers),0)<>v_count or array_ndims(p_answers)<>1 or array_lower(p_answers,1)<>1 then raise exception 'Invalid answer count'; end if;
 for q in select questions.id,questions.position,answer_keys.correct_position,answer_keys.explanation from public.questions join private.answer_keys on answer_keys.question_id=questions.id where quiz_id=v_quiz order by position loop
  if not exists(select 1 from public.question_options where question_id=q.id and position=p_answers[q.position+1]) then raise exception 'Invalid option'; end if;
  v_is_correct:=p_answers[q.position+1]=q.correct_position;
  if v_is_correct then v_correct:=v_correct+1; end if;
  v_feedback:=v_feedback||jsonb_build_array(jsonb_build_object('correct',v_is_correct,'explanation',q.explanation));
 end loop;
 if jsonb_array_length(v_feedback)<>v_count then raise exception 'Incomplete answer key'; end if;
 v_score:=round(100.0*v_correct/v_count);
 insert into public.enrollments(user_id,course_id) values(v_user,v_course) on conflict(user_id,course_id) do nothing;
 insert into public.quiz_attempts(user_id,quiz_id,score,answers) values(v_user,v_quiz,v_score,to_jsonb(p_answers));
 if v_score>=70 then insert into public.lesson_progress(user_id,lesson_id) values(v_user,p_lesson_id) on conflict(user_id,lesson_id) do nothing; end if;
 insert into public.profiles(id,last_lesson_id) values(v_user,p_lesson_id) on conflict(id) do update set last_lesson_id=excluded.last_lesson_id;
 return jsonb_build_object('score',v_score,'feedback',v_feedback);
end $$;
revoke all on function private.grade_quiz(text,integer[]) from public,anon;
grant execute on function private.grade_quiz(text,integer[]) to authenticated;
create function public.submit_quiz(p_lesson_id text,p_answers integer[]) returns jsonb
language sql security invoker set search_path='' as $$ select private.grade_quiz(p_lesson_id,p_answers); $$;
revoke all on function public.submit_quiz(text,integer[]) from public,anon;
grant execute on function public.submit_quiz(text,integer[]) to authenticated;
