
import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs';
import util from 'util';
import { NextResponse } from 'next/server';

const client = new textToSpeech.TextToSpeechClient({
   apiKey: process.env.GOOGLE_API_KEY
});

export async function POST(req: any) {
  try {
    const { text, id } = await req.json();

    // Validate the input text
    if (!text || typeof text !== 'string' || text.trim() === '') {
      throw new Error('The input "text" field is required and cannot be empty.');
    }

    const request: any = {
      input: { text:text },
      voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
      audioConfig: { audioEncoding: 'MP3' },
    };

    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    // Check if the response contains audio content
    if (!response.audioContent) {
      throw new Error('Failed to generate audio content.');
    }

    // Save the audio content to a file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(`audio${id}.mp3`, response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');

    return NextResponse.json({ result: 'success' });
  } catch (error:any) {
    console.error('Error generating audio:', error);
    return NextResponse.json({ result: 'error', message: error.message }, { status: 500 });
  }
}
