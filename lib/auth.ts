const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin1234';

export function isAuthorized(authHeader: string | null): boolean {
  return authHeader === `Bearer ${ADMIN_PASSWORD}`;
}

export function unauthorized(): Response {
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}
