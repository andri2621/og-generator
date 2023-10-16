import React from "react";

type BlogProps = {
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
    author?: string;
    avatar?: string;
    userName?: string;
  };
};

const BlogResult: React.FC<BlogProps> = ({ formData }) => {
  return (
    <div
      className="w-full h-auto aspect-video flex flex-col justify-center items-start p-8"
      style={{
        background:
          formData.bgType === "color"
            ? `${formData.bgColor} url() center center/cover no-repeat`
            : formData.bgType === "image"
            ? `#000000 url(${formData.bgImageUrl}) center center/cover no-repeat`
            : `#000000 url(/images/bg-purple.jpg) center center/cover no-repeat`,
      }}
    >
      <div className="text-black font-black bg-[#3DF9FA] text-[10px] border border-black px-1 text-center">
        {formData.siteName ? formData.siteName : "sitename.com"}
      </div>

      <div className="text-2xl font-black max-w-md leading-5 my-2">
        {formData.title ? formData.title : "Default Title"}
      </div>

      <div className="flex gap-2">
        <img
          src={formData.avatar ? formData.avatar : "/images/avatar.png"}
          alt={formData.avatar ? formData.avatar : "default-avatar"}
          className="w-8 h-8 object-cover rounded-full"
        />
        <div className="flex flex-col justify-center">
          <div className="text-[0.8rem] font-bold text-white  leading-none">
            {formData.title ? formData.author : "Andri Setiawan"}
          </div>
          <div className="text-[0.6rem] font-medium leading-none">
            {formData.title ? formData.userName : "Frontend Developer"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogResult;
