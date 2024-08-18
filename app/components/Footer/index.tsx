import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer id="footer" className="bg-[#ffffff] w-full py-8 mb-10 text-sm">
      <div
        className="mx-auto md:w-5/6 w-9/12 flex md:flex-row flex-col justify-between 
        gap-8  z-40 border-t pt-5">
        <div className="md:w-full w-5/6 mx-auto text-center ">
          <p className="">© 2024 Home Finder. Designed by Sukh.</p>
        </div>
        <div className="flex justify-between gap-8 hover:cursor-pointer">
          <a href="/privacypolicy" target="_blank">
            <p>Privacy Policy</p>
          </a>
          <a href="/termsofservice" target="_blank">
            <p>Terms of Service</p>
          </a>
          <a href="/cookiessettings">
            <p>Cookies Settings</p>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
