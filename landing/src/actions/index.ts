import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import { Polar } from "@polar-sh/sdk";

const polar = new Polar({
  accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
});

export const server = {
  checkout: defineAction({ 
    input: z.object({
      productPriceId: z.string(),
    }),
    handler: async (input) => {
      const { productPriceId } = input;
      let result;
 
      try {
        result = await polar.checkouts.create({
          productPriceId: productPriceId,
          successUrl: 'https://docs.shepherdjs.dev',
        });
      } catch (error) {
        console.error("Checkout error:", error);
      } finally {
        if (result?.url) {
          return result.url;
        } else {
          return 'https://shepherdjs.dev';
        }
      }
    }
  })
}