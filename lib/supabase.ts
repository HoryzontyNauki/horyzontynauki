import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const serverClient = () => {
  const cookieStore = cookies();
  // UWAGA: przekazujemy funkcję zwracającą cookieStore
  return createServerComponentClient({ cookies: () => cookieStore });
};
