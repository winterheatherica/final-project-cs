import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-900 text-white flex justify-between items-center p-4">
      <div className="flex items-center">
        <div className="logo">
          <Image src="/path/to/logo.png" alt="CSC PNJ Logo" width={50} height={50} />
        </div>
        <div className="site-title ml-2">
          <h1 className="text-xl">CSC PNJ</h1>
        </div>
      </div>
      <nav className="flex-grow flex justify-center">
        <ul className="flex space-x-4">
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/about"><a>About</a></Link></li>
          <li><Link href="/division"><a>Division</a></Link></li>
          <li><Link href="/event"><a>Event</a></Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
