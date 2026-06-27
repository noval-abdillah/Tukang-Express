interface OtpEntry {
  otp: string;
  expiresAt: number;
  attempts: number;
}

const store = new Map<string, OtpEntry>();

const OTP_TTL = 5 * 60 * 1000; // 5 menit
const MAX_ATTEMPTS = 5;
const MOCK_OTP = '123456';

export function createOtp(hp: string): string {
  // Di production: generate random 6 digit dan kirim via SMS
  // Untuk tester: selalu 123456
  const otp = MOCK_OTP;
  store.set(hp, { otp, expiresAt: Date.now() + OTP_TTL, attempts: 0 });
  return otp;
}

export function verifyOtp(hp: string, inputOtp: string): 'valid' | 'invalid' | 'expired' | 'max_attempts' {
  const entry = store.get(hp);
  if (!entry) return 'expired';
  if (Date.now() > entry.expiresAt) {
    store.delete(hp);
    return 'expired';
  }
  if (entry.attempts >= MAX_ATTEMPTS) return 'max_attempts';

  entry.attempts += 1;

  if (entry.otp !== inputOtp) return 'invalid';

  store.delete(hp); // OTP sekali pakai
  return 'valid';
}

export function deleteOtp(hp: string): void {
  store.delete(hp);
}
