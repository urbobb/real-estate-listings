import React from "react";

type Props = {
  title: string;
  content: string | number | undefined;
  icon: string;
};

const ListingDetailItem = ({ title, content, icon }: Props) => {
  const detailsStyle = `flex flex-col`;
  const detailsContentStyle = `text-sm ml-7`;

  return (
    <div className={`${detailsStyle}`}>
      <h2 className="font-semibold md:text-base text-[0.9rem]">
        <i className={`${icon}`}></i>
        {title}
      </h2>
      <p className={`${detailsContentStyle}`}>
        {content === null ? "-" : content}
      </p>
    </div>
  );
};

export default ListingDetailItem;
