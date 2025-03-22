import "../globals.css"; // or './globals.css' if in the same folder
import Sidebar from "../components/SideBar";

export const metadata = {
  title: "My Next.js App",
  description: "Example layout with sidebar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
