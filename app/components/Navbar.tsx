import useMediaQuery from "../hooks/userMediaQuery";

type Props = {
  isTopOfPage?: boolean;
};

const Navbar = ({ isTopOfPage }: Props) => {
  const navbarBackground = !isTopOfPage ? "" : "bg-slate-800";
  const flexBetween = `flex justify-between items-center`;

  const styleLinks = `flex items-center justify-center hover:border-2 border-slate-700 
  rounded-lg px-5 mx-auto h-10 hover:bg-black hover:text-white hover:underline`;
  const logoHover = `duration-400 hover:cursor-crosshair hover:bg-[#5ADDEF] hover:text-white 
  hover:border-1 border-black rounded-lg`;

  return (
    <nav>
      <div
        className={`${navbarBackground} ${flexBetween} navbar text-slate-500 my-5 w-5/6 h-10 mx-auto`}>
        <div
          className={`${flexBetween} ${logoHover} logo h-10 px-5 text-lg font-extrabold tracking-widest`}>
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
      </div>
    </nav>
  );
};

export default Navbar;
