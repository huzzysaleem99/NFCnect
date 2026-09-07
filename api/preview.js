import {
  createCanvas,
  GlobalFonts,
  loadImage
} from "@napi-rs/canvas";

import path from "node:path";

const SUPABASE_URL =
  "https://qldzzuqdzoarboonnizn.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_MOUxn_K0T9DpYe0ZZyk-TA_cMjATkVd";

const fontPath = path.join(
  process.cwd(),
  "fonts",
  "Inter_18pt-Regular.ttf"
);

GlobalFonts.registerFromPath(fontPath, "Inter");

export default async function handler(req, res) {
  try {
    const cardId = req.query.cardId;

    if (!cardId) {
      return res.status(400).json({
        error: "Missing cardId"
      });
    }

    const profileUrl =
  `${SUPABASE_URL}/rest/v1/Profiles` +
  `?card_id=eq.${encodeURIComponent(cardId)}` +
  `&status=eq.active` +
  `&select=full_name,job_title,company,profile_photo`;

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

    if (!profiles.length) {
      return res.status(404).json({
        error: "Profile not found"
      });
    }

    const profile = profiles[0];

    const name = profile.full_name || "VEUQO";
    const jobTitle = profile.job_title || "";
    const company = profile.company || "";
    const profilePhoto = profile.profile_photo || "";

    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#080808";
    ctx.fillRect(0, 0, 1200, 630);

    // Card
    ctx.fillStyle = "#111111";
    ctx.strokeStyle = "#D6B777";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.roundRect(45, 45, 1110, 540, 38);
    ctx.fill();
    ctx.stroke();

    // VEUQO
    ctx.fillStyle = "#D6B777";
    ctx.font = "34px Inter";
    ctx.fillText("VEUQO", 90, 120);

    // Top-right text
    ctx.fillStyle = "#888888";
    ctx.font = "18px Inter";
    ctx.textAlign = "right";
    ctx.fillText(
      "DIGITAL BUSINESS CARD",
      1110,
      115
    );

    // Initial circle
ctx.beginPath();
ctx.arc(190, 315, 90, 0, Math.PI * 2);

ctx.fillStyle = "#080808";
ctx.fill();

ctx.strokeStyle = "#D6B777";
ctx.lineWidth = 3;
ctx.stroke();

// Initial
ctx.fillStyle = "#D6B777";
ctx.font = "64px Inter";
ctx.textAlign = "center";
ctx.fillText(
  name.charAt(0).toUpperCase(),
  190,
  338
);

    // Name
    ctx.textAlign = "left";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "52px Inter";
    ctx.fillText(name, 330, 285);

    // Job title
    if (jobTitle) {
      ctx.fillStyle = "#D6B777";
      ctx.font = "30px Inter";
      ctx.fillText(jobTitle, 330, 340);
    }

    // Company
    if (company) {
      ctx.fillStyle = "#AAAAAA";
      ctx.font = "27px Inter";
      ctx.fillText(company, 330, 385);
    }

    // Footer
    ctx.fillStyle = "#888888";
    ctx.font = "20px Inter";
    ctx.fillText(
      "TAP • CONNECT • SHARE",
      90,
      535
    );

    ctx.textAlign = "right";
    ctx.fillStyle = "#D6B777";
    ctx.font = "22px Inter";
    ctx.fillText(
      "veuqo.co.uk",
      1110,
      535
    );

    const image = await canvas.encode("png");

    res.setHeader("Content-Type", "image/png");
    res.setHeader(
      "Cache-Control",
      "public, max-age=0, s-maxage=60"
    );

    return res.status(200).send(image);

  } catch (error) {
    console.error("VEUQO preview error:", error);

    return res.status(500).json({
      error: "Preview generation failed",
      message: error.message
    });
  }
}
