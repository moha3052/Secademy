"use client";
import { useState } from "react";
export function VlanModel() {
  const [tagged, setTagged] = useState(false);
  const [pvid, setPvid] = useState("30");
  return (
    <section className="vlan-model">
      <span className="eyebrow">PRØV MODELLEN</span>
      <h2>Ét link. To klassifikationer.</h2>
      <p>Vi antager, at modtagerporten tillader VLAN 20 og 30.</p>
      <label>
        <input
          type="checkbox"
          checked={tagged}
          onChange={(e) => setTagged(e.target.checked)}
        />{" "}
        A sender rammen med tag 20
      </label>
      <label>
        PVID på B{" "}
        <select value={pvid} onChange={(e) => setPvid(e.target.value)}>
          <option>20</option>
          <option>30</option>
        </select>
      </label>
      <div className="vlan-path" aria-live="polite">
        <span>A · VLAN 20</span>
        <b>→ {tagged ? "tag 20" : "untagged"} →</b>
        <span>B · VLAN {tagged ? "20" : pvid}</span>
      </div>
      <p>
        {tagged
          ? "B læser VLAN 20 i tagget. PVID bruges ikke til denne tagged ramme."
          : "B bruger sin PVID, fordi rammen ankommer uden VLAN-tag."}
      </p>
    </section>
  );
}
