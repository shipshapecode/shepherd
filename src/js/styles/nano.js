import { create } from 'nano-css';
import { addon as cache } from 'nano-css/addon/cache';
import { addon as nesting } from 'nano-css/addon/nesting';
import { addon as prefixer } from 'nano-css/addon/prefixer';
import { addon as rule } from 'nano-css/addon/rule';
import { addon as sheet } from 'nano-css/addon/sheet';

export function setupNano(classPrefix) {
  const nano = create({
    // Add prefix to all generated class names.
    pfx: classPrefix || ''
  });

  cache(nano);
  nesting(nano);
  prefixer(nano);
  rule(nano);
  sheet(nano);

  return nano;
}

