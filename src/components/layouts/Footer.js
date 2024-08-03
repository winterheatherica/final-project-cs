// src/components/Footer.js
export default function Footer() {
    return (
      <footer className="bg-[#071135] text-white py-8 text-center">
        <div className="container mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="row-span-1">A</div>
              <div className="row-span-1">B</div>
            </div>
            {/* Center Column */}
            <div className="space-y-4">
              <div className="row-span-1">C</div>
              <div className="row-span-1">D</div>
            </div>
            {/* Right Column */}
            <div className="row-span-1">E</div>
          </div>
  
          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            <div>Aasdads</div>
            <div>B</div>
            <div>C</div>
            <div className="grid grid-cols-2 gap-4">
              <div>D</div>
              <div>E</div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  