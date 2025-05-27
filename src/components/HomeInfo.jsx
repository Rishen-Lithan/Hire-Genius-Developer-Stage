import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <h1 className='px-8 py-4 mx-5 text-center text-white sm:text-xl sm:leading-snug neo-brutalism-blue'>
        Hellooo 👋
        <br />
        Welcome to the Web Dev Stage
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='mb-2 font-medium text-center sm:text-xl'>
          Fun meets HTTP codes. <br /> Status Quest
        </p>

        <Link to='/codes' className='neo-brutalism-white neo-btn'>
          Let's Start
          <img src={arrow} alt='arrow' className='object-contain w-4 h-4' />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          REST isn't idle. It's in action. <br /> REST in Action
        </p>

        <Link to='/methods' className='neo-brutalism-white neo-btn'>
          Challenge 02
          <img src={arrow} alt='arrow' className='object-contain w-4 h-4' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
      <p className='font-medium text-center sm:text-xl'>
        Only the sharpest devs find the key. <br/> DevPilot : The Hidden Key
      </p>

      <Link to='/keys' className='neo-brutalism-white neo-btn'>
        Let's Start
        <img src={arrow} alt='arrow' className='object-contain w-4 h-4' />
      </Link>
    </div>
    );
  }

  return null;
};

export default HomeInfo;
