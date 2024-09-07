"use client";
import React, { ChangeEvent } from "react";

type Props = {
  title: string;
  name: string;
  content: string | number | undefined;
  icon: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ListingDetailItem = ({ title, name, content, icon, onChange }: Props) => {
  const detailsStyle = `flex flex-col`;
  const detailsContentStyle = `text-sm ml-7`;

  return (
    <div className={`${detailsStyle}`}>
      <h2 className="font-semibold md:text-base text-[0.9rem]">
        <i className={`${icon}`}></i>
        {title}
      </h2>
      <input
        type="text"
        name={name}
        className={`${detailsContentStyle}`}
        value={content === null ? "-" : content}
        onChange={onChange}
      />
    </div>
  );
};

export default ListingDetailItem;
