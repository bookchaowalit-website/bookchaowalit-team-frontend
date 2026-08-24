"use client";

import { useEffect, useMemo, useState } from "react";

type Status = "Core" | "Collaborator" | "Available";
type Person = { id: string; name: string; role: string; status: Status };
const SEED: Person[] = [{ id: "book", name: "Book", role: "Founder / Eng", status: "Core" }];
const STATUS: Status[] = ["Core", "Collaborator", "Available"];

function useRoster() {
  const [people, setPeople] = useState<Person[]>(SEED);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const stored = localStorage.getItem("team-v2"); if (stored) setPeople(JSON.parse(stored) as Person[]); } catch { /* keep seed */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("team-v2", JSON.stringify(people)); }, [people, ready]);
  return [people, setPeople] as const;
}

export default function Home() {
  const [people, setPeople] = useRoster();
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Status>("Collaborator");
  const visible = useMemo(() => people.filter((person) => `${person.name} ${person.role} ${person.status}`.toLowerCase().includes(query.toLowerCase())), [people, query]);
  const addPerson = () => {
    if (!name.trim() || !role.trim()) return;
    setPeople((current) => [{ id: crypto.randomUUID(), name: name.trim(), role: role.trim(), status }, ...current]);
    setName(""); setRole(""); setStatus("Collaborator");
  };

  return (
    <main className="crew-room">
      <header className="crew-header">
        <div className="crew-logo">B<span>/</span>CREW</div>
        <div className="crew-header-copy"><span>STUDIO DIRECTORY</span><strong>LOCAL CUT / 01</strong></div>
        <span className="crew-status"><i /> {people.length} names on the rail</span>
      </header>
      <section className="crew-intro">
        <div><p className="work-label">THE WORKBENCH</p><h1>People who<br /><em>make the cut.</em></h1></div>
        <p className="intro-copy">A small studio roster, arranged like a work print. Add a person, give them a role, and keep the cut in this browser.</p>
      </section>
      <div className="perforation" aria-hidden="true">{Array.from({ length: 28 }, (_, index) => <i key={index} />)}</div>
      <section className="workbench" aria-label="Team directory">
        <div className="rail-column">
          <div className="rail-heading"><div><p className="work-label">SELECT RAIL</p><h2>Roster</h2></div><span>{visible.length.toString().padStart(2, "0")}</span></div>
          <label className="crew-search"><span>Search the cut</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, role, status" /></label>
          <div className="film-rail">
            {visible.length === 0 ? <p className="empty-rail">No names match this cut.</p> : visible.map((person, index) => (
              <article className="crew-strip" key={person.id}>
                <div className="strip-index">{String(index + 1).padStart(2, "0")}</div>
                <div className="strip-person"><h3>{person.name}</h3><p>{person.role}</p></div>
                <span className={`status-mark ${person.status.toLowerCase()}`}>{person.status}</span>
                <button className="remove-button" aria-label={`Delete ${person.name}`} onClick={() => setPeople((current) => current.filter((item) => item.id !== person.id))}>×</button>
              </article>
            ))}
          </div>
        </div>
        <aside className="clip-board">
          <p className="work-label">NEW ENTRY</p><h2>Pin someone<br /><em>to the rail.</em></h2>
          <p className="board-note">This is local-only. Nothing is published or synced.</p>
          <label><span>Name</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Alex" /></label>
          <label><span>Role / detail</span><input value={role} onChange={(event) => setRole(event.target.value)} placeholder="e.g. Product design" /></label>
          <label><span>Availability mark</span><select value={status} onChange={(event) => setStatus(event.target.value as Status)}>{STATUS.map((item) => <option key={item}>{item}</option>)}</select></label>
          <button className="pin-button" onClick={addPerson}>Pin to roster <span>↗</span></button>
        </aside>
      </section>
      <footer className="crew-footer"><span>BOOKCHAOWALIT / TEAM</span><span>LOCAL BROWSER STATE · DEMO-GRADE</span></footer>
    </main>
  );
}
