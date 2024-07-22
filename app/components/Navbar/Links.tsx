import React from "react";

type Props = {
  name: string;
};

const Links = ({ name }: Props) => {
  const lowerCasePage = name.toLowerCase().replace(/ /g, "");

  return (
    <a
      href={`#${lowerCasePage}`}
      className="border-2 hover:border-slate-50 rounded-md p-1.5 md:w-full min-w-max
          tracking-widest transition duration-500 font-extrabold hover:text-black
          hover:bg-white flex justify-center items-center">
      {name}
    </a>
  );
};

export default Links;
