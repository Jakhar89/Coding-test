import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import mq, { getBreakpointKeys } from '../styles/mq';

const breakpoints = getBreakpointKeys();

// Returns single string value of exact breakpoint (xs, sm, md, lg, xl)
export const useBreakpoint = (): string => {
  const getBreakpoint = () => {
    if (window.matchMedia) {
      return breakpoints.find((point, index) => {
        const pointFrom = point;
        const pointTo = breakpoints.length - 1 !== index ? breakpoints[index + 1] : false;

        return pointTo
          ? window.matchMedia(mq.between(pointFrom, pointTo, false)).matches
          : window.matchMedia(mq(pointFrom, false)).matches;
      });
    }
  };

  const [breakpoint, setBreakpoint] = useState(getBreakpoint);

  const debouncedHandleResize = useDebouncedCallback(() => {
    const currentBreakpoint = getBreakpoint();
    if (currentBreakpoint !== breakpoint) {
      setBreakpoint(currentBreakpoint);
    }
  }, 500);

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  });

  return breakpoint ?? '';
};
