import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

interface Options {
  typeSpeed?: number;
  deleteSpeed?: number;
  hold?: number;
}

export function useRotatingWord(words: string[], { typeSpeed = 70, deleteSpeed = 35, hold = 1800 }: Options = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];

    if (prefersReducedMotion()) {
      setText(word);
      const id = window.setTimeout(() => setIndex((i) => i + 1), hold * 1.5);
      return () => window.clearTimeout(id);
    }

    const finishedTyping = !deleting && text === word;
    const finishedDeleting = deleting && text === '';
    const stepDelay = deleting ? deleteSpeed : typeSpeed;
    const delay = finishedTyping ? hold : stepDelay;

    const id = window.setTimeout(() => {
      if (finishedTyping) return setDeleting(true);
      if (finishedDeleting) {
        setDeleting(false);
        return setIndex((i) => i + 1);
      }
      setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);

    return () => window.clearTimeout(id);
  }, [words, index, text, deleting, typeSpeed, deleteSpeed, hold]);

  return text;
}
