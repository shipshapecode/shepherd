import React from 'react';

import humanize from 'humanize-string';

const MAX_STRING_LENGTH = 150;

export const formatEnum = (values: string | string[] | null | undefined) => {
  let output = '';

  if (Array.isArray(values)) {
    const humanizedValues = values.map((value) => humanize(value));
    output = humanizedValues.join(', ');
  } else if (typeof values === 'string') {
    output = humanize(values);
  }

  return output;
};

export const jsonDisplay = (obj: unknown) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  );
};

export const truncate = (value: string | number) => {
  let output = value?.toString() ?? '';

  if (output.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...';
  }

  return output;
};

export const jsonTruncate = (obj: unknown) => {
  return truncate(JSON.stringify(obj, null, 2));
};

export const timeTag = (dateTime?: string, hasTime = false) => {
  let output: string | JSX.Element = '';

  if (dateTime) {
    output = (
      <time dateTime={dateTime} title={dateTime}>
        {hasTime
          ? new Date(dateTime).toLocaleString('en-us')
          : new Date(dateTime).toLocaleDateString('en-us', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
      </time>
    );
  }

  return output;
};

export const checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />;
};
