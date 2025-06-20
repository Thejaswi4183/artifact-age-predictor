"use client";

import AuthTabs from "@/components/AuthTabs";
import PageWrapper from "@/components/PageWrapper";

export default function AuthPage() {
  return (
    <PageWrapper>
      <h1 className="header">🏺 Ancient Artifact Predictor</h1>
      <div className="auth-container">
        <AuthTabs />
      </div>
    </PageWrapper>
  );
}
