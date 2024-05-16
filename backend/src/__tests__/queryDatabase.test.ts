import User from '../user';
import mongoose from 'mongoose';


describe('Database Connection', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/refSchedule', {
    });
  });

  test('successfully connects to the database', async () => {
    const db = mongoose.connection;
    expect(db.readyState).toBe(1); // 1 means connected
  });

  test('can retrieve data from the database', async () => {
    const users = await User.find({});
    expect(users.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
