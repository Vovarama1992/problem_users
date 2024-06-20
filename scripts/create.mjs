import 'dotenv/config';
import { db } from '@vercel/postgres';

async function createTable() {
  const client = await db.connect();
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS problem_users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        age INT NOT NULL,
        gender VARCHAR(10) NOT NULL CHECK (gender IN ('MALE', 'FEMALE')),
        has_problems BOOLEAN DEFAULT TRUE
      );
    `;
    console.log('Table "problem_users" created successfully.');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    client.release();
  }
}

createTable();
