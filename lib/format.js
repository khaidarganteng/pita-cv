export function parseLines(t = '') {
  return t.split('\n').map((s) => s.trim()).filter(Boolean)
    .map((s) => (/^[-•*]\s*/.test(s) ? { b: true, t: s.replace(/^[-•*]\s*/, '') } : { b: false, t: s }));
}
export const tint = (hex, a = '22') => (/^#[0-9a-f]{6}$/i.test(hex) ? hex + a : hex);
export const dateRange = (s, e) => [s, e].filter(Boolean).join(' – ');
export const COLORS = [['#e879a9', 'Pink'], ['#a78bfa', 'Lilac'], ['#34b79a', 'Mint'], ['#f59e6c', 'Peach'], ['#5b9bd5', 'Langit'], ['#4b5563', 'Grafit']];
