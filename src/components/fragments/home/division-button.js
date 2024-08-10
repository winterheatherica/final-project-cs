import { Carousel, IconButton } from "@material-tailwind/react";

export default function DivisionButton() {
    return (
      <div className="h-screen p-8">

                {/* JUDUL */}
        <h1 className="text-[#071135] font-bold text-3xl text-center mb-5">DIVISION</h1>

        <div className="hidden md:flex justify-evenly items-center h-3/5">
          {/* image */}
          <div className="bg-[#071135] h-full w-1/4 flex flex-col items-center justify-center rounded-xl">
            <img src="/division/softdev.png"alt="image 1" className="object-cover h-3/6"/>
            <h1 className="text-2xl font-bold text-center mt-5 flex px-8">SOFTWARE DEVELOPMENT</h1>
          </div>
          <div className="bg-[#071135] h-full w-1/4 flex flex-col items-center justify-center rounded-xl">
            <img src="/division/cyber.png"alt="image 1" className="object-cover h-4/6"/>
            <h1 className="text-2xl font-bold text-center px-8">CYBER SECURITY</h1>
          </div>
          <div className="bg-[#071135] h-full w-1/4 flex flex-col items-center justify-center rounded-xl">
            <img src="/division/explore.png"alt="image 1" className="object-cover h-4/6"/>
            <h1 className="text-2xl font-bold text-center px-8">EXPLORE</h1>
          </div>
        </div>

        <div className="h-3/5 md:hidden">

          {/* carousel */}
          <Carousel
          className="rounded-xl"
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handlePrev}
              className="!absolute top-2/4 left-4 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handleNext}
              className="!absolute top-2/4 !right-4 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </IconButton>
          )}
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-10 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          >

            {/* image */}
            <div className="bg-[#071135] h-full flex flex-col items-center justify-center">
              <img src="/division/softdev.png" alt="softdev" className="object-cover h-2/5"/>
              <h1 className="text-2xl font-bold text-center mt-5 flex p-4">SOFTWARE DEVELOPMENT</h1>
            </div>
            <div className="bg-[#071135] h-full flex flex-col items-center justify-center">
              <img src="/division/cyber.png" alt="cyber security" className="object-cover h-3/6"/>
              <h1 className="text-2xl font-bold text-center p-4">CYBER SECURITY</h1>
            </div>
            <div className="bg-[#071135] h-full flex flex-col items-center justify-center">
              <img src="/division/explore.png" alt="explore" className="object-cover h-3/6"/>
              <h1 className="text-2xl font-bold text-center p-4">EXPLORE</h1>
            </div>
            
          
          </Carousel>

        </div>

        

      </div>

    );
  }
  