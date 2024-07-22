import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer id="footer" className="w-full py-8">
      <div className="mx-auto md:w-5/6 w-9/12 flex justify-between z-40">
        <div className="">
          <p className="md:text-lg">© Designed by Bob</p>
        </div>
        <div className="w-20 flex justify-between hover:cursor-pointer">
          <a href="https://www.linkedin.com/" target="_blank">
            <i className="fa-brands fa-linkedin md:fa-2x fa-xl"></i>
          </a>
          <a
            href="https://github.com/Bangerr/real-estate-listings"
            target="_blank">
            <i className="fa-brands fa-github md:fa-2x fa-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
