import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setIsVisible(true);
    } else if (scrolled <= 300) {
      setIsVisible(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${
        isVisible ? "block" : "hidden"
      } fixed bottom-8 right-8 z-10 cursor-pointer`}
      onClick={scrollToTop}
    >
      <FaArrowUp className="text-primary w-10 h-10 bg-white rounded-full p-2" />
    </div>
  );
};

export default ScrollToTopButton;
