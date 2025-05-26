import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import sakura from "../assets/sakura.mp3";
import { HomeInfo, Loader } from "../components";
import { soundoff, soundon } from "../assets/icons";
import { Bird, Island, Plane, Sky } from "../models";

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const hasSeenInstructions = sessionStorage.getItem("hasSeenInstructions");
    if (!hasSeenInstructions) {
      setShowInstructions(true);
    }
  }, []);

  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get('email');

    if (email) {
      window.localStorage.setItem('email', email)
    } else {
      console.warn('No email found in URL');
    }
  }, []);

  const handleCloseInstructions = () => {
    setShowInstructions(false);
    sessionStorage.setItem("hasSeenInstructions", "true");
  };

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  useEffect(() => {
    const KEY_NAME = 'sessionKey';

    const generateKey = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    const existingKey = localStorage.getItem(KEY_NAME);
    if (!existingKey) {
      const newKey = generateKey();
      localStorage.setItem(KEY_NAME, newKey);
    } else {
      console.log('Using existing key:');
    }

    window.addEventListener('beforeunload', () => {
      localStorage.removeItem(KEY_NAME);
    });

    return () => {
      window.removeEventListener('beforeunload', () => {
        localStorage.removeItem(KEY_NAME);
      });
    };
  }, []);

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
  <>
    {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sky-900 bg-opacity-70 backdrop-blur-md">
          <div className="bg-gradient-to-br from-sky-100 to-blue-200 border-4 border-blue-400 rounded-3xl shadow-[0_0_30px_rgba(135,206,250,0.8)] p-8 max-w-md w-full relative animate-fade-in">
            <h2 className="text-3xl text-center font-bold text-sky-800 mb-4 tracking-wide font-[Creepster,cursive] drop-shadow-md">
              ✈️ Sky Adventure Briefing
            </h2>
            <p className="mb-6 font-medium text-center text-sky-900">
              You're about to fly through the village in your plane!
            </p>
            <ul className="pl-5 space-y-3 font-semibold text-blue-900 list-decimal text-md">
              <li>
                Use <span className="font-bold text-blue-600">←</span> and <span className="font-bold text-blue-600">→</span> arrow keys to steer.
              </li>
              <li>
                Each zone holds <span className="font-bold text-indigo-700">3 challenge steps</span>.
              </li>
              <li>
                Check the <span className="font-bold text-purple-700">Info tab</span> for helpful clues.
              </li>
            </ul>
            <button
              onClick={handleCloseInstructions}
              className="w-full px-6 py-2 mt-6 font-bold text-white transition duration-300 rounded-full shadow-md bg-gradient-to-r from-sky-400 to-blue-500 hover:from-blue-500 hover:to-sky-600 hover:shadow-lg"
            >
              🌟 Begin Your Journey
            </button>
            <button
              onClick={handleCloseInstructions}
              className="absolute text-2xl text-blue-800 top-3 right-4 hover:text-red-500"
              aria-label="Close Instructions"
            >
              &times;
            </button>
          </div>
        </div>
      )}

    <section className='relative w-full h-screen'>
      <div className='absolute left-0 right-0 z-10 flex items-center justify-center top-28'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor='#b1e1ff'
            groundColor='#000000'
            intensity={1}
          />

          {/* <Bird /> */}
          <Sky isRotating={isRotating} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />
          <Plane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
          />
        </Suspense>
      </Canvas>

      <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='object-contain w-10 h-10 cursor-pointer'
        />
      </div>
    </section>
    </>
  );
};

export default Home;
