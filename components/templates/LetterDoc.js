export default function LetterDoc({ cv, letter, color }) {
  const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const contact = [cv.email, cv.phone, cv.city].filter(Boolean).join('  •  ');
  const paras = (letter.body || '').split(/\n\s*\n/).filter(Boolean);
  return (
    <div className="f-nunito min-h-[1123px] px-[72px] py-[64px] text-[13.5px] leading-[1.75] text-[#2e2433]">
      <header className="mb-8 border-b-4 pb-4" style={{ borderColor: color }}>
        <h1 className="text-[26px] font-extrabold leading-tight">{cv.name || 'Nama Lengkap'}</h1>
        <p className="text-[12px] opacity-75">{contact}</p>
      </header>
      <p className="text-right">{(cv.city || 'Kota').split(',')[0]}, {date}</p>
      <div className="mt-5">
        <p>Yth. Bapak/Ibu Bagian HRD</p>
        <p className="font-bold">{letter.company || '[Nama perusahaan]'}</p>
        {letter.city && <p>di {letter.city}</p>}
      </div>
      <p className="mt-5"><b>Perihal: Lamaran Pekerjaan — {letter.position || cv.title || '[Posisi]'}</b></p>
      <div className="mt-5 space-y-4 text-justify">
        {paras.length ? paras.map((p, i) => <p key={i} className="whitespace-pre-wrap">{p}</p>)
          : <p className="rounded-2xl bg-[#fdf6ff] p-4 text-center opacity-70">Isi form di tab “Surat lamaran”, lalu tekan “Buat otomatis” ✨</p>}
      </div>
      <div className="mt-8">
        <p>Hormat saya,</p>
        <div className="h-20" />
        <p className="font-bold underline">{cv.name || 'Nama Lengkap'}</p>
      </div>
    </div>
  );
}
