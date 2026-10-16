import { dateRange } from '@/lib/format';
import { Desc, Photo } from './shared';

function Sec({ title, color, children }) {
  return <section className="mt-5"><h3 className="mb-2 border-b-2 pb-1 text-[12px] font-bold uppercase tracking-[.18em]" style={{ borderColor: color, color }}>{title}</h3>{children}</section>;
}

export default function Klasik({ cv, color }) {
  const contact = [cv.email, cv.phone, cv.city, cv.website].filter(Boolean);
  return (
    <div className="f-lora min-h-[1123px] px-14 py-12 text-[13px] leading-relaxed text-[#2e2433]">
      <header className="flex items-center gap-6">
        {cv.photo && <Photo cv={cv} className="h-24 w-24 flex-none rounded-full" />}
        <div className={cv.photo ? 'flex-1' : 'w-full text-center'}>
          <h1 className="text-[32px] font-bold leading-tight">{cv.name || 'Nama Lengkap'}</h1>
          <p className="text-[15px] italic" style={{ color }}>{cv.title || 'Posisi yang dilamar'}</p>
          <p className="mt-1 text-[12px] opacity-80">{contact.join('  •  ')}</p>
        </div>
      </header>
      {cv.summary && <Sec title="Ringkasan" color={color}><p>{cv.summary}</p></Sec>}
      {cv.experiences.length > 0 && <Sec title="Pengalaman" color={color}><div className="space-y-3">{cv.experiences.map((e) => (
        <div key={e.id} className="break-inside-avoid"><div className="flex justify-between gap-3"><b>{e.role} — {e.company}</b><span className="flex-none italic opacity-75">{dateRange(e.start, e.end)}</span></div><Desc text={e.desc} className="mt-0.5" /></div>))}</div></Sec>}
      {cv.education.length > 0 && <Sec title="Pendidikan" color={color}><div className="space-y-2">{cv.education.map((e) => (
        <div key={e.id} className="break-inside-avoid"><div className="flex justify-between gap-3"><b>{e.school}</b><span className="flex-none italic opacity-75">{dateRange(e.start, e.end)}</span></div><div>{e.degree}{e.extra ? ` — ${e.extra}` : ''}</div></div>))}</div></Sec>}
      {cv.skills.length > 0 && <Sec title="Keahlian" color={color}><p>{cv.skills.join('  •  ')}</p></Sec>}
      {cv.languages.length > 0 && <Sec title="Bahasa" color={color}><p>{cv.languages.map((l) => `${l.name} (${l.level})`).join('  •  ')}</p></Sec>}
      {cv.certs.length > 0 && <Sec title="Sertifikat & Penghargaan" color={color}><ul className="space-y-0.5">{cv.certs.map((c) => <li key={c.id} className="flex justify-between gap-3"><span>{c.name}</span><span className="italic opacity-75">{c.year}</span></li>)}</ul></Sec>}
    </div>
  );
}
