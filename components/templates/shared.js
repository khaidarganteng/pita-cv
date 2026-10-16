import { parseLines } from '@/lib/format';

export function Desc({ text, className = '' }) {
  const ls = parseLines(text);
  const paras = ls.filter((l) => !l.b);
  const bullets = ls.filter((l) => l.b);
  return (
    <div className={className}>
      {paras.map((l, i) => <p key={i}>{l.t}</p>)}
      {bullets.length > 0 && <ul className="ml-4 list-disc space-y-0.5">{bullets.map((l, i) => <li key={i}>{l.t}</li>)}</ul>}
    </div>
  );
}

export const initial = (cv) => (cv.name.trim()[0] || '🎀').toUpperCase();

export function Photo({ cv, className, ring }) {
  return cv.photo
    // eslint-disable-next-line @next/next/no-img-element
    ? <img src={cv.photo} alt="" className={`object-cover ${className}`} style={ring} />
    : <div className={`grid place-items-center bg-white/25 text-5xl font-bold ${className}`} style={ring}>{initial(cv)}</div>;
}
