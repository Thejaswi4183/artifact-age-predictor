'use client';

import { useRouter } from 'next/navigation';
import { useSession } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';

export default function HomePage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/upload');
    } else {
      router.push('/auth');
    }
  }, [session, router]);

  return null; 
}
