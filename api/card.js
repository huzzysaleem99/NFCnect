const SUPABASE_URL =
  "https://qldzzuqdzoarboonnizn.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_MOUxn_K0T9DpYe0ZZyk-TA_cMjATkVd";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req, res) {
  try {
    const cardId = req.query.cardId;

    if (!cardId) {
      return res.status(400).send("Missing cardId");
    }

    const profileUrl =
      `${SUPABASE_URL}/rest/v1/Profiles` +
      `?card_id=eq.${encodeURIComponent(cardId)}` +
      `&status=eq.active` +
      `&select=full_name,job_title,company`;

    const profileResponse = await fetch(profileUrl, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });

    const profiles = await profileResponse.json();

    if (!profiles.length) {
      return res.status(404).send("Profile not found");
    }

    const profile = profiles[0];

    const name = escapeHtml(profile.full_name || "VEUQO");
    const jobTitle = escapeHtml(profile.job_title || "");
    const company = escapeHtml(profile.company || "");

    const title = `${name} | VEUQO`;

    const description = escapeHtml(
      [jobTitle, company].filter(Boolean).join(" at ") ||
      "Digital Business Card"
    );

    const cardUrl =
      `https://veuqo.co.uk/c/${encodeURIComponent(cardId)}`;

    const previewUrl =
  `https://veuqo.co.uk/preview/${encodeURIComponent(cardId)}.png`;

    // Load your existing digital profile HTML
    const htmlResponse = await fetch(
      "https://veuqo.co.uk/index.html"
    );

    let html = await htmlResponse.text();

    const metaTags = `
      <title>${title}</title>

      <meta name="description" content="${description}">

      <meta property="og:type" content="website">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
      <meta property="og:url" content="${cardUrl}">
      <meta property="og:image" content="${previewUrl}">
      <meta property="og:image:width" content="1200">
      <meta property="og:image:height" content="630">

      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${title}">
      <meta name="twitter:description" content="${description}">
      <meta name="twitter:image" content="${previewUrl}">
    `;

    html = html.replace(
      "</head>",
      `${metaTags}\n</head>`
    );

    res.setHeader("Content-Type", "text/html; charset=utf-8");

    res.setHeader(
      "Cache-Control",
      "public, max-age=0, s-maxage=60"
    );

    html = html.replace(
  "</body>",
  `
  </body>
  `
);

    return res.status(200).send(html);

  } catch (error) {
    console.error("VEUQO card page error:", error);

    return res.status(500).send(
      "Could not load VEUQO profile"
    );
  }
}
