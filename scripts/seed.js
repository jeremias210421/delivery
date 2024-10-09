const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function seedDatabase() {
  try {
    await client.connect();
    const database = client.db('seu_banco');
    const users = database.collection('users');
    
    // Limpa a coleção existente
    await users.deleteMany({});

    // Insere novos documentos
    const result = await users.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword123'
      },
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'hashedpassword456'
      }
    ]);

    console.log(`${result.insertedCount} documentos foram inseridos`);
  } finally {
    await client.close();
  }
}

seedDatabase().catch(console.error);
