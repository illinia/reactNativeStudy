import {useEffect} from 'react';

export const useInterval = (
  callback: () => void,
  duration: number,
  deps: any[] = [],
): void => {
  useEffect(() => {
    if (duration === 0) return;
    const id = setTimeout(callback, duration);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, ...deps]);
};
