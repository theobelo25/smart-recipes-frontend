import { AuthInitializer } from "@/src/features/auth";
import { ThemeProvider } from "@/src/shared/components/providers/ThemeProvider";
import "./globals.css";
import Header from "../shared/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AuthInitializer>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </AuthInitializer>
      </body>
    </html>
  );
}
