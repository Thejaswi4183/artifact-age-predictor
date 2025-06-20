import "../styles/globals.css";
import { Inter } from "next/font/google";
import SupabaseProvider from "../components/SupabaseProvider";
import ClientLayout from "../components/ClientLayout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Artifact Age Predictor",
  description: "Predict the age of historical artifacts",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider session={session}>
          <ClientLayout>{children}</ClientLayout>
        </SupabaseProvider>
      </body>
    </html>
  );
}
