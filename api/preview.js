import { ImageResponse } from "@vercel/og";

const SUPABASE_URL = "https://qldzzuqdzoarboonnizn.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_MOUxn_K0T9DpYe0ZZyk-TA_cMjATkVd";

export default async function handler(req) {
  try {
    const url = new URL(req.url, "https://veuqo.co.uk");
    const cardId = url.searchParams.get("cardId");

    if (!cardId) {
      return new Response("Missing cardId", {
        status: 400,
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
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (!response.ok) {
      return new Response("Could not load profile", {
        status: 500,
      });
    }

    const profiles = await response.json();

    if (!profiles.length) {
      return new Response("Profile not found", {
        status: 404,
      });
    }

    const profile = profiles[0];

    const name = profile.full_name || "VEUQO";
    const jobTitle = profile.job_title || "";
    const company = profile.company || "";
    const photo = profile.profile_photo || "";

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background: "#080808",
            color: "#ffffff",
            padding: "70px",
            fontFamily: "Arial",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "2px solid #c9a96e",
              borderRadius: "34px",
              padding: "48px 55px",
              background:
                "linear-gradient(135deg, #151515 0%, #050505 100%)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "34px",
                  letterSpacing: "8px",
                  fontWeight: "700",
                  color: "#d6b777",
                }}
              >
                VEUQO
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: "24px",
                  color: "#d6b777",
                  letterSpacing: "2px",
                }}
              >
                DIGITAL BUSINESS CARD
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "42px",
              }}
            >
              {photo ? (
                <img
                  src={photo}
                  width="150"
                  height="150"
                  style={{
                    borderRadius: "75px",
                    objectFit: "cover",
                    border: "3px solid #d6b777",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "75px",
                    border: "3px solid #d6b777",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "64px",
                    color: "#d6b777",
                  }}
                >
                  {name.charAt(0).toUpperCase()}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: "56px",
                    fontWeight: "700",
                    lineHeight: "1.1",
                  }}
                >
                  {name}
                </div>

                {jobTitle && (
                  <div
                    style={{
                      display: "flex",
                      marginTop: "14px",
                      fontSize: "30px",
                      color: "#d6b777",
                    }}
                  >
                    {jobTitle}
                  </div>
                )}

                {company && (
                  <div
                    style={{
                      display: "flex",
                      marginTop: "8px",
                      fontSize: "27px",
                      color: "#b7b7b7",
                    }}
                  >
                    {company}
                  </div>
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "22px",
                color: "#9b9b9b",
              }}
            >
              <div style={{ display: "flex" }}>
                TAP • CONNECT • SHARE
              </div>

              <div
                style={{
                  display: "flex",
                  color: "#d6b777",
                }}
              >
                veuqo.co.uk
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error(error);

    return new Response("Preview generation failed", {
      status: 500,
    });
  }
}
