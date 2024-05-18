import { buildConfig } from 'payload/config';
import { viteBundler } from '@payloadcms/bundler-vite';
import path from 'path';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';

import Users from './src/collections/Users';
import Posts from './src/collections/Posts';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    bundler: viteBundler(),
    user: Users.slug
  },
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI
    }
  }),
  collections: [Users, Posts],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql')
  }
});
