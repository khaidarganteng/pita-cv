import { dateRange, tint } from '@/lib/format';
import { Desc, Photo } from './shared';

function Side({ title, children }) {
  return <section className="mt-6"><h3 className="mb-2 border-b border-white/40 pb-1 text-[11px] font-extrabold uppercase tracking-[.18em]">{title}</h3>{children}</section>;
}
function Main({ title, color, children }) {
  return <section className="mt-6"><h3 className="mb-3 flex items-center gap-3 text-[12px] font-extrabold uppercase tracking-[.2em]" style={{ color }}>{title}<span className="h-[2px] flex-1" style={{ background: tint(color, '44') }} /></h3>{children}</section>;
}

export default function Manis({ cv, color }) {
  const contacts = [['✉', cv.email], ['☎', cv.phone], ['⌂', cv.city], ['🔗', cv.website]].filter((c) => c[1]);
  return (
    <div className="f-nunito flex min-h-[1123px] text-[13px] leading-relaxed text-[#3b2d46]">
      <aside className="w-[270px] flex-none px-7 py-10 text-white" style={{ background: color }}>
        <Photo cv={cv} className="mx-auto h-36 w-36 rounded-full border-4 border-white/70" />
        {contacts.length > 0 && <Side title="Kontak"><ul className="space-y-1.5 break-words">{contacts.map(([i, t]) => <li key={t} className="flex gap-2"><span>{i}</span><span>{t}</span></li>)}</ul></Side>}
        {cv.skills.length > 0 && <Side title="Skill"><div className="flex flex-wrap gap-1.5">{cv.skills.map((s) => <span key={s} className="rounded-full bg-white/25 px-2.5 py-0.5 text-[12px]">{s}</span>)}</div></Side>}
        {cv.languages.length > 0 && <Side title="Bahasa"><ul className="space-y-1">{cv.languages.map((l) => <li key={l.id} className="flex justify-between"><span>{l.name}</span><span className="opacity-80">{l.level}</span></li>)}</ul></Side>}
      </aside>
      <div className="flex-1 px-9 py-10">
        <h1 className="text-[34px] font-extrabold leading-tight">{cv.name || 'Nama Lengkap'}</h1>
        <p className="mt-0.5 text-[16px] font-bold" style={{ color }}>{cv.title || 'Posisi yang dilamar'}</p>
        {cv.summary && <Main title="Profil" color={color}><p>{cv.summary}</p></Main>}
        {cv.experiences.length > 0 && <Main title="Pengalaman" color={color}><div className="space-y-4">{cv.experiences.map((e) => (
          <div key={e.id} className="break-inside-avoid"><div className="flex justify-between gap-3"><b className="text-[14px]">{e.role}</b><span className="flex-none text-[12px] opacity-70">{dateRange(e.start, e.end)}</span></div>
            <div className="mb-1 font-bold" style={{ color }}>{e.company}</div><Desc text={e.desc} /></div>))}</div></Main>}
        {cv.education.length > 0 && <Main title="Pendidikan" color={color}><div className="space-y-3">{cv.education.map((e) => (
          <div key={e.id} className="break-inside-avoid"><div className="flex justify-between gap-3"><b>{e.school}</b><span className="flex-none text-[12px] opacity-70">{dateRange(e.start, e.end)}</span></div>
            <div>{e.degree}{e.extra ? ` · ${e.extra}` : ''}</div></div>))}</div></Main>}
        {cv.certs.length > 0 && <Main title="Sertifikat & Penghargaan" color={color}><ul className="space-y-1">{cv.certs.map((c) => <li key={c.id} className="flex justify-between gap-3"><span>{c.name}</span><span className="opacity-70">{c.year}</span></li>)}</ul></Main>}
      </div>
    </div>
  );
}
