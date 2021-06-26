import {useState, useEffect, useCallback} from 'react';

export const useAsync = <T>(
  asyncCallback: () => Promise<T>,
  deps: any[] = [],
): [Error | null, () => void] => {
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    asyncCallback().catch(setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  const resetError = useCallback(() => setError(_ => null), []);
  return [error, resetError];
};
