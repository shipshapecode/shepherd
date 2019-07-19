import { create } from 'nano-css';
import { addon as addonCache } from 'nano-css/addon/cache';
import { addon as addonStable } from 'nano-css/addon/stable';
import { addon as addonNesting } from 'nano-css/addon/nesting';
import { addon as addonKeyframes } from 'nano-css/addon/keyframes';
import { addon as addonRule } from 'nano-css/addon/rule';
import { addon as addonSheet } from 'nano-css/addon/sheet';

export function setupNano(classPrefix) {
  const nano = create({
    // Add prefix to all generated class names.
    pfx: classPrefix || ''
  });

  addonCache(nano);
  addonStable(nano);
  addonNesting(nano);
  addonKeyframes(nano);
  addonRule(nano);
  addonSheet(nano);

  return nano;
}

