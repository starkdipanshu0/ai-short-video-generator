import { NextResponse } from "next/server";
import Replicate from "replicate";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/configs/firebase";

async function fetchWithRetry(url: string, retries: number = 3, delay: number = 2000) {
    let attempt = 0;
    while (attempt < retries) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return response;
            } else {
                throw new Error(`Failed to fetch image. Status: ${response.status}`);
            }
        } catch (error) {
            attempt++;
            if (attempt < retries) {
                console.log(`Retrying... Attempt ${attempt}`);
                await new Promise(res => setTimeout(res, delay)); // Wait before retrying
            } else {
                throw new Error('Max retries reached. ' + error);
            }
        }
    }
}

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return NextResponse.json(
        { error: "The 'prompt' field is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    // Initialize Replicate client
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    // Generate image using Replicate API
    const input = {
      prompt: prompt,
      height: 1280,
      width: 720,
      num_outputs: 1,
    };

    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      { input }
    );

    if (!output || !Array.isArray(output) || output.length === 0) {
      return NextResponse.json(
        { error: "Failed to generate image from the model." },
        { status: 500 }
      );
    }

    // Handle image upload to Firebase Storage
    const imageUrl = output[0]; // Assuming the first output contains the image URL
    console.log("Generated image URL:", imageUrl);

    const response = await fetchWithRetry(imageUrl); // Using retry logic
    if(!response){
      return NextResponse.json(
        { error: "Failed to fetch image from the URL." },
        { status: 500 }
      );
    }
     const imageBlob = await response.blob(); // Convert the response to a Blob
    const storageRef = ref(storage, `ai-short-video-files/${Date.now()}.png`);

    // Upload the image to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, imageBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress (optional)
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error during upload:", error);
          reject(
            NextResponse.json(
              { error: "Failed to upload the image to Firebase Storage." },
              { status: 500 }
            )
          );
        },
        async () => {
          try {
            // Get the download URL after successful upload
            const downloadURL = await getDownloadURL(storageRef);
            console.log("File available at:", downloadURL);
            resolve(
              NextResponse.json({ result: downloadURL }, { status: 200 })
            );
          } catch (error) {
            console.error("Error fetching download URL:", error);
            reject(
              NextResponse.json(
                { error: "Failed to fetch the download URL." },
                { status: 500 }
              )
            );
          }
        }
      );
    });
  } catch (error: any) {
    console.error("Error processing request:", error);

    // Return a structured error response
    return NextResponse.json(
      { error: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}
