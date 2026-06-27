import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export type Role = 'CUSTOMER' | 'MITRA' | 'ADMIN';

export interface SessionPayload {
  userId: string;
  role: Role;
  nama: string;
  hp: string;
}

const COOKIE_NAME = 'te_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

function getSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) {
    return 'tukang-express-dev-secret-minimum-32-chars!!';
  }
  return s;
}

async function sign(payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return Buffer.from(sig).toString('hex');
}

async function verify(payload: string, sig: string): Promise<boolean> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
  const sigBuf = Buffer.from(sig, 'hex');
  return crypto.subtle.verify('HMAC', key, sigBuf, enc.encode(payload));
}

export async function encodeSession(payload: SessionPayload): Promise<string> {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64');
  const sig = await sign(data);
  return `${data}.${sig}`;
}

export async function decodeSession(token: string): Promise<SessionPayload | null> {
  try {
    const dot = token.lastIndexOf('.');
    if (dot === -1) return null;
    const data = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const valid = await verify(data, sig);
    if (!valid) return null;
    return JSON.parse(Buffer.from(data, 'base64').toString('utf8')) as SessionPayload;
  } catch {
    return null;
  }
}

// Server Component: baca session dari cookies()
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return decodeSession(token);
}

// API Route: set session cookie di response
export async function setSessionCookie(res: NextResponse, payload: SessionPayload): Promise<void> {
  const token = await encodeSession(payload);
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: MAX_AGE,
    path: '/',
  });
}

// API Route: hapus session cookie
export function clearSessionCookie(res: NextResponse): void {
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });
}

// Middleware helper: baca session dari request (sync wrapper — decode async di edge)
export async function getSessionFromRequestAsync(req: NextRequest): Promise<SessionPayload | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return decodeSession(token);
}

// ponytail: getSessionFromRequest sync tidak bisa async di middleware matcher config
// Untuk middleware gunakan getSessionFromRequestAsync
export function getSessionFromRequest(req: NextRequest): string | null {
  return req.cookies.get(COOKIE_NAME)?.value ?? null;
}

export function generateNonce(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
