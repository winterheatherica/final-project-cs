import Image from 'next/image';

const About = () => {
  return (
    <section className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl text-left mb-4">About CSC</h1>
      <div className="flex items-center">
        <div className="about-logo">
          <Image src="/path/to/logo.png" alt="CSC PNJ Logo" width={150} height={150} />
        </div>
        <div className="about-text ml-4">
          <p>Computer Student Club (CSC) adalah kelompok studi mahasiswa di bawah naungan Jurusan Teknik Informatika dan Komputer, Politeknik Negeri Jakarta. Dengan fokus pada pengembangan minat dan bakat mahasiswa dalam bidang teknologi, CSC telah menjadi wadah untuk pemahaman yang lebih dalam tentang keamanan jaringan, pengembangan perangkat lunak, dan Internet of Things (IoT).</p>
        </div>
      </div>
    </section>
  );
};

export default About;
