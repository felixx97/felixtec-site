import { useEffect, useState } from 'react';

export function useInView(ref, options = { rootMargin: '120px 0px', threshold: 0.05 }) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      options
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options.rootMargin, options.threshold]);

  return inView;
}

