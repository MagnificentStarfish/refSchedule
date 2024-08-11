import { deleteUser } from '../deleteUser';
import User from '../user';
import { Model } from 'mongoose';
import { IUser } from '../user';

// Mock the mongoose functions used in deleteUser
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    close: jest.fn(),
  },
}));

// Explicitly type User as Model<IUser>
const UserModel = User as unknown as Model<IUser>;

// Create a mock function for User.find and User.deleteMany
(UserModel.find as jest.Mock) = jest.fn();
(UserModel.deleteMany as jest.Mock) = jest.fn();

describe('deleteUser', () => {
  const email = 'user@example.com';
  const phoneNumber = '123-456-7890';
  const usersToDelete = [
    { firstName: 'John', lastName: 'Doe' },
    { firstName: 'Jane', lastName: 'Doe' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deletes users with the given email or phone number', async () => {
    (UserModel.find as jest.Mock).mockResolvedValue(usersToDelete);
    (UserModel.deleteMany as jest.Mock).mockResolvedValue({ deletedCount: usersToDelete.length });

    // Act
    await deleteUser(email, phoneNumber);

    // Assert
    expect(UserModel.find).toHaveBeenCalledWith({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
    expect(UserModel.deleteMany).toHaveBeenCalledWith({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
  });

  it('logs an error if User.find throws an error', async () => {
    const findError = new Error('Find error');
    (UserModel.find as jest.Mock).mockRejectedValue(findError);

    console.error = jest.fn();

    try {
      await deleteUser(email, phoneNumber);
    } catch (error) {
      // Expected to throw
    }

    expect(console.error).toHaveBeenCalledWith('An error occurred:', findError);
    expect(UserModel.find).toHaveBeenCalledWith({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
    expect(UserModel.deleteMany).not.toHaveBeenCalled();
  });

  it('logs an error if User.deleteMany throws an error', async () => {
    (UserModel.find as jest.Mock).mockResolvedValue(usersToDelete);
    const deleteError = new Error('Delete error');
    (UserModel.deleteMany as jest.Mock).mockRejectedValue(deleteError);

    console.error = jest.fn();

    try {
      await deleteUser(email, phoneNumber);
    } catch (error) {
      // Expected to throw
    }

    expect(console.error).toHaveBeenCalledWith(deleteError);
    expect(UserModel.find).toHaveBeenCalledWith({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
    expect(UserModel.deleteMany).toHaveBeenCalledWith({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
  });

  it('logs a message if no users are found to delete', async () => {
    (UserModel.find as jest.Mock).mockResolvedValue([]);

    console.log = jest.fn();

    await deleteUser(email, phoneNumber);

    expect(console.log).toHaveBeenCalledWith('No users found to delete.');
    expect(UserModel.find).toHaveBeenCalledWith({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
    expect(UserModel.deleteMany).not.toHaveBeenCalled();
  });

  it('logs the number of users deleted', async () => {
    (UserModel.find as jest.Mock).mockResolvedValue(usersToDelete);
    (UserModel.deleteMany as jest.Mock).mockResolvedValue({ deletedCount: usersToDelete.length });

    console.log = jest.fn();

    await deleteUser(email, phoneNumber);

    expect(console.log).toHaveBeenCalledWith(`Successfully deleted ${usersToDelete.length} user(s).`);
    expect(UserModel.find).toHaveBeenCalledWith({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
    expect(UserModel.deleteMany).toHaveBeenCalledWith({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
  });
});
