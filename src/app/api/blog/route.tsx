import { ImageResponse } from "next/server";
import { NextRequest } from "next/server";

export const runtime = "edge";

const interExtrabold = fetch(
  new URL("../../../../public/fonts/Inter-ExtraBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(request: NextRequest) {
  try {
    const interFontExtraBold = await interExtrabold;
    const { origin, searchParams } = new URL(request.url);

    const title = searchParams.has("title");
    const siteName = searchParams.get("siteName");

    const avatar = searchParams.get("avatar");
    const author = searchParams.get("author");
    const userName = searchParams.get("userName");

    const bgType = searchParams.get("bgType");
    const bgColor = searchParams.get("bgColor");
    const bgImageUrl = searchParams.get("bgImageUrl");

    const query = {
      title: title
        ? searchParams.get("title")?.slice(0, 100)
        : "My Default Title",
      siteName: siteName ?? "Site Name",
      avatar: avatar ?? `${origin}/images/avatar.png`,
      author: author ?? "Author Name",
      userName: userName ?? "User Name",
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
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            fontFamily: "Inter",
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
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "0 5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "#14b8a6",
                padding: "4px",
                border: "1px solid black",
              }}
            >
              {query.siteName}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 60,
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1,
                color: "white",
                marginTop: 24,
                marginBottom: 24,
                whiteSpace: "pre-wrap",
                textTransform: "capitalize",
              }}
            >
              {query.title}
            </div>
            <div
              style={{
                display: "flex",
                gap: 24,
                alignItems: "center",
              }}
            >
              <img
                width={80}
                height={80}
                src={query.avatar}
                alt="avatar-img"
                style={{
                  borderRadius: "50px",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                }}
              >
                <div
                  className="author-name"
                  style={{ fontSize: 28, fontWeight: 800 }}
                >
                  {query.author}
                </div>
                <div
                  className="author-desc"
                  style={{
                    color: "lightgrey",
                    fontSize: 18,
                    fontWeight: 800,
                  }}
                >
                  {query.userName}
                </div>
              </div>
            </div>
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
