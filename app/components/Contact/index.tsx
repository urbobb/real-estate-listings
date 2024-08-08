"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [stateMessage, setStateMessage] = useState("");

  const inputStyles = `w-full mb-10 min-h-max outline-0 text-[1.5em] border-b-2 
  border-stone-400 focus:border-stone-200 
  transition duration-300 bg-transparent`;

  const sendEmail = (e: any) => {
    e.persist();
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        e.target,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID as string
      )
      .then(
        (result) => {
          setStateMessage("Message sent!");
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage("");
          }, 5000); // hide message after 5 seconds
        },
        (error) => {
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage("");
          }, 5000); // hide message after 5 seconds
        }
      );

    //Clears the form after sending the email
    e.target.reset();
  };

  return (
    <section
      id="contact"
      className="flex justify-center items-center w-full h-[calc(100vh-180px)] md:pt-24 pt-16 pb-14 bg-gray-20 ">
      <div className="mx-auto w-9/12 md:w-11/12 md:h-full">
        {/* HEADER */}
        <div className="md:w-3/5 text-white-50 mb-12">
          <h1 className="text-2xl font-bold">
            <span>Contact me</span>
          </h1>
        </div>

        {/* Contact us FORM */}
        <div className="justify-between md:flex">
          <form target="_blank" onSubmit={sendEmail} method="POST">
            <input
              name="name"
              id="name"
              type="text"
              className={inputStyles}
              required
              maxLength={100}
              placeholder="NAME"
            />

            <input
              name="email"
              id="email"
              className={inputStyles}
              type="email"
              required
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
              placeholder="EMAIL"
            />

            <input
              name="subject"
              id="subject"
              type="text"
              className={inputStyles}
              required
              maxLength={100}
              placeholder="SUBJECT"
            />

            <textarea
              name="message"
              id="message"
              className={inputStyles}
              required
              rows={3}
              cols={50}
              maxLength={200}
              placeholder="MESSAGE"
            />

            <button
              type="submit"
              className="-mt-5 rounded-lg px-8 py-3 transition duration-500 text-white bg-black hover:scale-90">
              Send now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
