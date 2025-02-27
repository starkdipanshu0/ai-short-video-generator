import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        // Parse request JSON
        const { videoData, createdBy } = await req.json();

        // Validate input data
        if (!videoData || !createdBy) {
            return NextResponse.json(
                { error: "Missing videoData or createdBy fields" },
                { status: 400 }
            );
        }

        // Log for debugging
        console.log("Received videoData:", videoData);
        console.log("Received createdBy:", createdBy);

        // Insert video data into the database
        await db.insert(VideoData).values({
            script: videoData.videoScript,
            audioFileUrl: videoData.audioFileUrl,
            captions: videoData.captions,
            imageList: videoData.imageList,
            createdBy: createdBy,
            createdAt: new Date(),
        });

        console.log("Video data saved successfully.");

        return NextResponse.json({ result: "success" }, { status: 200 });
    } catch (error) {
        console.error("Error saving video data:", error);

        

        return NextResponse.json(
            { error: "Internal server error.", details: error},
            { status: 500 }
        );
    }
};