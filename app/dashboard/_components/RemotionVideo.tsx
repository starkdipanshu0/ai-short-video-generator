import React from 'react';
import { AbsoluteFill, Sequence, Img, useVideoConfig, Audio, useCurrentFrame, interpolate } from 'remotion';

// Define the prop types
interface Caption {
    text: string;
    start: number;
    end: number;
    confidence: number;
    speaker: string | null;
}

interface ScriptItem {
    imagePrompt: string;
    contentText: string;
}

interface RemotionVideoProps {
    script: ScriptItem[];
    audioFileUrl: string;
    imageList: string[];
    captions: Caption[];
    setDurationInFrames: Function;
}

function RemotionVideo({ script, audioFileUrl, imageList, captions, setDurationInFrames }: RemotionVideoProps) {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();


    // Function to calculate the total duration in frames
    const getDurationFrames = () => {
        const lastCaptionEnd = captions[captions.length - 1]?.end || 0;
        setDurationInFrames(Math.round((lastCaptionEnd / 1000) * fps));
        return Math.round((lastCaptionEnd / 1000) * fps);
    };

    const getCurrentCaptions= ()=>{
        const currentTime =frame/fps*1000
        const currentCaption = captions.find((word)=>currentTime>=word.start&&currentTime<=word.end)
        return currentCaption?currentCaption.text:''

    }


    // Per-image duration in frames
    const perImageDuration = Math.round(getDurationFrames() / imageList.length);

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            {imageList.map((item, index) => {
                const startTime =index * perImageDuration;
                const duration = getDurationFrames();
                
                const scale =(index:number)=> interpolate(
                    frame,
                    [startTime,startTime+duration/2, startTime+duration], // Zoom in zoom out
                    // index%2==0?[1, 1.8, 1]:[1.8,1,1.8],
                    [1,1.8,1],
                    {extrapolateLeft:'clamp',extrapolateRight:'clamp'}
                )

                return (
                <Sequence
                    key={index}
                    from={startTime}
                    durationInFrames={perImageDuration}
                >
                    <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        {/* Render the image */}
                        <Img src={item} style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transform: `scale(${scale(index)})`
                            }} />
                        <AbsoluteFill style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            top:undefined,
                            bottom:50,
                            height:150,
                            textAlign:'center'
                            }}>
                            <h2 className='text-white text-2xl '>{getCurrentCaptions()}</h2>
                        </AbsoluteFill>
                    </AbsoluteFill>
                </Sequence>
            )})}
            <Audio src={audioFileUrl}></Audio>
        </AbsoluteFill>
    );
}

export default RemotionVideo;
