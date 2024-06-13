import { deleteUser } from '../deleteUser';
import User from '../user';


// Mock the mongoose functions used in deleteUser
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    close: jest.fn(),
  },
}));

// Create a mock function for User.find and User.deleteMany
User.find = jest.fn();
User.deleteMany = jest.fn();

describe('deleteUser', () => {
  it('deletes users with the given email or phone number', async () => {
    const email = 'user@example.com';
    const phoneNumber = '123-456-7890';
    const usersToDelete = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Doe' },
    ];
    (User.find as jest.Mock).mockResolvedValue(usersToDelete);
    (User.deleteMany as jest.Mock).mockResolvedValue({ deletedCount: usersToDelete.length });

    // Act
    await deleteUser(email, phoneNumber);

    // Assert
    expect(User.find).toHaveBeenCalledWith({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
    expect(User.deleteMany).toHaveBeenCalledWith({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
  });
});
