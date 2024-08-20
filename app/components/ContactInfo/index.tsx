"use client";

const ContactInfo = () => {
  const inputStyles = `outline-0 text-[1.2em] border p-2 rounded-lg border-stone-400 focus:border-stone-200
  transition duration-300 bg-transparent`;
  const btnStyle = `p-3 rounded-lg bg-[#207dff] hover:bg-[#126ff1] font-bold text-white`;

  return (
    <form className="flex flex-col gap-5 p-5 pb-5" action="">
      <h1 className="font-bold text-2xl">Request Info</h1>
      <input
        type="text"
        required
        placeholder="Name"
        className={`${inputStyles}`}
      />
      <input
        type="text"
        required
        placeholder="Phone"
        className={`${inputStyles}`}
      />
      <textarea
        name="message"
        id="message"
        className={inputStyles}
        required
        rows={3}
        maxLength={200}
        placeholder="MESSAGE"
      />
      <button className={`${btnStyle}`}>Request Info</button>
    </form>
  );
};

export default ContactInfo;
