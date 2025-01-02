import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: './configs/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:l7U1pkbczYuo@ep-fancy-band-a53pinfa.us-east-2.aws.neon.tech/ai-content-genarator?sslmode=require',
  },
});