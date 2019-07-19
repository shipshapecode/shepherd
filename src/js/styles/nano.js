import { create } from 'nano-css';
import { addon as cache } from 'nano-css/addon/cache';
import { addon as stable } from 'nano-css/addon/stable';
import { addon as nesting } from 'nano-css/addon/nesting';
import { addon as keyframes } from 'nano-css/addon/keyframes';
import { addon as prefixer } from 'nano-css/addon/prefixer';
import { addon as rule } from 'nano-css/addon/rule';

export function setupNano(classPrefix) {
  const nano = create({
    // Add prefix to all generated class names.
    pfx: classPrefix || ''
  });

  cache(nano);
  stable(nano);
  nesting(nano);
  keyframes(nano);
  prefixer(nano);
  rule(nano);

  return nano;
}

