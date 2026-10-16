'use client';
import { useEffect, useRef, useState } from 'react';

/** Menampilkan halaman A4 (794x1123 px) yang otomatis mengecil mengikuti lebar layar. Saat dicetak ukurannya asli. */
export default function Preview({ children }) {
  const box = useRef(null);
  const page = useRef(null);
  const [scale, setScale] = useState(1);
  const [h, setH] = useState(1123);

  useEffect(() => {
    const fit = () => {
      const w = box.current?.clientWidth || 794;
      setScale(Math.min(1, w / 794));
      setH(page.current?.offsetHeight || 1123);
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (box.current) ro.observe(box.current);
    if (page.current) ro.observe(page.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={box} className="w-full print:!block">
      <div className="print:!h-auto" style={{ height: h * scale }}>
        <div ref={page} className="origin-top-left bg-white shadow-soft print:!w-[210mm] print:!min-h-[297mm] print:!transform-none print:!shadow-none"
          style={{ width: 794, minHeight: 1123, transform: `scale(${scale})` }}>
          {children}
        </div>
      </div>
    </div>
  );
}
