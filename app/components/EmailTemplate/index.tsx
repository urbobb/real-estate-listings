import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  phone: string;
  message: string;
  id: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  phone,
  message,
  id,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>Phone number: {phone}</p>
    <p>Message: {message}</p>
    <p>ID: {id}</p>
  </div>
);
