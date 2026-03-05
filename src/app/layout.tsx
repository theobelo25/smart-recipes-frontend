import { AuthInitializer } from "@/src/features/auth";
import { ThemeProvider } from "@/src/shared/components/providers/ThemeProvider";
import { Toaster } from "@/src/shared/ui/sonner";
import "./globals.css";
import Header from "@/src/shared/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased pb-8">
        <AuthInitializer>
          <ThemeProvider>
            <Header />
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthInitializer>
      </body>
    </html>
  );
}
