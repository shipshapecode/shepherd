import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { describe, expect, it } from 'vitest';
import { Tour } from '../../src/shepherd';

const read = (path) => readFileSync(join(process.cwd(), path), 'utf8');
const schema = JSON.parse(read('tour.schema.json'));
const stepSource = read('src/step.ts');
const tourSource = read('src/tour.ts');

const optionNames = (source, name) => {
  const start = source.indexOf(`export interface ${name} {`);
  const end = source.indexOf('\n}', start);
  return [...source.slice(start, end).matchAll(/^ {2}(\w+)\?:/gm)].map(
    ([, option]) => option
  );
};

describe('tour.schema.json', () => {
  const step = schema.definitions.stepOptions.properties;

  it('only names real step options', () => {
    const real = optionNames(stepSource, 'StepOptions');
    expect(Object.keys(step).filter((key) => !real.includes(key))).toEqual([]);
  });

  it('only names real tour options', () => {
    const real = optionNames(tourSource, 'TourOptions');
    expect(
      Object.keys(schema.properties).filter((key) => !real.includes(key))
    ).toEqual([]);
  });

  it('lists every button action and placement in the types', () => {
    const union = (name) =>
      [
        ...stepSource
          .slice(
            stepSource.indexOf(`export type ${name} =`),
            stepSource.indexOf(';', stepSource.indexOf(`export type ${name} =`))
          )
          .matchAll(/'([\w-]+)'/g)
      ]
        .map(([, value]) => value)
        .sort();

    expect([...step.attachTo.properties.on.enum].sort()).toEqual(
      union('PopperPlacement')
    );
    expect([...step.buttons.items.properties.action.enum].sort()).toEqual(
      union('StepButtonAction')
    );
  });

  it('describes a tour that really runs', async () => {
    const tour = new Tour(
      JSON.parse(`{
        "useModalOverlay": true,
        "steps": [
          { "id": "a", "text": "one", "buttons": [{ "text": "Next", "action": "next" }] },
          { "id": "b", "text": "two", "buttons": [{ "text": "Done", "action": "complete" }] }
        ]
      }`)
    );

    await tour.start();
    tour.getCurrentStep().getElement().querySelector('button').click();
    expect(tour.getCurrentStep().id).toBe('b');

    tour.getCurrentStep().getElement().querySelector('button').click();
    expect(tour.isActive()).toBe(false);
  });
});
