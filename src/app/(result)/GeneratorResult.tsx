import React from "react";

type GeneratorProps = {
  formData: {
    title?: string;
    siteName?: string;
    description?: string;
    logo?: string;
    borderWidth?: string;
    borderRadius?: string;
    borderColor?: string;
    bgType?: string;
    bgColor?: string;
    bgImageUrl?: string;
  };
};

const GeneratorResult: React.FC<GeneratorProps> = ({ formData }) => {
  return (
    <div
      className="w-full h-auto aspect-video flex flex-col justify-center items-center p-6"
      style={{
        background:
          formData.bgType === "color"
            ? `${formData.bgColor} url() center center/cover no-repeat`
            : formData.bgType === "image"
            ? `#000000 url(${formData.bgImageUrl}) center center/cover no-repeat`
            : `#000000 url(/images/bg-purple.jpg) center center/cover no-repeat`,
      }}
    >
      <img
        src={formData.logo ? formData.logo : "/images/awandri.png"}
        alt={formData.logo ? formData.logo : "default-logo"}
        className="w-10 h-10 object-cover"
        style={{
          borderWidth: `${formData.borderWidth}px`,
          borderRadius: `${formData.borderRadius}`,
          borderColor: formData.borderColor,
        }}
      />
      <div className="text-black font-black bg-[#3DF9FA] text-[10px] border border-black px-1 mt-2 mb-1 text-center">
        {formData.siteName ? formData.siteName : "sitename.com"}
      </div>
      <div className="text-2xl font-black text-center leading-5 my-2">
        {formData.title ? formData.title : "Default Title"}
      </div>
      {formData.description && (
        <p className="text-xs font-light text-center">{formData.description}</p>
      )}
    </div>
  );
};

export default GeneratorResult;
