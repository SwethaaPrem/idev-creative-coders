import React, { useEffect } from "react";
import { ContactSection } from "../sections/ContactSection";

export const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = "Contact Us | IDEV Creative Coders";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full pt-16 sm:pt-24">
      <ContactSection />
    </div>
  );
};
