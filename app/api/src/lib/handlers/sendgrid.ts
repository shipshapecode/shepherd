import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import SendGridMail from '@sendgrid/mail/src/classes/mail-service';

import type {
  MailSendOptionsComplete,
  MailRenderedContent,
  MailResult,
} from '@redwoodjs/mailer-core';
import { AbstractMailHandler } from '@redwoodjs/mailer-core';

import { logger } from '../logger';

export class SendGridMailHandler extends AbstractMailHandler {
  private client: SendGridMail;

  constructor({ apiKey }: { apiKey: string }) {
    super();
    this.client = new SendGridMail();
    this.client.setApiKey(apiKey);
  }

  async send(
    content: MailRenderedContent,
    sendOptions: MailSendOptionsComplete
  ): Promise<MailResult> {
    const transformedAttachments = [];
    const attachements = sendOptions.attachments;
    if (attachements) {
      for (let i = 0; i < attachements.length; i++) {
        const attachment = attachements[i];
        if (typeof attachment.content === 'string') {
          transformedAttachments.push({
            ...attachment,
            // We assume utf8 encoding here. We should document this and if users
            // wish to use a different encoding, we can recomment they pass an already
            // encoded Buffer instead of a string which will be encoded here.
            content: Buffer.from(attachment.content, 'utf8'),
          });
        } else {
          transformedAttachments.push(attachment);
        }
      }
    }

    logger.debug('🐙 args for email', { content, sendOptions });

    const result = await this.client.send({
      // Standard options
      attachments: transformedAttachments,
      bcc: sendOptions.bcc,
      cc: sendOptions.cc,
      from: sendOptions.from,
      headers: sendOptions.headers,
      replyTo: sendOptions.replyTo,
      subject: sendOptions.subject,
      to: sendOptions.to,

      // Content
      html: content.html,
      text: content.text,
    } as MailDataRequired);

    return {
      messageID: result.statusCode,
      handlerInformation: result,
    };
  }

  internal() {
    return {
      client: this.client,
    };
  }
}
