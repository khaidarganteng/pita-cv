import { uid } from './store';

export const blank = () => ({
  name: '', title: '', email: '', phone: '', city: '', website: '', summary: '', photo: '',
  experiences: [], education: [], skills: [], languages: [], certs: [], template: 'manis', color: '#e879a9',
});

export const sample = () => ({
  name: 'Rani Putri Lestari', title: 'Staf Administrasi & Marketing', email: 'rani.putri@email.com', phone: '0812-3456-7890',
  city: 'Semarang, Jawa Tengah', website: 'linkedin.com/in/ranilestari', photo: '',
  summary: 'Lulusan Administrasi Bisnis yang teliti, komunikatif, dan cepat belajar. Berpengalaman mengelola dokumen, jadwal, serta konten media sosial untuk usaha kecil. Mencari kesempatan untuk berkontribusi dan berkembang di tim yang kolaboratif.',
  experiences: [
    { id: uid(), role: 'Admin & Content Creator (Magang)', company: 'Toko Kue Manis Rasa', start: 'Jan 2024', end: 'Des 2024',
      desc: '- Mengelola pesanan harian dan rekap penjualan mingguan\n- Membuat 20+ konten Instagram per bulan, menaikkan pengikut 35%\n- Menyusun laporan stok sederhana dengan Excel' },
    { id: uid(), role: 'Bendahara', company: 'Himpunan Mahasiswa Administrasi Bisnis', start: 'Agu 2022', end: 'Jul 2023',
      desc: '- Mengelola dana kegiatan lebih dari Rp 25 juta secara transparan\n- Menyusun laporan pertanggungjawaban tepat waktu' },
  ],
  education: [
    { id: uid(), school: 'Universitas Diponegoro', degree: 'S1 Administrasi Bisnis', start: '2020', end: '2024', extra: 'IPK 3,62 / 4,00' },
    { id: uid(), school: 'SMA Negeri 3 Semarang', degree: 'IPS', start: '2017', end: '2020', extra: '' },
  ],
  skills: ['Microsoft Office', 'Excel', 'Canva', 'Komunikasi', 'Kerja tim', 'Manajemen waktu'],
  languages: [{ id: uid(), name: 'Indonesia', level: 'Native' }, { id: uid(), name: 'Inggris', level: 'Menengah' }],
  certs: [{ id: uid(), name: 'Sertifikasi Microsoft Office Specialist', year: '2023' }],
  template: 'manis', color: '#e879a9',
});

export const blankLetter = () => ({ company: '', position: '', city: '', source: '', motivation: '', body: '' });
