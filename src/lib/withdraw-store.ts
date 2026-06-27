interface WithdrawRequest {
  id: string;
  mitraId: string;
  mitraNama: string;
  amount: number;
  bankCode: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  processedAt?: string;
  note?: string;
}

// In-memory store — swap dengan DB nanti
const requests: WithdrawRequest[] = [];

export function createWithdrawRequest(
  data: Omit<WithdrawRequest, 'id' | 'status' | 'createdAt'>
): WithdrawRequest {
  const req: WithdrawRequest = {
    ...data,
    id: `WD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };
  requests.push(req);
  return req;
}

export function getAllWithdrawRequests(): WithdrawRequest[] {
  return [...requests].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getWithdrawRequestById(id: string): WithdrawRequest | undefined {
  return requests.find((r) => r.id === id);
}

export function updateWithdrawStatus(
  id: string,
  status: 'APPROVED' | 'REJECTED',
  note?: string
): WithdrawRequest | null {
  const req = requests.find((r) => r.id === id);
  if (!req) return null;
  req.status = status;
  req.processedAt = new Date().toISOString();
  if (note) req.note = note;
  return req;
}

export type { WithdrawRequest };
