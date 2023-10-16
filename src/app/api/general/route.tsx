/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const interExtrabold = fetch(
    new URL("../../../../public/fonts/Inter-ExtraBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const interRegular = fetch(
    new URL("../../../../public/fonts/Inter-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const { origin, searchParams } = new URL(req.url);

  const title = searchParams.get("title");
  const siteName = searchParams.get("siteName");
  const description = searchParams.get("description");
  const logo = searchParams.get("logo");
  const bgColor = searchParams.get("bgColor");
  const borderWidth = searchParams.get("borderWidth");
  const borderRadius = searchParams.get("borderRadius");
  const borderColor = searchParams.get("borderColor");

  const query = {
    title: title ?? "Default Title",
    siteName: siteName ?? "Default Site Name",
    description,
    logo: logo ?? `${origin}/images/awandri.png`,
    bgColor: bgColor
      ? `${decodeURIComponent(bgColor)}`
      : `url(${origin}/images/bg-purple.jpg)`,
    borderWidth,
    borderRadius,
    borderColor: borderColor ? `${decodeURIComponent(borderColor)}` : "black",
  };

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          fontFamily: "Inter",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 5rem",
          background: query.bgColor,
          backgroundSize: "100% 100%",
        }}
      >
        <img
          style={{
            width: 100,
            borderWidth: query.borderWidth ? `${query.borderWidth}px` : "0",
            borderStyle: "solid",
            borderColor: query.borderColor,
            borderRadius: query.borderRadius ? `${query.borderRadius}px` : "0",
          }}
          width={100}
          height={100}
          src={query.logo}
          alt="Favicon"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3
            tw={`text-black text-lg font-bold bg-[#3DF9FA] px-1 border border-black`}
          >
            {query.siteName}
          </h3>

          <h1 tw={`text-white my-0 text-6xl font-bold`}>{query.title}</h1>
        </div>

        {query.description && (
          <p
            style={{
              color: "#f9fafb",
              fontWeight: 400,
              fontSize: 20,
            }}
          >
            {query.description}
          </p>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: await interExtrabold,
          style: "normal",
          weight: 800,
        },
        {
          name: "Inter",
          data: await interRegular,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
