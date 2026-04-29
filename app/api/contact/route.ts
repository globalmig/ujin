import { NextRequest } from 'next/server';
import { saveContact } from '@/lib/contacts';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const tel =
    body.tel1 && body.tel2 && body.tel3
      ? `${body.tel1}-${body.tel2}-${body.tel3}`
      : '';
  const mobile =
    body.mobile1 && body.mobile2 && body.mobile3
      ? `${body.mobile1}-${body.mobile2}-${body.mobile3}`
      : null;
  const fax =
    body.fax1 && body.fax2 && body.fax3
      ? `${body.fax1}-${body.fax2}-${body.fax3}`
      : null;

  const contact = await saveContact({
    company: body.company,
    position: body.position,
    manager: body.manager,
    tel,
    mobile,
    fax,
    email: `${body.email1}@${body.email2}`,
    product: body.product ?? '',
    input_voltage: body.inputVoltage || null,
    output_voltage: body.outputVoltage || null,
    input_hz: body.inputHz || null,
    output_hz: body.outputHz || null,
    capacity: body.capacity || null,
    backup: body.backup || null,
    message: body.message || null,
  });

  return Response.json({ success: true, id: contact.id });
}
