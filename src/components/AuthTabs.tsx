"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

export default function AuthTabs() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/upload");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fullName = form.fullname.value;
    const email = form.email.value;
    const password = form.password.value;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setToastMessage("Check your email to confirm your registration.");
      setIsLogin(true); // Redirect to login form
    }
  };

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/upload",
        queryParams: {
          prompt: "login", 
        },
      },
    });

    if (error) setError(error.message);
  };

  return (
    <div className="container auth">
      <div className="tab-buttons">
        <button
          className={`tab ${isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`tab ${!isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3 }}
          >
            <form className="form" onSubmit={handleLogin}>
              <input type="email" name="email" placeholder="Email" required />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <button type="submit">SIGN IN</button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <form className="form" onSubmit={handleRegister}>
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                required
              />
              <input type="email" name="email" placeholder="Email" required />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <button type="submit">Register</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="divider"></div>
      <h2>
        <center>OR</center>
      </h2>

      <button onClick={handleGitHubLogin} className="github-button">
        Sign in with GitHub
      </button>

      {error && <p className="error">{error}</p>}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
