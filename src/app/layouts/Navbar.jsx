import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl">MyApp</div>
        <div>
          <Link href="/"><a className="mr-4">Home</a></Link>
          <Link href="/about"><a>About</a></Link>
        </div>
      </div>
    </nav>
  );
}
