import React from 'react';
import pattern from "../../assets/i1.png";

const Hero = () => {
  const handleScroll = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Reusable button styles
  const buttonClass =
    "inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-blue-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden pt-12">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 z-0"
        style={{ backgroundImage: `url(${pattern})` }}
        aria-hidden="true"
      ></div>

      {/* Hero Main Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center mt-10 space-y-8">
        
        {/* Feature Tag */}
        <p className="text-sm text-blue-800 bg-blue-200 px-4 py-1 rounded-full font-semibold shadow-sm tracking-wide">
          🚀 New Feature Launched!
        </p>

        {/* Brand Name Animation */}
        <div className="flex justify-center gap-2 flex-wrap">
          {["T", "A", "S", "K", "D", "E", "S", "K"].map((char, index) => (
            <div
              key={index}
              className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 text-blue-100 font-bold text-2xl rounded-lg 
              shadow-lg transform transition-all duration-300 hover:scale-110 hover:from-blue-300 hover:to-blue-500 hover:text-white"
              style={{ animation: `fadeIn 0.3s ease ${index * 0.1}s forwards` }}
            >
              {char}
            </div>
          ))}
        </div>

        {/* Main Content Section */}
        <section className="mt-8 w-full max-w-6xl mx-auto overflow-hidden rounded-xl sm:grid sm:grid-cols-2 sm:items-center bg-white shadow-lg backdrop-blur">
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="text-center sm:text-left">
              <h2 className="text-4xl font-bold text-gray-900 md:text-5xl font-serif">
                Focus. Plan. Complete.
              </h2>
              <p className="hidden md:block text-gray-600 mt-4 text-lg leading-relaxed">
                Task Desk helps you stay focused by managing tasks, setting priorities, and organizing everything in one place — boosting productivity effortlessly.
              </p>
              <div className="mt-6">
                <button onClick={handleScroll} className={buttonClass}>
                  Get Started
                </button>
              </div>
            </div>
          </div>

          <img
            src="https://i.pinimg.com/originals/6c/90/44/6c9044d8711e567bf703afc6627af59e.jpg"
            alt="Task management illustration"
            className="h-full w-full object-cover sm:rounded-ss-[40px]"
          />
        </section>

        {/* About Maker Section */}
        <section className="mt-10 bg-blue-50 py-16 px-6 w-full max-w-3xl border-2 border-blue-300 border-dashed rounded-2xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            About the Maker
          </h2>
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            Hi, I’m Shravan — passionate about building intuitive web applications and embedded systems projects. Always exploring the blend of software and hardware to create impactful solutions.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://github.com/Shravancoder01"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass}
              aria-label="GitHub Profile"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/shravan-chafekar"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass}
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
            <a
              href="mailto:shravanchafekar8a9@gmail.com"
              className={buttonClass}
              aria-label="Send Email"
            >
              Gmail
            </a>
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            ✨ Tip: You can enhance this section with icons from <strong>react-icons</strong> or Flowbite components.
          </p>
        </section>
      </section>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Hero;
