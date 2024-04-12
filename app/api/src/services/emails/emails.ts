import type { EmailInput, QueryResolvers } from 'types/graphql';

import { ValidationError } from '@redwoodjs/graphql-server';
import type { MailResult } from '@redwoodjs/mailer-core';

import { logger } from 'src/lib/logger';
import { mailer } from 'src/lib/mailer';
import { DemoRequest } from 'src/mail/DemoRequest/DemoRequest';
import { WelcomeEmail } from 'src/mail/Welcome/Welcome';

const defaultEmail = 'Shepherd Pro <hello@shepherdpro.com>';

export const sendDemoRequest: QueryResolvers['sendDemoRequest'] = async ({
  input,
}) => {
  logger.debug(input, 'creating demo email ...');

  try {
    const { from, name, subject, title } = input;
    const to = defaultEmail;
    const when = new Date().toLocaleString();

    logger.debug({ ...input, to, when }, 'sending email ....');

    const data: MailResult = await mailer.send(
      DemoRequest({ from, name, title, when }),
      {
        from,
        to,
        subject,
      }
    );

    logger.debug(data, 'raw sendgrid email data');

    if (
      data.handlerInformation &&
      data.handlerInformation['statusCode'] &&
      data.handlerInformation['statusCode'] !== 200
    ) {
      logger.error(data.handlerInformation, 'error sending email');
      throw new ValidationError(
        data.handlerInformation['message'] || 'Unable to send email'
      );
    }

    const emailData = { from, to, subject, statusId: data.messageID };

    logger.debug(emailData, 'sent email and saving with data');

    return emailData;
  } catch (error) {
    logger.error(error, 'Error sending email');

    throw new ValidationError(error);
  }
};

export const sendEmail: QueryResolvers['sendEmail'] = async ({ input }) => {
  logger.debug(input, 'creating email ...');

  const emailData = await send({ input, template: WelcomeEmail });

  logger.debug(emailData, 'saving sent email ...');

  return emailData;
};

export const sendWelcomeEmail: QueryResolvers['sendWelcomeEmail'] = async ({
  input,
}) => {
  logger.debug(input, 'creating email ...');

  const emailData = await send({ input, template: WelcomeEmail });

  logger.debug(emailData, 'saving sent email ...');

  return emailData;
};

export const send = async ({
  input,
  template,
}: {
  input: EmailInput;
  template: () => JSX.Element;
}) => {
  try {
    const from = input.from || defaultEmail;
    const to = input.to;
    const subject = input.subject || 'Thank you from Shepherd Pro';
    const when = new Date().toLocaleString();

    logger.debug({ from, to, subject, when, ...input }, 'sending email ....');

    const data: MailResult = await mailer.send(template(), {
      from,
      to,
      subject,
    });

    logger.debug(data, 'raw sendgrid email data');

    if (
      data.handlerInformation &&
      data.handlerInformation['statusCode'] &&
      data.handlerInformation['statusCode'] !== 200
    ) {
      logger.error(data.handlerInformation, 'error sending email');
      throw new ValidationError(
        data.handlerInformation['message'] || 'Unable to send email'
      );
    }

    const emailData = { from, to, subject, statusId: data.messageID };

    logger.debug(emailData, 'sent email and saving with data');

    return emailData;
  } catch (error) {
    logger.error(error, 'Error sending email');

    throw new ValidationError(error);
  }
};
