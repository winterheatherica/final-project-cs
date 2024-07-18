import Header from '../components/Header';
import About from '../components/About';

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main className="p-4">
        <About />
      </main>
    </div>
  );
}
