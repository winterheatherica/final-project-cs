import Image from 'next/image';
import logo from '/public/logo.png';

export default function About() {
  return (
    <section className="text-black max-w-4xl mx-auto text-justify py-8">
      <div className="flex items-center justify-center">
        <div className="flex-shrink-0">
          <Image src={logo} alt="CSC PNJ Logo" height={320} width={320} />
        </div>
        <div className="ml-8">
          <h1 className="text-4xl font-bold mb-4">About CSC</h1>
          <p className="text-lg leading-relaxed">
            Computer Student Club (CSC) adalah kelompok studi mahasiswa di bawah naungan Jurusan Teknik Informatika dan Komputer, Politeknik Negeri Jakarta. Dengan fokus pada pengembangan minat dan bakat mahasiswa dalam bidang teknologi, CSC telah menjadi wadah untuk pemahaman yang lebih dalam tentang keamanan jaringan, pengembangan perangkat lunak, dan Internet of Things (IoT).
          </p>
        </div>
      </div>
    </section>
  );
}
