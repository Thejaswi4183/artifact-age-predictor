"use client";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

export default function Header() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth"; // redirect to auth/login page
  };

  if (!session) return null;

  const displayName =
    session.user.user_metadata?.username ||
    session.user.user_metadata?.full_name ||
    session.user.user_metadata?.name ||
    session.user.email;

  return (
    <header className="main-header">
      <div className="left-title">
        <h1 className="title-text">🏺 Ancient Artifact Predictor</h1>
      </div>

      <div className="right-controls">
        <span className="user-name">👤 {displayName}</span>

        <Link href="/logs">
          <button className="log-button">📂 View Logs</button>
        </Link>

        <button className="logout-button" onClick={handleLogout}>
          🔓 Logout
        </button>
      </div>
    </header>
  );
}
