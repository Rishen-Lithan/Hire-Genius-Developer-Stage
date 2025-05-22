import { NavLink } from "react-router-dom";

import { logo } from "../assets/images";

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink to='/' 
        className={({ isActive }) => isActive ? 
          "text-blue-600 font-extrabold bg-blue-100 p-2 rounded-md" : 
          "text-black font-extrabold bg-blue-100 p-2 rounded-md"}
      >
        HGA
      </NavLink>
      <nav className='flex text-lg font-medium gap-7'>
        <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-600" : "text-black" }>
          Instructions
        </NavLink>
        <NavLink to='/info' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          Info
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
