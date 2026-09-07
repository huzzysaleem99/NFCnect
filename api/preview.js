import sharp from "sharp";

const SUPABASE_URL = "https://qldzzuqdzoarboonnizn.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_MOUxn_K0T9DpYe0ZZyk-TA_cMjATkVd";

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default async function handler(req, res) {
  try {
    // 1. Get Card ID from the URL
    const cardId = req.query.cardId;

    if (!cardId) {
      return res.status(400).json({
        error: "Missing cardId"
      });
    }

    // 2. Fetch customer from Supabase
    const profileUrl =
      `${SUPABASE_URL}/rest/v1/Profiles` +
      `?card_id=eq.${encodeURIComponent(cardId)}` +
      `&status=eq.active` +
      `&select=full_name,job_title,company`;

    const response = await fetch(profileUrl, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(
        `Supabase request failed: ${response.status}`
      );
    }

    const profiles = await response.json();

    if (!profiles || profiles.length === 0) {
      return res.status(404).json({
        error: "Profile not found"
      });
    }

    const profile = profiles[0];

    const name = escapeXml(profile.full_name || "VEUQO");
    const jobTitle = escapeXml(profile.job_title || "");
    const company = escapeXml(profile.company || "");

    // 3. Generate VEUQO preview
    const svg = `
      <svg
        width="1200"
        height="630"
        viewBox="0 0 1200 630"
        xmlns="http://www.w3.org/2000/svg"
      >

        <rect
          width="1200"
          height="630"
          fill="#080808"
        />

        <rect
          x="45"
          y="45"
          width="1110"
          height="540"
          rx="38"
          fill="#111111"
          stroke="#D6B777"
          stroke-width="3"
        />

        <!-- VEUQO branding -->
        <text
          x="90"
          y="120"
          fill="#D6B777"
          font-family="sans-serif"
          font-size="34"
          font-weight="700"
          letter-spacing="7"
        >VEUQO</text>

        <text
          x="1110"
          y="115"
          text-anchor="end"
          fill="#888888"
          font-family="sans-serif"
          font-size="18"
          letter-spacing="2"
        >DIGITAL BUSINESS CARD</text>

        <!-- Initial circle -->
        <circle
          cx="190"
          cy="315"
          r="90"
          fill="#080808"
          stroke="#D6B777"
          stroke-width="3"
        />

        <text
          x="190"
          y="340"
          text-anchor="middle"
          fill="#D6B777"
          font-family="sans-serif"
          font-size="72"
          font-weight="600"
        >${name.charAt(0).toUpperCase()}</text>

        <!-- Customer -->
        <text
          x="330"
          y="285"
          fill="#FFFFFF"
          font-family="sans-serif"
          font-size="58"
          font-weight="700"
        >${name}</text>

        ${
          jobTitle
            ? `
        <text
          x="330"
          y="340"
          fill="#D6B777"
          font-family="sans-serif"
          font-size="30"
        >${jobTitle}</text>
        `
            : ""
        }

        ${
          company
            ? `
        <text
          x="330"
          y="385"
          fill="#AAAAAA"
          font-family="sans-serif"
          font-size="27"
        >${company}</text>
        `
            : ""
        }

        <!-- Footer -->
        <text
          x="90"
          y="535"
          fill="#888888"
          font-family="sans-serif"
          font-size="20"
          letter-spacing="3"
        >TAP  •  CONNECT  •  SHARE</text>

        <text
          x="1110"
          y="535"
          text-anchor="end"
          fill="#D6B777"
          font-family="sans-serif"
          font-size="22"
        >veuqo.co.uk</text>

      </svg>
    `;

    // 4. Convert SVG to PNG
    const image = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();

    res.setHeader("Content-Type", "image/png");

    // Don't heavily cache it yet while we're testing
    res.setHeader(
      "Cache-Control",
      "public, max-age=0, s-maxage=60"
    );

    return res.status(200).send(image);

  } catch (error) {
    console.error("VEUQO preview error:", error);

    return res.status(500).json({
      error: "Preview generation failed"
    });
  }
}
