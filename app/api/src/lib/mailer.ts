import { Mailer } from '@redwoodjs/mailer-core';
import { NodemailerMailHandler } from '@redwoodjs/mailer-handler-nodemailer';
import { ReactEmailRenderer } from '@redwoodjs/mailer-renderer-react-email';

import { SendGridMailHandler } from 'src/lib/handlers/sendgrid';
import { logger } from 'src/lib/logger';

export const mailer = new Mailer({
  // development: {
  //   when: process.env.NODE_ENV !== 'production',
  //   handler: 'sendgrid',
  // },
  handling: {
    handlers: {
      nodemailer: new NodemailerMailHandler({
        transport: {
          host: 'localhost',
          port: 4319,
          secure: false,
        },
      }),
      sendgrid: new SendGridMailHandler({
        apiKey: process.env.SENDGRID_API_KEY,
      }),
    },
    default: 'sendgrid',
  },

  rendering: {
    renderers: {
      reactEmail: new ReactEmailRenderer(),
    },
    default: 'reactEmail',
  },

  logger,
});
