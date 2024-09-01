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

const UserModel = User as unknown as Model<IUser>;

(UserModel.find as jest.Mock) = jest.fn();
(UserModel.deleteMany as jest.Mock) = jest.fn();

describe('deleteUser', () => {
  const email = 'user@example.com';
  const phoneNumber = '123-456-7890';
  const userToDelete = { firstName: 'John', lastName: 'Doe' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deletes a single user with the given email or phone number', async () => {
    (UserModel.find as jest.Mock).mockResolvedValue([userToDelete]);
    (UserModel.deleteMany as jest.Mock).mockResolvedValue({ deletedCount: 1 });

    await deleteUser(email, phoneNumber);

    expect(UserModel.find).toHaveBeenCalledWith({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
    expect(UserModel.deleteMany).toHaveBeenCalledWith({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
    expect(UserModel.deleteMany).toHaveBeenCalledTimes(1);
  });
});
