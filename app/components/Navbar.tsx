const Navbar = () => {
  const styleLinks = `flex items-center justify-center hover:border-2 border-slate-700 
  rounded-lg px-5 mx-auto h-10 hover:bg-black hover:text-white hover:underline`;
  const logoHover = `duration-400 hover:cursor-crosshair 
          hover:bg-[#5ADDEF] hover:text-white hover:border-1 border-black rounded-lg`;

  return (
    <nav className="navbar flex justify-between text-slate-500 my-5 mx-10">
      <div
        className={`${logoHover} logo flex items-center justify-center px-5 text-lg
                  `}>
        <a href="/">Real Estate</a>
      </div>

      <ul className="nav-links flex space-x-1">
        <li className={`${styleLinks}`}>
          <a className=" " href="/listings">
            Listings
          </a>
        </li>
        <li className={`${styleLinks}`}>
          <a href="/about">About</a>
        </li>
        <li className={`${styleLinks}`}>
          <a href="/contact">Contact</a>
        </li>
        <li
          className={`${styleLinks} border-2 border-slate-300 
                    rounded-lg`}>
          <a href="/profile">Profile</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
