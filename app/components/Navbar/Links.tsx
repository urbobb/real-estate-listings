import React from "react";

type Props = {
  name: string;
};

const Links = ({ name }: Props) => {
  const lowerCasePage = name.toLowerCase().replace(/ /g, "");

  return (
    <a
      href={`#${lowerCasePage}`}
      className="border-2 hover:border-slate-50 rounded-md p-1.5 
          tracking-widest text-primary-100 transition duration-500 
          hover:text-gray-20 hover:bg-blue-50 flex justify-center items-center">
      {name}
    </a>
  );
};

export default Links;
