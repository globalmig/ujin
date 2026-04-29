import { NextRequest } from 'next/server';
import { getContacts } from '@/lib/contacts';
import { isAuthorized, unauthorized } from '@/lib/auth';

export async function GET(request: NextRequest) {
  if (!isAuthorized(request.headers.get('authorization'))) return unauthorized();

  const contacts = await getContacts();
  return Response.json(contacts);
}
