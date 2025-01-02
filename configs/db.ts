
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!||"postgresql://neondb_owner:l7U1pkbczYuo@ep-fancy-band-a53pinfa.us-east-2.aws.neon.tech/ai-content-genarator?sslmode=require");
export const db = drizzle({ client: sql });

