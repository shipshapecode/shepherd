import type {
  // QueryResolvers,
  MutationResolvers,
} from 'types/graphql';
import chargebee from 'chargebee';

import { db } from 'src/lib/db';
import { logger } from 'src/lib/logger';

// export const subscriptions: QueryResolvers['subscriptions'] = () => {
//   return db.subscription.findMany();
// };

// export const subscription: QueryResolvers['subscription'] = ({ id }) => {
//   return db.subscription.findUnique({
//     where: { id },
//   });
// };

export const createSubscription: MutationResolvers['createSubscription'] =
  async ({ input }) => {
    const usingChargebee =
      process.env.CHARGEBEE_SITE && process.env.CHARGEBEE_API_KEY;
    let chargeBeeCustomerId;
    try {
      if (usingChargebee) {
        chargebee.configure({
          site: process.env.CHARGEBEE_SITE,
          api_key: process.env.CHARGEBEE_API_KEY,
        });

        const chargbeeCustomer = await chargebee.customer.create().request();

        chargeBeeCustomerId = chargbeeCustomer.customer.id;
      }
    } catch (error) {
      logger.error(`Error creating subscription: ${error.message}`);
    }
    return db.subscription.create({
      data: {
        ...input,
        chargeBeeCustomerId,
      },
    });
  };

// export const updateSubscription: MutationResolvers['updateSubscription'] = ({
//   id,
//   input,
// }) => {
//   return db.subscription.update({
//     data: input,
//     where: { id },
//   });
// };

// export const deleteSubscription: MutationResolvers['deleteSubscription'] = ({
//   id,
// }) => {
//   return db.subscription.delete({
//     where: { id },
//   });
// };

export const getSubscriptionCheckoutUrl = async ({
  planId,
}: {
  planId: string;
}) => {
  logger.info(`Getting checkout URL for plan ${planId}`);
  try {
    chargebee.configure({
      site: process.env.CHARGEBEE_SITE,
      api_key: process.env.CHARGEBEE_API_KEY,
    });

    const response = await chargebee.hosted_page
      .checkout_new_for_items({
        subscription_items: [
          {
            item_price_id: planId,
            quantity: 1,
          },
        ],
      })
      .request();
    logger.info('Checkout URL', response);

    return response.hosted_page;
  } catch (error) {
    logger.error(`Error getting checkout URL: ${error.message}`);
  }
};

export const getSubscriptionPortalSesion = async () => {
  logger.info('Getting subscription portal session');
  try {
    const subscription = await db.subscription.findFirst({
      where: { userId: context.currentUser.id },
    });
    logger.info(`${subscription.chargeBeeCustomerId} subscription 🍻`);

    chargebee.configure({
      site: process.env.CHARGEBEE_SITE,
      api_key: process.env.CHARGEBEE_API_KEY,
    });
    const url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8910'
        : 'https://shepherdpro.com';
    const response = await chargebee.portal_session
      .create({
        redirect_url: `https://shepherdpro.com/dashboard`,
        customer: {
          id: subscription.chargeBeeCustomerId,
        },
      })
      .request();
    logger.info('Portal session', response);

    return response.portal_session;
  } catch (error) {
    logger.error(`Error getting portal session: ${error.message}`);
  }
};
