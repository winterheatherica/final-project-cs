export default function RecentEvent() {
  return (
    <div className="p-4 md:px-32 text-[#071135] h-screen">
      <h1 className="text-3xl font-bold text-center">Recent Event</h1>

      <article className="h-full mt-5 md:mt-12  flex flex-col md:items-center gap-24">

        {/* card */}
        <div className="h-1/3 md:w-full md:flex flex-row-reverse items-center justify-evenly">
          <div>
            <h1 className="font-extrabold text-2xl">Judul</h1>
            <p>01-01-2024</p>
          </div>
          <div className="md:w-1/3 bg-[#071135] h-full rounded-md">

          </div>

        </div>

        <div className="h-1/3 md:w-full md:flex items-center justify-evenly">
          <div>
            <h1 className="font-extrabold text-2xl text-right">Judul</h1>
            <p className="text-right">01-01-2024</p>
          </div>
          <div className="md:w-1/3 bg-[#071135] h-full rounded-md">

          </div>

        </div>
      </article>
    </div>
  );
}
