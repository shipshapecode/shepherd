import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import starlightLlmsTxt from 'starlight-llms-txt';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.shepherdjs.dev',
  integrations: [
    starlight({
      title: 'Documentation',
      description:
        'Shepherd is a way for guiding users through your app to that moment of "aha!".',
      logo: {
        src: './src/assets/Shepherd-Lamb.svg'
      },
      favicon: '/favicon.ico',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/shipshapecode/shepherd'
        },
        {
          icon: 'discord',
          label: 'Discord',
          href: 'https://discord.gg/EGcDW5NSud'
        }
      ],
      components: {
        // Override the default `Head` component.
        Head: './src/components/HeadWithPosthog.astro'
      },
      plugins: [
        starlightLlmsTxt({
          projectName: 'Shepherd.js',
          description:
            'Shepherd is a JavaScript library for building guided product tours, user onboarding flows, and feature announcements. It works with React, Vue, Angular, Ember, or plain JavaScript. Free for noncommercial use under the PolyForm Noncommercial License 1.0.0 and free to evaluate for 30 days; commercial use needs a one-time license from $50 at https://www.shepherdjs.dev/pricing.'
        }),
        starlightTypeDoc({
          entryPoints: ['./node_modules/shepherd.js/src/*.ts'],
          tsconfig: './node_modules/shepherd.js/tsconfig.json',
          typeDoc: {
            entryPointStrategy: 'expand',
            includeVersion: true,
            // Without a readme, starlight-typedoc drops each module's index page
            // while the API index still links to it.
            readme: './api-readme.md'
          }
        })
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            {
              label: 'Install',
              link: '/guides/install/'
            },
            {
              label: 'Styling',
              link: '/guides/styling/'
            },
            {
              label: 'Usage',
              link: '/guides/usage/'
            },
            {
              label: 'License & Pricing',
              link: '/guides/license/'
            }
          ]
        },
        {
          label: 'Recipes',
          items: [
            {
              label: 'Cookbook',
              link: '/recipes/cookbook/'
            },
            {
              label: 'Analytics',
              link: '/guides/analytics/'
            },
            {
              label: 'React',
              link: '/recipes/react/'
            }
          ]
        },
        // {
        //   label: 'Reference',
        //   autogenerate: {
        //     directory: 'reference'
        //   }
        // },
        typeDocSidebarGroup
      ]
    })
  ]
});
