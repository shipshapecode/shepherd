import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      social: {
        github: 'https://github.com/withastro/starlight'
      },
      plugins: [
        // Generate the documentation.
        starlightTypeDoc({
          entryPoints: ['../shepherd/shepherd.js/src'],
          tsconfig: '../shepherd/shepherd.js/tsconfig.json'
        })
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: 'Example Guide',
              link: '/guides/example/'
            },
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
            // Each item here is one entry in the navigation menu.
            {
              label: 'Cookbook',
              link: '/recipes/cookbook/'
            }
          ]
        },
        {
          label: 'Shepherd Pro',
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: 'Example Guide',
              link: '/guides/example/'
            }
          ]
        },
        {
          label: 'Reference',
          autogenerate: {
            directory: 'reference'
          }
        },
        typeDocSidebarGroup
      ]
    }),
    tailwind()
  ]
});