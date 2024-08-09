import EventItem from './EventItem';

export default function EventExternal() {
  const eventData = [
    {
      image: 'image3.jpg',
      title: 'Judul 3',
      date: '02-02-2024',
      body: 'Menjadi wadah pengembangan minat dan bakat mahasiswa di bidang teknologi...',
      reverse: false
    },
    {
      image: 'image4.jpg',
      title: 'Judul 4',
      date: '02-02-2024',
      body: 'Menjadi wadah pengembangan minat dan bakat mahasiswa di bidang teknologi...',
      reverse: true
    }
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
