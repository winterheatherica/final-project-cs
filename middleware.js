import { NextResponse } from 'next/server';
import { getAuthStatus } from './src/firebase/auth';

export async function middleware(request) {
  const authStatus = await getAuthStatus();

  // Jika pengguna tidak terautentikasi atau tidak memiliki tipe 'A', arahkan ke halaman no-access
  if (!authStatus || authStatus.type !== 'A') {
    return NextResponse.redirect(new URL('/no-access', request.url));
  }

  // Lanjutkan ke halaman Dashboard jika pengguna memiliki tipe 'A'
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Jalankan middleware hanya untuk rute dashboard
};
