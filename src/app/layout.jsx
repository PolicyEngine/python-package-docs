import "./globals.css";

export const metadata = {
  title: "PolicyEngine Python Package",
  description:
    "Simulate US tax and benefit policy impacts with the policyengine-us Python package.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
