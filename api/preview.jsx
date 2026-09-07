import { ImageResponse } from "@vercel/og";

export const config = {
    runtime: "edge"
};

const SUPABASE_URL =
    "https://qldzzuqdzoarboonnizn.supabase.co/rest/v1";

const SUPABASE_KEY =
    "sb_publishable_MOUxn_K0T9DpYe0ZZyk-TA_cMjATkVd";


export default async function handler(request) {

    try {

        const url =
            new URL(request.url);

        const cardId =
            url.searchParams.get("cardId");


        if (!cardId) {

            return new Response(
                "Missing Card ID",
                {
                    status: 400
                }
            );

        }


        const response =
            await fetch(

                `${SUPABASE_URL}/Profiles?card_id=eq.${encodeURIComponent(cardId)}&status=eq.active&select=full_name,job_title,company,profile_photo`,

                {
                    headers: {
                        apikey: SUPABASE_KEY
                    }
                }

            );


        if (!response.ok) {

            return new Response(
                "Unable to load profile",
                {
                    status: 500
                }
            );

        }


        const profiles =
            await response.json();


        if (
            !profiles ||
            profiles.length === 0
        ) {

            return new Response(
                "Profile not found",
                {
                    status: 404
                }
            );

        }


        const person =
            profiles[0];


        const fullName =
            person.full_name ||
            "VEUQO";


        const jobTitle =
            person.job_title ||
            "";


        const company =
            person.company ||
            "";


        const profilePhoto =
            person.profile_photo ||
            null;



        return new ImageResponse(

            (

                <div

                    style={{

                        width:
                            "1200px",

                        height:
                            "630px",

                        display:
                            "flex",

                        flexDirection:
                            "column",

                        alignItems:
                            "center",

                        justifyContent:
                            "center",

                        position:
                            "relative",

                        overflow:
                            "hidden",

                        background:
                            "linear-gradient(145deg, #111111 0%, #050505 75%)",

                        color:
                            "#ffffff",

                        fontFamily:
                            "Arial, sans-serif"

                    }}

                >


                    {/* GOLD BORDER */}

                    <div

                        style={{

                            position:
                                "absolute",

                            inset:
                                "28px",

                            border:
                                "2px solid #c9a227",

                            borderRadius:
                                "55px"

                        }}

                    />



                    {/* VEUQO */}

                    <div

                        style={{

                            position:
                                "absolute",

                            top:
                                "70px",

                            left:
                                "85px",

                            color:
                                "#c9a227",

                            fontSize:
                                "42px",

                            fontWeight:
                                "700",

                            letterSpacing:
                                "12px"

                        }}

                    >

                        VEUQO

                    </div>



                    {/* NFC SYMBOL */}

                    <div

                        style={{

                            position:
                                "absolute",

                            top:
                                "70px",

                            right:
                                "85px",

                            color:
                                "#c9a227",

                            fontSize:
                                "38px",

                            fontWeight:
                                "700"

                        }}

                    >

                        ))) 

                    </div>



                    {/* PROFILE PHOTO */}

                    {

                        profilePhoto
                        ? (

                            <img

                                src={
                                    profilePhoto
                                }

                                width="170"

                                height="170"

                                style={{

                                    borderRadius:
                                        "999px",

                                    objectFit:
                                        "cover",

                                    border:
                                        "5px solid #c9a227",

                                    marginBottom:
                                        "30px"

                                }}

                            />

                        )
                        : (

                            <div

                                style={{

                                    width:
                                        "170px",

                                    height:
                                        "170px",

                                    borderRadius:
                                        "999px",

                                    display:
                                        "flex",

                                    alignItems:
                                        "center",

                                    justifyContent:
                                        "center",

                                    background:
                                        "#151515",

                                    border:
                                        "5px solid #c9a227",

                                    color:
                                        "#c9a227",

                                    fontSize:
                                        "70px",

                                    fontWeight:
                                        "700",

                                    marginBottom:
                                        "30px"

                                }}

                            >

                                {
                                    fullName
                                        .charAt(0)
                                        .toUpperCase()
                                }

                            </div>

                        )

                    }



                    {/* NAME */}

                    <div

                        style={{

                            fontSize:
                                "58px",

                            fontWeight:
                                "700",

                            textAlign:
                                "center",

                            marginBottom:
                                "15px"

                        }}

                    >

                        {fullName}

                    </div>



                    {/* JOB TITLE */}

                    {

                        jobTitle && (

                            <div

                                style={{

                                    color:
                                        "#ffffff",

                                    fontSize:
                                        "30px",

                                    marginBottom:
                                        "10px"

                                }}

                            >

                                {jobTitle}

                            </div>

                        )

                    }



                    {/* COMPANY */}

                    {

                        company && (

                            <div

                                style={{

                                    color:
                                        "#c9a227",

                                    fontSize:
                                        "28px",

                                    fontWeight:
                                        "600"

                                }}

                            >

                                {company}

                            </div>

                        )

                    }



                    {/* GOLD DECORATION */}

                    <div

                        style={{

                            position:
                                "absolute",

                            width:
                                "330px",

                            height:
                                "330px",

                            right:
                                "-120px",

                            bottom:
                                "-150px",

                            borderRadius:
                                "999px",

                            border:
                                "2px solid rgba(201,162,39,0.3)",

                            background:
                                "rgba(201,162,39,0.04)"

                        }}

                    />


                </div>

            ),

            {

                width:
                    1200,

                height:
                    630

            }

        );


    } catch (error) {

        console.error(
            error
        );


        return new Response(
            "Preview generation failed",
            {
                status: 500
            }
        );

    }

}
