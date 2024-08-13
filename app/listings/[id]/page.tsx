import React from "react";

export default async function List({ params }: { params: { id: string } }) {
  //const res = await fetch(`/listings/${params.id}`);

  return (
    <div className="md:mt-10 md:p-24 pt-24 my-auto">
      <div
        className="md:h-full w-full mx-auto md:py-10 pt-5 pb-10 items-center 
        justify-center ">
        Hello
        <p>ID: {params.id}</p>
      </div>
    </div>
  );
}
