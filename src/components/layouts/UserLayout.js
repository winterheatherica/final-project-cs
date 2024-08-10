// src/components/layouts/UserLayout.js
import Navbar from './Navbar';
import Footer from './Footer';

export default function UserLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer show={true}/>
    </div>
  );
}
