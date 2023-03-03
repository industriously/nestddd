export const isPromise = <T>(input: T | Promise<T>): input is Promise<T> => {
  if (typeof input !== 'object' || input == undefined) {
    return false;
  }

  const canThen = 'then' in input && typeof input.then === 'function';
  const canCatch = 'catch' in input && typeof input.catch === 'function';
  const canFinally = 'finally' in input && typeof input.finally === 'function';

  return canThen && canCatch && canFinally;
};
