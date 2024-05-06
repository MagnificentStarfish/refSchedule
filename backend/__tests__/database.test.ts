import mongoose from 'mongoose';

describe('Database Connection', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/refSchedule', {
    });
  });

  it('successfully connects to the database', async () => {
    const db = mongoose.connection;
    expect(db.readyState).toBe(1); // 1 means connected
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});


// This line is like saying "Hey, I need to use the mongoose library in this file."
import mongoose from 'mongoose';

// This is like a container for your test. It's called "Database Connection".
// You can think of it as a chapter in a book, and the chapter's title is "Database Connection".
describe('Database Connection', () => {

  // This is something that happens once before all the tests in this "chapter" are run.
  // In this case, it's connecting to the database.
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test');
  });

  // This is an individual test. It's like a sentence in the "Database Connection" chapter.
  // This sentence is called "successfully connects to the database".
  it('successfully connects to the database', async () => {
    // This gets the current status of the database connection.
    const db = mongoose.connection;
    // This checks that the database is connected. If it's not, the test will fail.
    expect(db.readyState).toBe(1);
  });

  // This is something that happens once after all the tests in this "chapter" are run.
  // In this case, it's disconnecting from the database.
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
