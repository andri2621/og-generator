/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const interExtrabold = fetch(
  new URL("../../../../public/fonts/Inter-ExtraBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const interRegular = fetch(
  new URL("../../../../public/fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  try {
    const interFontExtraBold = await interExtrabold;
    const interFontRegular = await interRegular;

    const { origin, searchParams } = new URL(req.url);

    const title = searchParams.get("title");
    const siteName = searchParams.get("siteName");
    const description = searchParams.get("description");
    const logo = searchParams.get("logo");
    const borderWidth = searchParams.get("borderWidth");
    const borderRadius = searchParams.get("borderRadius");
    const borderColor = searchParams.get("borderColor");
    const bgType = searchParams.get("bgType");
    const bgColor = searchParams.get("bgColor");
    const bgImageUrl = searchParams.get("bgImageUrl");

    const query = {
      title: title ?? "Default Title",
      siteName: siteName ?? "Default Site Name",
      description,
      //logo
      logo: logo ?? `${origin}/images/awandri.png`,
      borderWidth,
      borderRadius,
      borderColor: borderColor ? `${decodeURIComponent(borderColor)}` : "black",
      //background
      bgType,
      bgColor: bgColor ? `${decodeURIComponent(bgColor)}` : "black",
      bgImageUrl,
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
            // padding: "0 5rem",
            position: "relative",
            backgroundColor: `${query.bgColor}`,
          }}
        >
          {query.bgType !== "color" && (
            <img
              src={
                query.bgType === "image"
                  ? `${query.bgImageUrl}`
                  : `${origin}/images/bg-purple.jpg`
              }
              alt="bg-image"
              tw="absolute w-full h-full top-0 left-0 right-0 bottom-0"
              style={{ objectFit: "cover" }}
            />
          )}
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
            }}
          >
            <img
              style={{
                width: 100,
                borderWidth: query.borderWidth
                  ? `${query.borderWidth}px`
                  : "0px",
                borderStyle: "solid",
                borderColor: query.borderColor,
                borderRadius: query.borderRadius
                  ? `${query.borderRadius}`
                  : "0px",
                objectFit: "cover",
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
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interFontExtraBold,
            style: "normal",
            weight: 800,
          },
          {
            name: "Inter",
            data: interFontRegular,
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
