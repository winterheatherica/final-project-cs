export default function EventItem({ image, title, date, body, reverse }) {
  return (
    <div className={`flex flex-col md:flex-row mb-8 px-10 ${reverse ? 'md:flex-row-reverse' : ''}`}>
      <div 
        className="md:w-1/2 bg-blue-900 h-96 mb-4 md:mb-0 rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className={`md:w-1/2 ${reverse ? 'md:mr-8' : 'md:pl-8'} ${reverse ? 'md:text-right' : 'md:text-left'} text-left`}>
        <h2 className={`text-2xl md:text-3xl font-bold ${reverse ? 'md:text-right' : 'text-left'}`}>
          {title}
        </h2>
        <p className={`text-sm text-gray-600 mt-2 ${reverse ? 'md:text-right' : 'text-left'}`}>
          {date}
        </p>
        <p className="mt-4 text-left text-justify">
          {body}
        </p>
      </div>
    </div>
  );
}
