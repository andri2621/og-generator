"use client";

import Input from "@/components/forms/Input";
import SelectInput from "@/components/forms/SelectInput";
import { deploymentURL } from "@/constant/env";
import clsx from "clsx";
import Image from "next/image";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const queryKeys = [
  "title",
  "siteName",
  "description",
  "logo",
  "bgType",
  "bgColor",
  "bgImage",
  "ogType",
];

type Query = Record<(typeof queryKeys)[number], string>;

export default function Home() {
  const [link, setLink] = useState(`${deploymentURL}/api/general`);
  const [imgLink, setImgLink] = useState(`${deploymentURL}/api/general`);

  const methods = useForm<Query>({
    mode: "onTouched",
    defaultValues: {},
  });

  const { handleSubmit, watch } = methods;

  const formData = watch();

  useEffect(() => {
    const { ogType, ...rest } = formData;
    const qurl = queryString.stringifyUrl(
      {
        url: `${deploymentURL}/api/${ogType}`,
        query: { ...rest },
      },
      {
        skipEmptyString: true,
      }
    );

    setLink(qurl);
  }, [formData]);

  const onSubmit: SubmitHandler<Query> = () => {
    setImgLink(link);
  };

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <h1 className="my-10">Openraph Generator From Text To Image.</h1>
      <div className="layout">
        <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-8">
          <div className="flex flex-col gap-4 max-w-[400px]">
            <FormProvider {...methods}>
              <SelectInput label="Opengraph Type" id="ogType">
                <option value="general" selected>
                  General
                </option>
                <option value="blog">Blog</option>
              </SelectInput>
              <Input label="Title" type="text" id="title" />
              <Input label="Site Name" type="text" id="siteName" />
              <Input label="Description" type="text" id="description" />
              <Input label="Logo Url" type="text" id="logo" />
              <hr />
              <SelectInput label="Background Style" id="bgType">
                <option value="default" selected>
                  Default
                </option>
                <option value="image">Background Image</option>
                <option value="color">Background Color</option>
              </SelectInput>
              {formData.bgType === "color" && (
                <Input label="Color" type="color" id="bgColor" />
              )}
              {formData.bgType === "image" && (
                <Input label="Image Url" type="text" id="bgImage" />
              )}
            </FormProvider>
          </div>
          <div className="flex flex-col gap-4">
            <span>Live Preview:</span>
            <div
              className={clsx(
                formData.bgType === "default" &&
                  "bg-default-img bg-center bg-no-repeat bg-cover",
                formData.bgType === "color" && `bg-[${formData.bgColor}]`,
                "w-full h-auto aspect-video flex flex-col justify-center items-center"
              )}
            >
              <img
                src={formData.logo ? formData.logo : "/images/awandri.png"}
                alt={formData.logo ? formData.logo : "default-logo"}
                width={100}
                height={100}
                className="w-10"
              />
              <div className="text-black font-black bg-[#3DF9FA] text-[10px] font-normal border border-black px-1 mt-2 mb-1 text-center">
                {formData.siteName ? formData.siteName : "sitename.com"}
              </div>
              <div className="text-2xl font-black max-w-md text-center leading-5 my-2">
                {formData.title ? formData.title : "Default Title"}
              </div>
              {formData.description && (
                <p className="text-xs font-light max-w-[85%] text-center">
                  {formData.description}
                </p>
              )}
            </div>
            {/* <p className="mt-2 text-sm text-gray-600 break-all">{link}</p> */}
          </div>
        </div>
      </div>
    </main>
  );
}
