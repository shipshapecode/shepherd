import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Documentation',
      description:
        'Shepherd is a way for guiding users through your app to that moment of "aha!".',
      logo: {
        src: './src/assets/Shepherd-Lamb.svg'
      },
      favicon: '/favicon.ico',
      social: {
        github: 'https://github.com/shipshapecode/shepherd'
      },
      components: {
        // Override the default `Head` component.
        Head: './src/components/HeadWithPosthog.astro'
      },
      plugins: [
        starlightTypeDoc({
          entryPoints: ['./node_modules/shepherd.js/src/*.ts'],
          tsconfig: './node_modules/shepherd.js/tsconfig.json',
          typeDoc: {
            entryPointStrategy: 'expand',
            includeVersion: true
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
    }),
    tailwind()
  ]
});