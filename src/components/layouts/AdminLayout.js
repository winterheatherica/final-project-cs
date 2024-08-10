// src/components/layouts/AdminLayout.js
import Footer from './Footer';

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-grow">{children}</main>
      <Footer show={false} /> {/* Hide footer for admin */}
    </div>
  );
}
