import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: "./db/prisma/schema.prisma" // where your .prisma file lives
});
