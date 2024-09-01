import mongoose, { Schema, model, Model } from 'mongoose';
import { deleteUser } from '../deleteUser';
import User, { IUser } from '../user';

jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    connect: jest.fn(),
    connection: {
      close: jest.fn(),
    },
    Schema: jest.fn(),
    model: jest.fn(),
  };
});

jest.mock('../user', () => {
  const actualUserModule = jest.requireActual('../user');
  return {
    ...actualUserModule,
    find: jest.fn(),
    deleteMany: jest.fn(),
  };
});

describe('deleteUser', () => {
  const email = 'user@example.com';
  const phoneNumber = '123-456-7890';
  const userToDelete = { firstName: 'John', lastName: 'Doe' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deletes a single user with the given email or phone number', async () => {
    (User.find as jest.Mock).mockResolvedValue([userToDelete]);
    (User.deleteMany as jest.Mock).mockResolvedValue({ deletedCount: 1 });

    await deleteUser(email, phoneNumber);

    expect(User.find).toHaveBeenCalledWith({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
    expect(User.deleteMany).toHaveBeenCalledWith({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
    expect(User.deleteMany).toHaveBeenCalledTimes(1);
  });
});
