import "./globals.css";

export const metadata = {
  title: "BREU | Creator Platform",
  description: "The all-in-one platform for digital businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
