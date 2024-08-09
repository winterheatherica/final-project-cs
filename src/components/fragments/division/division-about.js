"use client";
import { useEffect, useState } from 'react';

const aboutContent = {
  'software-development': 'Divisi yang menggali dunia pemrograman dengan berfokus pada bahasa pemrograman, teknologi, dan konsep Pemrograman Berorientasi Objek (OOP). Kami menyelenggarakan berbagai proyek pengembangan perangkat lunak dan kompetisi pemrograman, serta berbagi sumber daya belajar dan tutorial bagi anggota kami. Divisi ini menjadi tempat yang ideal bagi individu yang ingin memperluas pengetahuan mereka dalam pengembangan perangkat lunak, baik untuk pemula maupun mereka yang telah memiliki pengalaman sebelumnya dalam dunia pemrograman.',
  'explore': 'Divisi yang memperkenalkan dunia dari Internet of Things (IoT) dan teknologi fisik. Kami mengeksplorasi konsep dasar IoT dan memberikan kesempatan bagi Anda untuk terlibat dalam praktik perakitan perangkat keras, eksperimen IoT, serta pengenalan komponen-komponen komputer. Di sini, kami mengundang Anda untuk menjelajahi kreativitas Anda dalam menciptakan solusi yang inovatif, yang dapat menghubungkan dunia fisik dengan dunia digital. Bergabunglah dengan kami dan temukan bagaimana teknologi dapat mengubah cara kita berinteraksi dengan lingkungan sekitar.',
  'cyber-security': 'Divisi yang mempelajari dasar-dasar ethical hacking dan penetration testing. Para member akan diajari teknik-teknik peretasan yang umum digunakan serta syarat-syarat peretasan yang dianggap sah atau legal. Selain itu, para member di-support untuk aktif mengikuti kompetisi seperti Capture The Flag (CTF) dan lain-lain. Komunitas yang sehat dan terus belajar diharapkan terbentuk dari divisi ini.'
};

const logo = {
  'software-development': '/division/softdev.png',
  'explore': '/division/explore.png',
  'cyber-security': '/division/cyber.png'
};

export default function DivisionAbout({ activeDivision }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    setContent(aboutContent[activeDivision] || 'Divisi tidak ditemukan');
    setImage(logo[activeDivision] || '/path/to/default-logo.jpg');
  }, [activeDivision]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-start">
      <div className="mb-0">
        <h2 className="text-xl font-bold mb-1">About</h2>
        <p className="text-justify">{content}</p>
      </div>
      <div className="flex justify-center mb-0">
        <img src={image} alt={`${activeDivision} logo`} className="h-72 w-72 object-contain"/>
      </div>
    </div>
  );
}