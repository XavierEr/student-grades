export const clsx = (...params: Array<string | undefined | boolean>): string => {
  return params.filter(Boolean).join(' ');
}