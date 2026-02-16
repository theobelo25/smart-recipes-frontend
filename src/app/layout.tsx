import { AuthInitializer } from "@/src/features/auth";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AuthInitializer>{children}</AuthInitializer>
      </body>
    </html>
  );
}
