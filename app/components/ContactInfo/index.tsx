"use client";

const ContactInfo = () => {
  const inputStyles = `outline-0 text-[1.2em] border p-2 rounded-lg border-stone-400 focus:border-stone-200
  transition duration-300 bg-transparent`;
  const btnStyle = `p-3 rounded-lg bg-[#207dff] hover:bg-[#126ff1] font-bold text-white`;

  return (
    <form className="flex flex-col gap-5 p-5 pb-5" action="">
      <h1 className="font-bold text-2xl">Request Info</h1>
      <input type="text" placeholder="Name" className={`${inputStyles}`} />
      <input type="text" placeholder="Phone" className={`${inputStyles}`} />
      <input type="text" placeholder="Message" className={`${inputStyles}`} />
      <button className={`${btnStyle}`}>Request Info</button>
    </form>
  );
};

export default ContactInfo;
