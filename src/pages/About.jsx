import "react-vertical-timeline-component/style.min.css";

const About = () => {
  return (
    <section className='px-6 py-16 max-container'>
      <h2 className='mb-16 text-4xl font-extrabold text-center text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'>
        🚀 Instruction Guide: DevPilot Challenge
      </h2>

      <div className='space-y-12'>
        <div className='p-8 bg-white border border-gray-200 shadow-lg rounded-2xl'>
          <h3 className='mb-4 text-2xl font-bold text-indigo-600'>
            Instruction 01: The Hidden Key Awaits!
          </h3>
          <p className='text-lg text-gray-700'>
            In this stage, a hidden key is waiting for you to discover. Find the key and enter it to proceed to the next level. If you can't find it, no worries—you can skip the challenge. However, skipping will mean no marks for you!
          </p>
        </div>

        <div className='p-8 bg-white border border-gray-200 shadow-lg rounded-2xl'>
          <h3 className='mb-4 text-2xl font-bold text-indigo-600'>
            Instruction 02: Your Dev Toolkit
          </h3>
          <p className='text-lg text-gray-700'>
            As a skilled web developer, you know that every tool in your toolkit has a purpose. One of the most valuable tools when developing a web application is right under your nose. It's an essential tool that helps you look deeper into the structure of any webpage—making <strong>debugging</strong> a breeze!
          </p>
        </div>

        <div className='p-8 bg-white border border-gray-200 shadow-lg rounded-2xl'>
          <h3 className='mb-4 text-2xl font-bold text-indigo-600'>
            Instruction 03: Four Simple Clicks
          </h3>
          <p className='text-lg text-gray-700'>
            Ready to unlock the key? It’s easier than you think! With just four clicks, you’ll be able to uncover the secret hidden key. 
          </p>
        </div>

        <div className='p-8 bg-white border border-gray-200 shadow-lg rounded-2xl'>
          <h3 className='mb-4 text-2xl font-bold text-indigo-600'>
            Hint Keywords
          </h3>
          <p className='text-lg text-gray-700'>
            <strong>Debug / Storage / Window</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
