import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../account.service';
import * as dotenv from 'dotenv';

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call dotenv.config', () => {
    dotenv.config();
    expect(dotenv.config).toHaveBeenCalled();
  });
});
