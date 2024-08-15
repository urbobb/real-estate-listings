import React from "react";

type Props = {};

const CookiesTemplate = (props: Props) => {
  return (
    <div id="simple-cookie-consent">
      <div className="cookie-consent-container">
        <div className="cookie-consent-notice">
          <h4>Your Cookie Preferences</h4>
          <hr />
          <p>
            This website uses cookies to give our users the best experience. You
            can manage your settings below or find out by reading our{" "}
            <a href="#">Cookie Policy</a>.
          </p>
        </div>
        <div className="cookie-consent-selection">
          <button value="false" className="cookie-consent-deny">
            Use Necessary Only
          </button>
          <button value="true" className="cookie-consent-allow">
            Allow All Cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiesTemplate;
