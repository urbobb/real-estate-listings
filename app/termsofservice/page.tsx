import React from "react";

type Props = {};

function TermsOfService({}: Props) {
  return (
    <div className="w-5/6 mx-auto mt-28">
      <h1 className="font-bold text-xl mb-8">Terms of Service</h1>
      <h3 className="mb-5">
        Welcome to our website! By accessing and using this website, you confirm
        that you have read, understood, and agreed to the following Terms of
        Service (`TOS`). If you do not agree with any part of these terms,
        please do not use our website.
      </h3>
      <p className="mb-2">1. Use of the Website</p>
      <p className="mb-2">
        1.1 You agree to use this website in accordance with all applicable laws
        and regulations.
      </p>
      <p className="mb-2">
        1.2 You confirm that you are solely responsible for any content or
        information you submit on this website.
      </p>
      <p className="mb-2">
        1.3 You understand and acknowledge that this website may contain
        user-generated content that is not safe for work (NSFW), including
        explicit or adult material.
      </p>

      <p className="mb-2">2. Intellectual Property</p>
      <p className="mb-2">
        2.1 All content on this website, including but not limited to text,
        graphics, logos, and images, is the property of the website owner and
        protected by intellectual property laws.
      </p>
      <p className="mb-2">
        2.2 You agree not to reproduce, modify, distribute, or display any
        content from this website without prior written consent.
      </p>
      <p className="mb-2">3. Privacy</p>
      <p className="mb-2">
        3.1 Your privacy is important to us. By using this website, you
        acknowledge and agree to our Privacy Policy.
      </p>

      <p className="mb-2">4. Disclaimer</p>
      <p className="mb-2">
        4.1 This website provides information for general purposes only. We make
        no warranties or representations about the accuracy or completeness of
        the content.
      </p>
      <p className="mb-2">
        4.2 You acknowledge and agree that accessing NSFW content on this
        website is solely at your own discretion and risk.
      </p>
      <p className="mb-2">5. Limitation of Liability</p>
      <p className="mb-2">
        5.1 In no event shall we be liable for any direct, indirect, incidental,
        consequential, or punitive damages arising out of your use of this
        website.
      </p>
      <p className="mb-2">6. Governing Law</p>
      <p className="mb-8">
        6.1 These Terms of Service shall be governed by and construed in
        accordance with the laws of [your jurisdiction].
      </p>
      <p className="mb-8">
        By clicking the `I confirm and agree`` button or by accessing and using
        this website, you acknowledge that you have read and understood these
        Terms of Service, including the NSFW content disclaimer, and agree to be
        bound by them.
      </p>
      <p className="mb-2">
        If you have any questions or concerns regarding these terms, please
        contact us at [contact email].
      </p>
    </div>
  );
}

export default TermsOfService;
