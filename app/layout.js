import "./globals.css";

export const metadata = {
  title: "IQRA | Creator Platform",
  description: "An all-in-one platform for courses, memberships, funnels, and payments.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
