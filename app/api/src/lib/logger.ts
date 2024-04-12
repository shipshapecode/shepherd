import { Writable } from 'stream';

import Honeybadger from '@honeybadger-io/js';

import { createLogger } from '@redwoodjs/api/logger';

Honeybadger.configure({
  apiKey: process.env.HONEYBADGER_API_KEY,
});

const HoneybadgerStream = () => {
  const stream = new Writable({
    write(
      chunk: unknown,
      _encoding: BufferEncoding,
      fnOnFlush: (error?: Error | null) => void
    ) {
      Honeybadger.notify(chunk.toString());
      fnOnFlush();
    },
  });

  return stream;
};

/**
 * Creates a logger with RedwoodLoggerOptions
 *
 * These extend and override default LoggerOptions,
 * can define a destination like a file or other supported pino log transport stream,
 * and sets whether or not to show the logger configuration settings (defaults to false)
 *
 * @param RedwoodLoggerOptions
 *
 * RedwoodLoggerOptions have
 * @param {options} LoggerOptions - defines how to log, such as redaction and format
 * @param {string | DestinationStream} destination - defines where to log, such as a transport stream or file
 * @param {boolean} showConfig - whether to display logger configuration on initialization
 */
const loggerArgs =
  process.env.NODE_ENV === 'production'
    ? { options: { level: 'error' }, destination: HoneybadgerStream() }
    : {};
export const logger = createLogger(loggerArgs);
