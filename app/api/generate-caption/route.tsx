// Start by making sure the `assemblyai` package is installed.
// If not, you can install it by running the following command:
// npm install assemblyai

import { AssemblyAI } from 'assemblyai';
import { NextResponse } from 'next/server';

const apiKey = process.env.ASSEMBLYAI_API_KEY;

// Validate the API key
if (!apiKey) {
  throw new Error('The ASSEMBLYAI_API_KEY environment variable is not set.');
}

const client = new AssemblyAI({ apiKey });

export async function POST(req: any) {
  try {
    // Parse the request body
    const { audioFileURL } = await req.json();

    // Validate the audioFileURL
    if (!audioFileURL || typeof audioFileURL !== 'string' || audioFileURL.trim() === '') {
      return NextResponse.json(
        { result: 'error', message: 'Valid audioFileURL is required.' },
        { status: 400 }
      );
    }

    // Prepare the request payload
    const data = { audio: audioFileURL };

    // Perform transcription using AssemblyAI
    const transcript = await client.transcripts.transcribe(data);

    // Check if the transcript contains words
    if (!transcript.words || !Array.isArray(transcript.words)) {
      return NextResponse.json(
        { result: 'error', message: 'Failed to retrieve transcription words.' },
        { status: 500 }
      );
    }

    // Respond with the transcription words
    return NextResponse.json({ result: 'success', words: transcript.words });
  } catch (error: any) {
    console.error('Error processing transcription:', error.message);
    return NextResponse.json(
      { result: 'error', message: error.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}