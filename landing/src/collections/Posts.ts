import type { CollectionConfig } from 'payload/types';

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title'
  },
  access: {
    read: () => true
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'content',
      type: 'text',
      required: true
    },
    {
      name: 'slug',
      type: 'text',
      required: true
    }
  ]
};

export default Posts;
