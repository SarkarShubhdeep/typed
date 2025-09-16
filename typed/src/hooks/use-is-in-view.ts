import { useEffect, useRef, useState } from 'react';

export interface UseIsInViewOptions {
  inView?: boolean;
  inViewMargin?: string;
  inViewOnce?: boolean;
}

export function useIsInView(
  ref: React.Ref<HTMLElement>,
  options: UseIsInViewOptions = {}
) {
  const {
    inView: inViewProp = false,
    inViewMargin = '0px',
    inViewOnce = true,
  } = options;

  const [isInView, setIsInView] = useState(inViewProp);
  const localRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = localRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          if (inViewOnce) {
            observer.unobserve(element);
          }
        } else if (!inViewOnce) {
          setIsInView(false);
        }
      },
      {
        rootMargin: inViewMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [inViewMargin, inViewOnce]);

  return { ref: localRef, isInView };
}
