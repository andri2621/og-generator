import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

const interExtrabold = fetch(
  new URL("../../../../public/fonts/Inter-ExtraBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
  const interFont = await interExtrabold;

  try {
    const { origin, searchParams } = new URL(request.url);

    const title = searchParams.has("title");
    const siteName = searchParams.get("siteName");
    const description = searchParams.get("description");
    const bgColor = searchParams.get("bgColor");

    const avatar = searchParams.get("avatar");
    const author = searchParams.get("author");
    const userName = searchParams.get("userName");

    const query = {
      title: title
        ? searchParams.get("title")?.slice(0, 100)
        : "My Default Title",
      siteName: siteName ?? "Site Name",
      description: description ?? "Description",
      avatar: avatar ?? `${origin}/images/avatar.png`,
      author: author ?? "Author Name",
      userName: userName ?? "User Name",
      bgColor: bgColor ? `#${bgColor}` : `url(${origin}/images/bg-purple.jpg)`,
    };

    return new ImageResponse(
      (
        <div
          style={{
            background: query.bgColor,
            // backgroundColor: "#222222",
            backgroundSize: "100% 100%",
            height: "630px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            fontFamily: "Inter",
            padding: "40px 80px",
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
              gap: 8,
              alignItems: "center",
            }}
          >
            <img width={80} height={80} src={query.avatar} alt="avatar-img" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "white",
              }}
            >
              <div className="author-name" style={{ fontSize: 28 }}>
                {query.author}
              </div>
              <div
                className="author-desc"
                style={{ color: "lightgrey", fontSize: 18 }}
              >
                {query.userName}
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
            data: interFont,
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
