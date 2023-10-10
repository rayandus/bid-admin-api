import { TestBed } from '@automock/jest';
import * as dotenv from 'dotenv';
import { UserService } from '../user.service';
import { AccountService } from 'account/account.service';

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('UserRegistrationService', () => {
  let userService: UserService;
  // let accountService: jest.Mocked<AccountService>;

  beforeAll(() => {
    const { unit } = TestBed.create(UserService).mock(AccountService).using({ addBalance: jest.fn() }).compile();

    userService = unit;

    // Currently AccountService is not used in UserService
    // accountService = unitRef.get(AccountService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should call dotenv.config', () => {
    dotenv.config();
    expect(dotenv.config).toHaveBeenCalled();
  });
});
