import sharp from "sharp";

export default async function handler(req, res) {
  try {
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="#080808"/>

        <rect
          x="60"
          y="60"
          width="1080"
          height="510"
          rx="35"
          fill="#111111"
          stroke="#d6b777"
          stroke-width="3"
        />

        <text
          x="600"
          y="330"
          text-anchor="middle"
          fill="#d6b777"
          font-family="Arial, sans-serif"
          font-size="80"
          font-weight="700"
          letter-spacing="12"
        >
          VEUQO
        </text>
      </svg>
    `;

    const image = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600");

    res.status(200).send(image);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Preview generation failed"
    });
  }
}
