import { ImageResponse } from "@vercel/og";

export default function handler() {
  return new ImageResponse(
    `
      <div
        style="
          width: 1200px;
          height: 630px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #080808;
          color: #d6b777;
          font-size: 72px;
          font-family: Arial;
        "
      >
        VEUQO
      </div>
    `,
    {
      width: 1200,
      height: 630,
    }
  );
}

