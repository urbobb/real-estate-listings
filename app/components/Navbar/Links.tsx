import React from "react";

type Props = {
  name: string;
  enable: boolean;
};

const Links = ({ name, enable }: Props) => {
  const lowerCasePage = name.toLowerCase().replace(/ /g, "");
  const enableLink = enable
    ? "pointer-events-auto"
    : "pointer-events-none opacity-50";

  return (
    <a
      href={`/${lowerCasePage}`}
      className={`${enableLink}  hover:border-slate-50 rounded-md p-1.5 md:w-full min-w-max
          tracking-widest transition duration-500 font-extrabold text-black text-[1rem] hover:text-white
          hover:bg-black flex justify-center items-center`}>
      {name}
    </a>
  );
};

export default Links;
