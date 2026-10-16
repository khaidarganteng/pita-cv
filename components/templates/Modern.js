import { dateRange, tint } from '@/lib/format';
import { Desc, Photo } from './shared';

function H({ children, color }) {
  return <h3 className="mb-2 mt-5 text-[12px] font-extrabold uppercase tracking-[.2em]" style={{ color }}>{children}</h3>;
}

export default function Modern({ cv, color }) {
  return (
    <div className="f-nunito min-h-[1123px] text-[13px] leading-relaxed text-[#3b2d46]">
      <header className="flex items-center justify-between gap-6 px-10 py-9 text-white" style={{ background: color }}>
        <div><h1 className="text-[36px] font-extrabold leading-tight">{cv.name || 'Nama Lengkap'}</h1><p className="text-[16px] font-bold opacity-95">{cv.title || 'Posisi yang dilamar'}</p></div>
        <Photo cv={cv} className="h-28 w-28 flex-none rounded-3xl border-4 border-white/70" />
      </header>
      <div className="flex gap-8 px-10 py-6">
        <div className="flex-[1.7]">
          {cv.summary && <><H color={color}>Profil</H><p>{cv.summary}</p></>}
          {cv.experiences.length > 0 && <><H color={color}>Pengalaman</H><div className="space-y-4">{cv.experiences.map((e) => (
            <div key={e.id} className="break-inside-avoid border-l-4 pl-4" style={{ borderColor: tint(color, '88') }}>
              <b className="text-[14px]">{e.role}</b><div className="text-[12px] font-bold" style={{ color }}>{e.company} · {dateRange(e.start, e.end)}</div><Desc text={e.desc} className="mt-1" /></div>))}</div></>}
          {cv.education.length > 0 && <><H color={color}>Pendidikan</H><div className="space-y-3">{cv.education.map((e) => (
            <div key={e.id} className="break-inside-avoid"><b>{e.school}</b><div className="text-[12px] opacity-75">{e.degree}{e.extra ? ` · ${e.extra}` : ''} · {dateRange(e.start, e.end)}</div></div>))}</div></>}
        </div>
        <aside className="flex-1 rounded-3xl px-5 pb-5" style={{ background: tint(color, '18') }}>
          <H color={color}>Kontak</H>
          <ul className="space-y-1.5 break-words text-[12px]">{[['✉', cv.email], ['☎', cv.phone], ['⌂', cv.city], ['🔗', cv.website]].filter((c) => c[1]).map(([i, t]) => <li key={t} className="flex gap-2"><span>{i}</span><span>{t}</span></li>)}</ul>
          {cv.skills.length > 0 && <><H color={color}>Skill</H><div className="flex flex-wrap gap-1.5">{cv.skills.map((s) => <span key={s} className="rounded-full bg-white px-2.5 py-0.5 text-[12px]">{s}</span>)}</div></>}
          {cv.languages.length > 0 && <><H color={color}>Bahasa</H><ul className="space-y-1 text-[12px]">{cv.languages.map((l) => <li key={l.id} className="flex justify-between"><span>{l.name}</span><span className="opacity-70">{l.level}</span></li>)}</ul></>}
          {cv.certs.length > 0 && <><H color={color}>Sertifikat</H><ul className="space-y-1.5 text-[12px]">{cv.certs.map((c) => <li key={c.id}>{c.name}<span className="opacity-60"> · {c.year}</span></li>)}</ul></>}
        </aside>
      </div>
    </div>
  );
}
