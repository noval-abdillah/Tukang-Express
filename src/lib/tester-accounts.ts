import type { Role } from './session';

export interface TesterAccount {
  hp: string;
  nama: string;
  role: Role;
  userId: string;
}

export const TESTER_OTP = '123456';

export const TESTER_ACCOUNTS: TesterAccount[] = [
  {
    hp: '08111111111',
    nama: 'Tester Customer',
    role: 'CUSTOMER',
    userId: 'tester-cust-001',
  },
  {
    hp: '08222222222',
    nama: 'Tester Mitra',
    role: 'MITRA',
    userId: 'tester-mitra-001',
  },
  {
    hp: '08000000000',
    nama: 'Admin Tukang Express',
    role: 'ADMIN',
    userId: 'admin-001',
  },
];

export function findTesterAccount(hp: string): TesterAccount | undefined {
  return TESTER_ACCOUNTS.find((a) => a.hp === hp);
}
