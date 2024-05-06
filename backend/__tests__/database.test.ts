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
