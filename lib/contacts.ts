import { supabase } from './supabase';

export interface ContactSubmission {
  id: string;
  created_at: string;
  company: string;
  position: string;
  manager: string;
  tel: string;
  mobile?: string | null;
  fax?: string | null;
  email: string;
  product: string;
  input_voltage?: string | null;
  output_voltage?: string | null;
  input_hz?: string | null;
  output_hz?: string | null;
  capacity?: string | null;
  backup?: string | null;
  message?: string | null;
}

export async function getContacts(): Promise<ContactSubmission[]> {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function saveContact(
  contact: Omit<ContactSubmission, 'id' | 'created_at'>
): Promise<ContactSubmission> {
  const { data, error } = await supabase
    .from('contacts')
    .insert(contact)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteContact(id: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id)
    .select('id');

  if (error) throw error;
  return (data?.length ?? 0) > 0;
}
