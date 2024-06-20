import 'dotenv/config';
import { db } from '@vercel/postgres';

async function seedProblemUsers() {
  const client = await db.connect();
  const batchSize = 1000; // Размер пакета для вставки
  const totalRecords = 1000000; // Общее количество записей для вставки

  try {
    for (let i = 0; i < totalRecords; i += batchSize) {
      const users = [];
      for (let j = 0; j < batchSize && i + j < totalRecords; j++) {
        users.push(
          `('FirstName${i + j}', 'LastName${i + j}', ${Math.floor(Math.random() * 80) + 10}, '${Math.random() > 0.5 ? 'MALE' : 'FEMALE'}', true)`,
        );
      }

      const query = `
        INSERT INTO problem_users (first_name, last_name, age, gender, has_problems)
        VALUES ${users.join(',')}
      `;

      try {
        await client.query(query);
        console.log(`Inserted ${i + users.length} users`);
      } catch (err) {
        console.error('Error inserting batch:', err);
        break; // Прервать цикл, если произошла ошибка
      }
    }

    console.log('Seed completed successfully.');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    client.release();
  }
}

seedProblemUsers();
