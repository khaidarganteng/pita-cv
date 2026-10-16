'use client';
import { useEffect, useState } from 'react';

/** State yang otomatis tersimpan di localStorage. Mengembalikan [value, setValue, ready]. */
export function useStored(key, initial) {
  const [v, setV] = useState(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const raw = localStorage.getItem(key); if (raw !== null) setV(JSON.parse(raw)); } catch {}
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key, v, ready]);
  return [v, setV, ready];
}
export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
