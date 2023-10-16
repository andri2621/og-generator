"use client";

import Input from "@/components/forms/Input";
import SelectInput from "@/components/forms/SelectInput";
import { deploymentURL } from "@/constant/env";
import clsx from "clsx";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import GeneratorResult from "../(result)/GeneratorResult";
import BlogResult from "../(result)/BlogResult";
import Divider from "@/components/Divider";
import Modal from "@/components/Modal";

const queryKeys = [
  "title",
  "siteName",
  "description",
  "logo",
  "bgType",
  "bgColor",
  "bgImageUrl",
  "ogType",
  "borderWidth",
  "borderRadius",
  "borderColor",
  "author",
  "userName",
];

type Query = Record<(typeof queryKeys)[number], string>;

export default function Home() {
  const [link, setLink] = useState(`${deploymentURL}/api/general`);
  const [imgLink, setImgLink] = useState(`${deploymentURL}/api/general`);
  const [openGenerated, setOpenGenerated] = useState(false);

  const methods = useForm<Query>({
    mode: "onTouched",
    defaultValues: {
      bgColor: "#000000",
      bgImageUrl: `${deploymentURL}/images/bg-purple.jpg`,
    },
  });

  const { handleSubmit, watch } = methods;

  const formData = watch();

  useEffect(() => {
    const { ogType, ...rest } = formData;
    let query = { ...rest };

    if (query.bgType === "image") {
      query.bgColor = "";
    } else if (query.bgType === "color") {
      query.bgImageUrl = "";
    } else if (query.bgType === "default") {
      query.bgColor = "";
      query.bgImageUrl = "";
    }

    const qurl = queryString.stringifyUrl(
      {
        url: `${deploymentURL}/api/${ogType}`,
        query,
      },
      {
        skipEmptyString: true,
      }
    );

    setLink(qurl);
  }, [formData]);

  const onSubmit: SubmitHandler<Query> = () => {
    setImgLink(link);
    setOpenGenerated(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div className="layout">
        <h1 className="my-10 font-bold text-xl md:text-3xl text-center">
          OpenGraph Generator From Text To Image.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 gap-8 pb-10">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-4 w-full md:w-2/3">
                  <SelectInput
                    label="Opengraph Type"
                    id="ogType"
                    defaultValue="general"
                  >
                    <option value="general">General</option>
                    <option value="blog">Blog</option>
                  </SelectInput>

                  <Divider>Content</Divider>

                  <Input label="Title" type="text" id="title" />
                  <Input label="Site Name" type="text" id="siteName" />
                  {formData.ogType === "general" && (
                    <>
                      <Input label="Description" type="text" id="description" />

                      <Divider>Logo</Divider>

                      <Input label="Logo Url" type="text" id="logo" />

                      {formData.logo && (
                        <div className="flex flex-row gap-4">
                          <Input
                            label="Border Width"
                            type="number"
                            id="borderWidth"
                            className="w-1/3"
                          />
                          <SelectInput
                            label="Border Radius"
                            id="borderRadius"
                            defaultValue="0px"
                            className="w-1/3"
                          >
                            <option value="0px">none</option>
                            <option value="0.75rem">small</option>
                            <option value="1rem">medium</option>
                            <option value="1.5rem">large</option>
                            <option value="9999px">circle</option>
                          </SelectInput>
                          <Input
                            label="Border Color"
                            type="color"
                            id="borderColor"
                            className="w-1/3"
                          />
                        </div>
                      )}
                    </>
                  )}

                  {formData.ogType === "blog" && (
                    <>
                      <Divider>Author Content</Divider>
                      <Input label="Avatar Url" type="text" id="avatar" />
                      <Input label="Author Name" type="text" id="author" />
                      <Input label="User Name" type="text" id="userName" />
                    </>
                  )}

                  <Divider>Background</Divider>

                  {/* BACKGROUND */}
                  <SelectInput
                    label="Background Style"
                    id="bgType"
                    defaultValue="default"
                  >
                    <option value="default">Default</option>
                    <option value="image">Background Image</option>
                    <option value="color">Solid Color</option>
                  </SelectInput>
                  {formData.bgType === "color" && (
                    <Input label="Color" type="color" id="bgColor" />
                  )}
                  {formData.bgType === "image" && (
                    <Input
                      label="Image Url"
                      type="text"
                      id="bgImageUrl"
                      helperText="Change with your image url."
                      required
                    />
                  )}
                </div>
                <button className="w-full md:w-1/3 h-10 bg-teal-500 text-black px-4 py-1  mt-5 rounded-lg hover:bg-teal-600 outline-none">
                  Generate
                </button>
              </div>
            </form>
          </FormProvider>

          <div className="flex flex-col gap-8 order-first md:order-last">
            <div className="flex flex-col">
              <span className="mb-2">Preview:</span>

              {formData.ogType && formData.ogType === "general" && (
                <GeneratorResult formData={formData} />
              )}
              {formData.ogType && formData.ogType === "blog" && (
                <BlogResult formData={formData} />
              )}
            </div>
          </div>
        </div>
        <Modal
          className={clsx(openGenerated ? "" : "hidden")}
          link={imgLink}
          closeModal={() => setOpenGenerated(false)}
        />
      </div>
    </main>
  );
}
