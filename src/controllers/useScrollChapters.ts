import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { prefersReducedMotion } from '../lib/motion';

const STACKED_QUERY = '(max-width: 1023px)';

interface Track {
  pinStart: number;
  distance: number;
}

/** Misura dove inizia e quanto dura l'ancoraggio del blocco sticky. */
function measureTrack(el: HTMLElement): Track {
  const sticky = el.querySelector<HTMLElement>('.projects__sticky');
  if (!sticky) return { pinStart: 0, distance: 1 };
  const lead = parseFloat(getComputedStyle(el).paddingTop) || 0;
  const pinnedTop = parseFloat(getComputedStyle(sticky).top) || 0;
  const docTop = el.getBoundingClientRect().top + window.scrollY;
  const pinStart = docTop + lead - pinnedTop;
  const distance = Math.max(1, el.offsetHeight - lead - sticky.offsetHeight);
  return { pinStart, distance };
}

export function useScrollChapters(ref: RefObject<HTMLElement | null>, count: number) {
  const [active, setActive] = useState(0);
  const [stacked, setStacked] = useState(false);
  const activeRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia(STACKED_QUERY);
    setStacked(mq.matches);
    const onChange = () => setStacked(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const spread = rect.height - window.innerHeight;
      const flow = spread > 0 ? Math.min(1, Math.max(0, -rect.top / spread)) : 0;
      const { pinStart, distance } = measureTrack(el);
      const pinned = Math.min(1, Math.max(0, (window.scrollY - pinStart) / distance));
      const progress = window.matchMedia(STACKED_QUERY).matches ? flow : pinned;
      const index = Math.min(count - 1, Math.floor(progress * count));
      const step = Math.min(1, Math.max(0, progress * count - index));
      el.style.setProperty('--step-progress', String(step));
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [ref, count]);

  const goTo = useCallback(
    (index: number) => {
      const el = ref.current;
      if (!el) return;
      const { pinStart, distance } = measureTrack(el);
      const top = pinStart + (index * distance) / count + 2;
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    },
    [ref, count],
  );

  return { active, stacked, goTo };
}
