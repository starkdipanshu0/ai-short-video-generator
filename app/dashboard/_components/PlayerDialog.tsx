"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";

interface Caption {
  text: string;
  start: number;
  end: number;
  confidence: number;
  speaker: string | null;
}


type PlayerDialogProps = {
  playVideo: boolean;
  videoId: number;
};
interface ScriptItem {
    imagePrompt: string;
    contentText: string;
  }
type VideoDataType = {
  id: number;
  script: ScriptItem[];
  audioFileUrl: string;
  imageList: string[];
  captions: Caption[];
};

function PlayerDialog({ playVideo, videoId }: PlayerDialogProps) {
  const [videoData, setVideoData] = useState<VideoDataType | null>(null);
  const [openDialog, setOpenDialog] = useState(playVideo);
  const [durationInFrames, setDurationInFrames] = useState(1);
  useEffect(() => {
    setOpenDialog(playVideo);
    if (videoId) {
      getVideoData();
    }
  }, [playVideo, videoId]);

  const getVideoData = async () => {
    try {
      const result = await db.select().from(VideoData).where(eq(VideoData.id, videoId));
      if (result.length > 0) {
        setVideoData(result[0]as VideoDataType);
      } else {
        console.error("No video data found for the given ID");
      }
    } catch (error) {
      console.error("Error fetching videaq  o data:", error);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">Your Video is Ready</DialogTitle>
          {videoData ? (
            <Player
              component={RemotionVideo}
              durationInFrames={durationInFrames}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              inputProps={{...videoData,
                setDurationInFrames: (duration: number) => {setDurationInFrames(duration);},

              }}
              controls={true}
            />
          ) : (
            <p>Loading video...</p>
          )}
        </DialogHeader>
        <div className="flex justify-between w-full mt-5 px-7">
          <Button variant="ghost" className="py-3" onClick={() => setOpenDialog(false)}>
            Close
          </Button>
          <Button className="py-3">Export</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
