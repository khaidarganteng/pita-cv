'use client';
import { useRef, useState } from 'react';
import { useStored } from '@/lib/store';
import { blank, sample, blankLetter } from '@/lib/sample';
import { makeLetter } from '@/lib/letter';
import { score } from '@/lib/score';
import { COLORS } from '@/lib/format';
import Bow from './Bow';
import Editor from './Editor';
import Preview from './Preview';
import Manis from './templates/Manis';
import Klasik from './templates/Klasik';
import Modern from './templates/Modern';
import LetterDoc from './templates/LetterDoc';

const TABS = [['profil', 'Profil', '🌸'], ['kerja', 'Pengalaman', '💼'], ['edu', 'Pendidikan', '🎓'], ['skill', 'Skill', '✨'], ['lain', 'Sertifikat', '🏅'], ['surat', 'Surat lamaran', '💌']];
const TEMPLATES = { manis: ['Manis', Manis], klasik: ['Klasik', Klasik], modern: ['Modern', Modern] };
const DEFAULT_CV = sample();
const DEFAULT_LETTER = blankLetter();

export default function Builder() {
  const [cv, setCv, r1] = useStored('pitacv:cv', DEFAULT_CV);
  const [letter, setLetter, r2] = useStored('pitacv:letter', DEFAULT_LETTER);
  const [tab, setTab] = useState('profil');
  const [view, setView] = useState('edit');
  const file = useRef(null);

  if (!(r1 && r2)) {
    return <div className="grid min-h-screen place-items-center"><div className="text-center"><Bow size={80} className="mx-auto animate-bob" /><p className="mt-2 font-display text-xl text-pita-muted">Menyiapkan CV-mu...</p></div></div>;
  }

  const upd = (patch) => setCv((c) => ({ ...c, ...patch }));
  const Tpl = (TEMPLATES[cv.template] || TEMPLATES.manis)[1];
  const { pct, items } = score(cv);
  const isLetter = tab === 'surat';

  const generate = () => setLetter((l) => ({ ...l, body: makeLetter(cv, l) }));
  const print = () => {
    const prev = document.title;
    document.title = `${isLetter ? 'Surat Lamaran' : 'CV'} - ${cv.name || 'Pita CV'}`;
    const restore = () => { document.title = prev; window.removeEventListener('afterprint', restore); };
    window.addEventListener('afterprint', restore);
    window.print();
  };
  const exportData = () => {
    const blob = new Blob([JSON.stringify({ cv, letter }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'pita-cv-data.json'; a.click(); URL.revokeObjectURL(a.href);
  };
  const importData = (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try { const d = JSON.parse(String(r.result)); if (d.cv) setCv({ ...blank(), ...d.cv }); if (d.letter) setLetter({ ...blankLetter(), ...d.letter }); alert('Data berhasil dipulihkan 🎉'); }
      catch { alert('File tidak valid.'); }
    };
    r.readAsText(f); e.target.value = '';
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-28 pt-5 lg:pb-10 print:max-w-none print:p-0">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-3"><Bow size={48} className="animate-bob" />
          <div><h1 className="text-3xl leading-none">Pita <span className="text-pita-pink">CV</span></h1><p className="text-sm text-pita-muted">CV & surat lamaran gratis · tanpa daftar · data di browser kamu</p></div></div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-ghost" onClick={() => confirm('Ganti dengan data contoh?') && setCv(sample())}>🎀 Contoh</button>
          <button className="btn-ghost" onClick={() => confirm('Kosongkan semua isian CV?') && setCv(blank())}>🧹 Kosongkan</button>
          <button className="btn-ghost" onClick={exportData}>⬇ Ekspor</button>
          <button className="btn-ghost" onClick={() => file.current?.click()}>⬆ Impor</button>
          <input ref={file} type="file" accept="application/json" className="hidden" onChange={importData} />
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(380px,520px)_1fr] print:block">
        <section className={`${view === 'edit' ? 'block' : 'hidden'} lg:block print:!hidden`}>
          <details className="card mb-4 p-4" open={pct < 100}>
            <summary className="flex cursor-pointer items-center justify-between gap-3 font-bold"><span>Kelengkapan CV</span><span className="chip bg-pita-butter">{pct}%</span></summary>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-pita-100"><div className="h-full rounded-full bg-gradient-to-r from-pita-pink to-pita-400 transition-all" style={{ width: `${pct}%` }} /></div>
            <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">{items.map((i) => <li key={i.label} className={i.ok ? 'text-emerald-600' : 'text-pita-muted'}>{i.ok ? '✅' : '⚪'} {i.label}</li>)}</ul>
          </details>
          <div className="card p-4 sm:p-5">
            <nav className="mb-5 flex gap-1.5 overflow-x-auto pb-1" aria-label="Bagian CV">
              {TABS.map(([id, label, ico]) => (
                <button key={id} onClick={() => setTab(id)} aria-current={tab === id}
                  className={`flex-none rounded-full px-3.5 py-2 text-sm font-bold transition ${tab === id ? 'bg-pita-pink text-white shadow-pop' : 'bg-pita-50 hover:bg-pita-100'}`}>{ico} {label}</button>))}
            </nav>
            <div className="animate-rise" key={tab}><Editor tab={tab} cv={cv} upd={upd} letter={letter} setLetter={setLetter} generate={generate} /></div>
          </div>
        </section>

        <section className={`${view === 'preview' ? 'block' : 'hidden'} min-w-0 lg:block print:!block`}>
          <div className="card mb-4 flex flex-wrap items-center justify-between gap-3 p-3 print:hidden">
            <div className="flex flex-wrap items-center gap-2">
              {!isLetter && Object.entries(TEMPLATES).map(([k, [l]]) => (
                <button key={k} onClick={() => upd({ template: k })} aria-pressed={cv.template === k} className={`btn !py-1.5 ${cv.template === k ? 'bg-pita-pink text-white shadow-pop' : 'bg-white'}`}>{l}</button>))}
              <span className="ml-1 flex gap-1.5">{COLORS.map(([c, n]) => (
                <button key={c} onClick={() => upd({ color: c })} aria-label={`Warna ${n}`} aria-pressed={cv.color === c}
                  className={`h-7 w-7 rounded-full border-4 ${cv.color === c ? 'border-pita-ink/40' : 'border-white'} shadow`} style={{ background: c }} />))}</span>
            </div>
            <button className="btn-pink" onClick={print}>⬇ Unduh PDF</button>
          </div>
          <p className="mb-3 text-xs text-pita-muted print:hidden">Di jendela cetak, pilih <b>Simpan sebagai PDF</b>, atur margin ke <b>Tidak ada</b>, dan aktifkan <b>Grafik latar belakang</b>.</p>
          <Preview>{isLetter ? <LetterDoc cv={cv} letter={letter} color={cv.color} /> : <Tpl cv={cv} color={cv.color} />}</Preview>
        </section>
      </div>

      <div className="fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-full border-2 border-pita-line bg-white/95 p-1.5 shadow-soft backdrop-blur lg:hidden print:hidden">
        {[['edit', '✏️ Edit'], ['preview', '👀 Pratinjau']].map(([k, l]) => (
          <button key={k} onClick={() => { setView(k); window.scrollTo({ top: 0 }); }} className={`flex-1 rounded-full py-2.5 text-sm font-bold ${view === k ? 'bg-pita-pink text-white' : ''}`}>{l}</button>))}
      </div>
    </div>
  );
}
