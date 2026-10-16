export function score(cv) {
  const items = [
    { ok: !!cv.name.trim(), label: 'Nama lengkap' },
    { ok: !!cv.title.trim(), label: 'Posisi / jabatan target' },
    { ok: /\S+@\S+\.\S+/.test(cv.email), label: 'Email yang valid' },
    { ok: cv.phone.replace(/\D/g, '').length >= 9, label: 'Nomor telepon' },
    { ok: cv.summary.trim().length >= 80, label: 'Ringkasan profil (min. 80 karakter)' },
    { ok: cv.experiences.length > 0, label: 'Minimal 1 pengalaman / magang / organisasi' },
    { ok: cv.education.length > 0, label: 'Riwayat pendidikan' },
    { ok: cv.skills.length >= 3, label: 'Minimal 3 skill' },
  ];
  return { pct: Math.round((items.filter((i) => i.ok).length / items.length) * 100), items };
}
