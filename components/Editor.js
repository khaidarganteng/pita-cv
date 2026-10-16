'use client';
import { useRef, useState } from 'react';
import { uid } from '@/lib/store';

const SUGGEST = ['Microsoft Office', 'Komunikasi', 'Kerja tim', 'Canva', 'Excel', 'Problem solving', 'Manajemen waktu', 'Public speaking', 'Desain grafis', 'Copywriting'];

function Field({ label, children, className = '' }) {
  return <label className={`block ${className}`}><span className="lbl">{label}</span>{children}</label>;
}

function resizePhoto(file) {
  return new Promise((resolve, reject) => {
    const img = new Image(); const url = URL.createObjectURL(file);
    img.onload = () => {
      const s = 320, c = document.createElement('canvas'); c.width = c.height = s;
      const m = Math.min(img.width, img.height);
      c.getContext('2d').drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, s, s);
      URL.revokeObjectURL(url); resolve(c.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = reject; img.src = url;
  });
}

function Profile({ cv, upd }) {
  const ref = useRef(null);
  const pick = async (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    try { upd({ photo: await resizePhoto(f) }); } catch { alert('Foto tidak bisa dibaca.'); }
    e.target.value = '';
  };
  const t = (k, p = '') => ({ value: cv[k], onChange: (e) => upd({ [k]: e.target.value }), placeholder: p, className: 'input' });
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="grid h-20 w-20 flex-none place-items-center overflow-hidden rounded-full border-4 border-pita-200 bg-pita-100 text-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {cv.photo ? <img src={cv.photo} alt="Foto profil" className="h-full w-full object-cover" /> : '📷'}
        </div>
        <div className="space-y-1.5"><div className="flex gap-2">
          <button type="button" className="btn-lilac !py-1.5" onClick={() => ref.current?.click()}>Unggah foto</button>
          {cv.photo && <button type="button" className="btn-ghost !py-1.5" onClick={() => upd({ photo: '' })}>Hapus</button>}</div>
          <p className="text-xs text-pita-muted">Foto tidak dikirim ke server, hanya tersimpan di browser.</p></div>
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={pick} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nama lengkap" className="sm:col-span-2"><input {...t('name', 'Contoh: Rani Putri Lestari')} /></Field>
        <Field label="Posisi yang dilamar" className="sm:col-span-2"><input {...t('title', 'Contoh: Staf Administrasi')} /></Field>
        <Field label="Email"><input type="email" {...t('email', 'nama@email.com')} /></Field>
        <Field label="No. telepon / WhatsApp"><input {...t('phone', '0812-xxxx-xxxx')} /></Field>
        <Field label="Kota"><input {...t('city', 'Semarang, Jawa Tengah')} /></Field>
        <Field label="Website / LinkedIn"><input {...t('website', 'linkedin.com/in/namamu')} /></Field>
        <Field label={`Ringkasan profil (${cv.summary.length} karakter)`} className="sm:col-span-2">
          <textarea rows={5} className="input" value={cv.summary} onChange={(e) => upd({ summary: e.target.value })} placeholder="2–4 kalimat tentang dirimu, keahlian utama, dan tujuan kariermu." />
        </Field>
      </div>
    </div>
  );
}

function ListEditor({ items, onChange, fields, empty, add, heading, hint }) {
  const set = (i, k, v) => onChange(items.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  const move = (i, d) => { const j = i + d; if (j < 0 || j >= items.length) return; const a = [...items]; [a[i], a[j]] = [a[j], a[i]]; onChange(a); };
  return (
    <div className="space-y-4">
      {hint && <p className="rounded-2xl bg-pita-butter/60 px-4 py-2 text-xs">{hint}</p>}
      {items.map((it, i) => (
        <div key={it.id} className="rounded-3xl border-2 border-pita-line bg-pita-50/60 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <b className="truncate">{heading(it, i)}</b>
            <span className="flex flex-none gap-1">
              <button type="button" className="btn-ghost !px-2.5 !py-1" onClick={() => move(i, -1)} aria-label="Naik">↑</button>
              <button type="button" className="btn-ghost !px-2.5 !py-1" onClick={() => move(i, 1)} aria-label="Turun">↓</button>
              <button type="button" className="btn-ghost !px-2.5 !py-1" onClick={() => onChange(items.filter((_, j) => j !== i))} aria-label="Hapus">✕</button>
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((f) => (
              <Field key={f.key} label={f.label} className={f.wide ? 'sm:col-span-2' : ''}>
                {f.area ? <textarea rows={f.rows || 4} className="input" value={it[f.key] || ''} onChange={(e) => set(i, f.key, e.target.value)} placeholder={f.ph} />
                  : f.options ? <select className="input" value={it[f.key] || f.options[0]} onChange={(e) => set(i, f.key, e.target.value)}>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
                  : <input className="input" value={it[f.key] || ''} onChange={(e) => set(i, f.key, e.target.value)} placeholder={f.ph} />}
              </Field>
            ))}
          </div>
        </div>
      ))}
      <button type="button" className="btn-pink w-full" onClick={() => onChange([...items, { ...empty, id: uid() }])}>＋ {add}</button>
    </div>
  );
}

const WORK = [
  { key: 'role', label: 'Posisi / peran', ph: 'Contoh: Admin (Magang)' }, { key: 'company', label: 'Perusahaan / organisasi', ph: 'Nama tempat' },
  { key: 'start', label: 'Mulai', ph: 'Jan 2024' }, { key: 'end', label: 'Selesai', ph: 'Des 2024 atau Sekarang' },
  { key: 'desc', label: 'Tugas & pencapaian', area: true, wide: true, rows: 5, ph: '- Awali dengan tanda minus untuk poin\n- Sertakan angka jika bisa (naik 35%, 20 konten/bulan)' },
];
const EDU = [
  { key: 'school', label: 'Sekolah / universitas', wide: true, ph: 'Nama institusi' }, { key: 'degree', label: 'Jurusan / gelar', ph: 'S1 Administrasi Bisnis' },
  { key: 'extra', label: 'IPK / keterangan', ph: 'IPK 3,62 / 4,00' }, { key: 'start', label: 'Mulai', ph: '2020' }, { key: 'end', label: 'Lulus', ph: '2024' },
];
const CERT = [{ key: 'name', label: 'Nama sertifikat / penghargaan', wide: true, ph: 'Contoh: Juara 2 Lomba Debat' }, { key: 'year', label: 'Tahun', ph: '2023' }];
const LANG = [{ key: 'name', label: 'Bahasa', ph: 'Inggris' }, { key: 'level', label: 'Tingkat', options: ['Dasar', 'Menengah', 'Mahir', 'Native'] }];

function Skills({ cv, upd }) {
  const [v, setV] = useState('');
  const add = (t) => { t = t.trim(); if (t && !cv.skills.includes(t)) upd({ skills: [...cv.skills, t] }); setV(''); };
  return (
    <div className="space-y-6">
      <div>
        <span className="lbl">Skill (tekan Enter untuk menambah)</span>
        <input className="input" value={v} placeholder="Contoh: Microsoft Excel" onChange={(e) => setV(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(v); } }} />
        <div className="mt-3 flex flex-wrap gap-2">
          {cv.skills.map((s) => <span key={s} className="chip bg-pita-200">{s}<button type="button" onClick={() => upd({ skills: cv.skills.filter((x) => x !== s) })} aria-label={`Hapus ${s}`}>✕</button></span>)}
        </div>
        <p className="mb-1 mt-4 text-xs text-pita-muted">Saran (klik untuk menambah):</p>
        <div className="flex flex-wrap gap-2">{SUGGEST.filter((s) => !cv.skills.includes(s)).map((s) => <button type="button" key={s} onClick={() => add(s)} className="chip bg-pita-50 border border-pita-line hover:bg-pita-100">＋ {s}</button>)}</div>
      </div>
      <div><h3 className="mb-2 text-lg">Bahasa</h3>
        <ListEditor items={cv.languages} onChange={(languages) => upd({ languages })} fields={LANG} empty={{ name: '', level: 'Menengah' }} add="Tambah bahasa" heading={(it) => it.name || 'Bahasa baru'} /></div>
    </div>
  );
}

function Letter({ cv, letter, setLetter, generate }) {
  const t = (k, ph) => ({ className: 'input', value: letter[k], placeholder: ph, onChange: (e) => setLetter({ ...letter, [k]: e.target.value }) });
  return (
    <div className="space-y-4">
      <p className="rounded-2xl bg-pita-butter/60 px-4 py-2 text-xs">Surat dibuat dari data CV-mu. Kamu tetap bisa mengedit hasilnya sebelum diunduh.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Perusahaan tujuan"><input {...t('company', 'PT Contoh Sejahtera')} /></Field>
        <Field label="Posisi dilamar"><input {...t('position', cv.title || 'Staf Administrasi')} /></Field>
        <Field label="Kota perusahaan"><input {...t('city', 'Jakarta')} /></Field>
        <Field label="Info lowongan dari"><input {...t('source', 'LinkedIn / Jobstreet / teman')} /></Field>
        <Field label="Alasan tertarik (opsional)" className="sm:col-span-2"><textarea rows={3} {...t('motivation', 'Ceritakan singkat kenapa kamu ingin bergabung')} /></Field>
      </div>
      <button type="button" className="btn-pink w-full" onClick={generate}>✨ Buat otomatis dari CV</button>
      <Field label="Isi surat (bisa diedit)"><textarea rows={14} className="input" value={letter.body} onChange={(e) => setLetter({ ...letter, body: e.target.value })} /></Field>
    </div>
  );
}

export default function Editor({ tab, cv, upd, letter, setLetter, generate }) {
  if (tab === 'profil') return <Profile cv={cv} upd={upd} />;
  if (tab === 'kerja') return <ListEditor items={cv.experiences} onChange={(experiences) => upd({ experiences })} fields={WORK} empty={{ role: '', company: '', start: '', end: '', desc: '' }}
    add="Tambah pengalaman" heading={(it, i) => it.role || `Pengalaman ${i + 1}`} hint="Belum pernah kerja? Masukkan magang, organisasi, kepanitiaan, atau proyek kuliah." />;
  if (tab === 'edu') return <ListEditor items={cv.education} onChange={(education) => upd({ education })} fields={EDU} empty={{ school: '', degree: '', extra: '', start: '', end: '' }}
    add="Tambah pendidikan" heading={(it, i) => it.school || `Pendidikan ${i + 1}`} />;
  if (tab === 'skill') return <Skills cv={cv} upd={upd} />;
  if (tab === 'lain') return <ListEditor items={cv.certs} onChange={(certs) => upd({ certs })} fields={CERT} empty={{ name: '', year: '' }}
    add="Tambah sertifikat" heading={(it, i) => it.name || `Sertifikat ${i + 1}`} />;
  return <Letter cv={cv} letter={letter} setLetter={setLetter} generate={generate} />;
}
