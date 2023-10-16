"use client";

import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";

type ModalProps = {
  className?: string;
  link: string;
  closeModal: () => void;
};

const Modal: React.FC<ModalProps> = ({ className, link, closeModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setIsVisible(true);
    // After 3 seconds, hide the text
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  return (
    <div
      className={clsx(
        className,
        "fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 "
      )}
    >
      {/* Color Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      {/* LAYOUT */}
      <div className="absolute p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
        {/* MODAL */}
        <div className="border border-slate-500 p-5 w-full max-w-md bg-slate-900 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white">
              <svg
                className="h-6 w-6 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg leading-6 font-medium text-white mt-4">
              Generated Url:
            </h3>
            <div
              className="cursor-copy mt-2  text-sm text-white break-all mb-4 line-clamp-3"
              onClick={handleCopy}
            >
              <mark>{link}</mark>
            </div>
            {isVisible ? (
              <span className="text-green-500 text-sm">
                Copied to Clipboard.
              </span>
            ) : (
              <span
                className="text-white cursor-copy text-sm flex gap-2 justify-center items-center"
                onClick={handleCopy}
              >
                Copy Link
                <img
                  src="/images/copy-white.png"
                  alt="copy button"
                  className="w-4 h-4"
                />
              </span>
            )}
            <div className="flex flex-row gap-4 px-4 py-3 mt-5">
              <button
                className="px-4 py-2 bg-teal-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
                onClick={closeModal}
              >
                Close
              </button>
              <Link
                href={link}
                target="_blank"
                className="cursor-new-tab px-4 py-2 bg-teal-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
              >
                Visit
              </Link>
            </div>
          </div>
        </div>
        {/* END MODAL */}
      </div>
      {/* END LAYOUT */}
    </div>
  );
};

export default Modal;
