import EventItem from './EventItem';

export default function EventInternal() {
  const eventData = [
    {
      image: 'image1.jpg', //contoh image1.jpg ada di folder public
      title: 'Judul 1',
      date: '01-01-2024',
      body: 'Menjadi wadah pengembangan minat dan bakat mahasiswa di bidang teknologi yang berfokus pada keamanan jaringan, pengembangan perangkat lunak, dan Internet of Things (IoT) yang menginspirasi inovasi dan menghasilkan pemimpin masa depan dalam dunia teknologi.',
      reverse: false
    },
    {
      image: 'image2.jpg',
      title: 'Judul 2',
      date: '01-01-2024',
      body: 'Menjadi wadah pengembangan minat dan bakat mahasiswa di bidang teknologi yang berfokus pada keamanan jaringan, pengembangan perangkat lunak, dan Internet of Things (IoT) yang menginspirasi inovasi dan menghasilkan pemimpin masa depan dalam dunia teknologi.',
      reverse: true
    },
  ];

  return (
    <div className="space-y-20">
      {eventData.map((event, index) => (
        <EventItem
          key={index}
          image={event.image}
          title={event.title}
          date={event.date}
          body={event.body}
          reverse={event.reverse}
        />
      ))}
    </div>
  );
}
