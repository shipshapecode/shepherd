import type { CollectionConfig } from 'payload/types';

import { admins } from '../access/admins';
import { anyone } from '../access/anyone';
import adminsAndUser from '../access/adminsAndUser';
import { checkRole } from './checkRole';

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email']
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user)
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text'
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'admin',
          value: 'admin'
        },
        {
          label: 'user',
          value: 'user'
        }
      ],
      access: {
        read: admins,
        create: admins,
        update: admins
      }
    }
  ],
  timestamps: true
};

export default Users;
