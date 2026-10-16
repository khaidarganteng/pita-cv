import './globals.css';
import { Fredoka, Nunito, Lora } from 'next/font/google';

const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-fredoka', weight: ['500', '600'] });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito', weight: ['400', '600', '700', '800'] });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', weight: ['400', '600', '700'] });

export const metadata = {
  title: 'Pita CV — Pembuat CV & Surat Lamaran Gratis',
  description: 'Buat CV rapi dan surat lamaran dalam hitungan menit. Gratis, tanpa daftar, data tersimpan di browser kamu. Unduh sebagai PDF.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${fredoka.variable} ${nunito.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
