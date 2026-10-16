const join = (a) => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' dan ' + a[a.length - 1]);

export function makeLetter(cv, l) {
  const pos = l.position || cv.title || '[posisi yang dilamar]';
  const comp = l.company || '[nama perusahaan]';
  const edu = cv.education?.[0], exp = cv.experiences?.[0];
  const skills = (cv.skills || []).slice(0, 4);
  const p = ['Dengan hormat,'];
  p.push(`Berdasarkan informasi lowongan${l.source ? ` yang saya peroleh dari ${l.source}` : ''}, saya ${cv.name || '[nama lengkap]'} bermaksud mengajukan lamaran untuk posisi ${pos} di ${comp}.`);
  const bg = [];
  if (edu) bg.push(`Saya lulusan ${edu.degree || 'bidang terkait'}${edu.school ? ` dari ${edu.school}` : ''}`);
  if (exp) bg.push(`${edu ? 'dan' : 'Saya'} memiliki pengalaman sebagai ${exp.role}${exp.company ? ` di ${exp.company}` : ''}`);
  const sk = skills.length ? ` Saya terbiasa dengan ${join(skills)}.` : '';
  if (bg.length) p.push(bg.join(' ') + '.' + sk);
  else if (sk) p.push(sk.trim());
  p.push(l.motivation?.trim() || `Saya tertarik bergabung dengan ${comp} karena yakin dapat berkontribusi dan terus berkembang bersama tim.`);
  p.push('Sebagai bahan pertimbangan, saya lampirkan CV beserta dokumen pendukung. Besar harapan saya untuk dapat diberi kesempatan mengikuti proses seleksi lebih lanjut.');
  p.push('Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.');
  return p.join('\n\n');
}
