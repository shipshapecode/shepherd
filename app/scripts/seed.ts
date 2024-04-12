import { faker } from '@faker-js/faker';
import type { Prisma } from '@prisma/client';
import { db } from 'api/src/lib/db';
import { generateAPIKey } from 'api/src/lib/utils';

import { hashPassword } from '@redwoodjs/auth-dbauth-api';

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    // TODO: Don't add Bytes/Blobs here since they aren't supported in SQLite/Redwood yet
    // Change when migrated to PostgreSQL

    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:
    let account;
    let actors;
    const users = [
      {
        name: 'Shepherd Guide',
        email: faker.internet.email(),
        password: 'secret1',
        type: 'OWNER',
      },
      {
        name: 'john',
        email: faker.internet.email(),
        password: 'secret2',
        type: 'ADMIN',
      },
      {
        name: 'jane',
        email: faker.internet.email(),
        password: 'secret3',
        type: 'VIEWER',
      },
    ];

    for (const user of users) {
      if (user.type === 'OWNER') {
        account = await db.account.create({
          data: {
            apiKey: generateAPIKey(32),
          },
        });
      }

      const [hashedPassword, salt] = hashPassword(user.password);
      await db.user.create({
        data: {
          name: user.name,
          email: user.email,
          hashedPassword,
          salt,
          accountId: account.id,
        },
      });

      actors = Array.from({ length: 10 }, (idx: number) => ({
        id: idx,
        createdAt: faker.date.past(),
        accountId: account.id,
        properties: JSON.stringify({
          name: faker.person.fullName(),
          email: faker.internet.email(),
        }),
      }));
    }
    const newJourneys: Prisma.JourneyCreateArgs['data'][] = Array.from(
      { length: 10 },
      () => ({
        id: faker.string.uuid(),
        confirmCancel: faker.datatype.boolean(),
        confirmCancelMessage: faker.hacker.phrase(),
        classPrefix: faker.internet.domainWord(),
        // defaultStepOptions: {
        //   scrollTo: faker.datatype.boolean(),
        // },
        exitOnEsc: faker.datatype.boolean(),
        isActive: faker.datatype.boolean(),
        keyboardNavigation: faker.datatype.boolean(),
        // modalContainer: null,
        // stepsContainer: null,
        tourName: faker.commerce.productName(),
        useModalOverlay: faker.datatype.boolean(),
        accountId: account.id,
      })
    );
    // const newSteps = Array.from({ length: 10 }, (_, idx) => {
    //   const journeyId = idx + 1;

    //   return Array.from({ length: 5 }, (_, iter) => ({
    //     journeyId,
    //     attachTo: {
    //       element: `.${faker.internet.domainWord()}`,
    //       on: faker.helpers.arrayElement(['top', 'bottom', 'left', 'right']),
    //     },
    //     advanceOn: {
    //       selector: `.${faker.internet.domainWord()}`,
    //       event: faker.helpers.arrayElement(['click', 'mouseover', 'mouseout']),
    //     },
    //     arrow: faker.datatype.boolean(),
    //     beforeShowPromise:
    //       'return new Promise((resolve) => setTimeout(resolve, 1000))',
    //     buttons: JSON.stringify([
    //       {
    //         classes: 'shepherd-button-secondary',
    //         text: 'Back',
    //       },
    //       {
    //         text: 'Next',
    //       },
    //     ]),
    //     cancelIcon: {
    //       enabled: faker.datatype.boolean(),
    //       label: faker.hacker.phrase(),
    //     },
    //     canClickTarget: faker.datatype.boolean(),
    //     classes: faker.hacker.abbreviation(),
    //     highlightClass: faker.hacker.abbreviation(),
    //     modalOverlayOpeningPadding: faker.number.int(),
    //     modalOverlayOpeningRadius: {
    //       top: faker.number.int(),
    //     },
    //     floatingUIOptions: {
    //       classes: faker.hacker.abbreviation(),
    //       copyStyles: faker.datatype.boolean(),
    //     },
    //     scrollTo: faker.datatype.boolean(),
    //     scrollToHandler: '(el) => el.scrollIntoView()',
    //     showOn: '(el) => el.classList.contains("active")',
    //     text: faker.hacker.phrase(),
    //     title: faker.animal.type(),
    //     when: {
    //       show: '() => true',
    //       hide: '() => false',
    //     },
    //   }));
    // }).flat();

    const journeyRecords = [];
    const actorRecords = [];
    await Promise.all(
      newJourneys.map(async (data: Prisma.JourneyCreateArgs['data'], idx) => {
        const journeyRecord = await db.journey.create({ data });
        const actorRecord = await db.actor.create({ data: actors[idx] });
        journeyRecords.push(journeyRecord.id);
        actorRecords.push(actorRecord.id);
      })
    );
    // @ts-ignore
    const newMetrics: Prisma.MetricCreateArgs['data'][] = Array.from(
      { length: 10 },
      (_item: unknown, idx: number) => ({
        createdAt: faker.date.past(),
        accountId: account.id,
        journeyState: faker.helpers.arrayElement([
          'ACTIVE',
          'CANCEL',
          'COMPLETE',
          'SHOW',
        ]),
        type: 'EVENT',
        value: JSON.stringify({
          currentUrl: faker.internet.url(),
          currentUserId: actorRecords[idx],
          eventType: faker.helpers
            .arrayElement(['ACTIVE', 'CANCEL', 'COMPLETE', 'SHOW'])
            .toLowerCase(),
          journeyData: {
            id: journeyRecords[idx],
            numberOfSteps: 1,
          },
        }),
        actorId: actorRecords[idx],
        journeyId: journeyRecords[idx],
      })
    );

    await db.metric.createMany({ data: newMetrics });
  } catch (error) {
    console.warn('Please define your seed data.');
    console.error(error);
  }
};
