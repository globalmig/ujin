import { NextRequest } from 'next/server';
import { deleteContact } from '@/lib/contacts';
import { isAuthorized, unauthorized } from '@/lib/auth';

export async function DELETE(
  request: NextRequest,
  ctx: RouteContext<'/api/admin/contacts/[id]'>
) {
  if (!isAuthorized(request.headers.get('authorization'))) return unauthorized();

  const { id } = await ctx.params;
  const deleted = await deleteContact(id);

  if (!deleted) return Response.json({ error: 'Not found' }, { status: 404 });

  return Response.json({ success: true });
}
