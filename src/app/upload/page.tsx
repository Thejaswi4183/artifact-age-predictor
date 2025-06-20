'use client';

import { useSession } from '@supabase/auth-helpers-react';
import UploadForm from '@/components/UploadForm';

export default function UploadPage() {
  const session = useSession();

  if (!session?.user) {
    return (
      <div className="container">
        <h2 className="header">Please Sign In</h2>
        <p>
          You must be logged in to use the predictor. <br />
          <a href="/auth" style={{ color: 'blue' }}>Go to Login</a>
        </p>
      </div>
    );
  }

  return <UploadForm />;
}
