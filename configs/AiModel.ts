
  import { HarmCategory, HarmBlockThreshold,GoogleGenerativeAI } from "@google/generative-ai";

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API key not found");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "write a script to generate 30 second video on topic: interesting historical story along with ai images prompt in realistic format for each screen and give me result in json format with imagePrompt and contentText as field  "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"videoSegments\": [\n    {\n      \"imagePrompt\": \"A dimly lit, ancient library with towering bookshelves, a lone scholar with a beard hunched over a large, leather-bound book, illuminated by candlelight. The library should feel old and full of secrets.  Realistic oil painting style.\",\n      \"contentText\": \"Imagine a time when knowledge was fiercely guarded, not shared with a click. Our story begins in the 15th century, with a map that could change the world.\"\n    },\n    {\n        \"imagePrompt\": \"A detailed close-up of a complex hand-drawn map, showing coastlines and landmasses, with sections still blank and unexplored.  The map is stained and worn with age. Realistic vintage style.\",\n        \"contentText\":\"The Piri Reis map, drawn by a Turkish admiral, showed coastlines that shouldn't have been known at the time.\"\n    },\n    {\n      \"imagePrompt\": \"A weathered explorer's hand tracing the coastline of South America on the Piri Reis map. The hand is illuminated by sunlight streaming through a window.  The map looks extremely detailed.  Realistic photo style.\",\n       \"contentText\": \"Incredible detail, depicting parts of South America that were only 'officially' discovered much later.\"\n    },\n    {\n       \"imagePrompt\": \"A top-down view of a section of the Piri Reis map that is theorized to show the coastline of Antarctica with a layer of ice over it. The map looks hand-drawn and aged. Realistic map illustration.\",\n       \"contentText\": \"Some believe it even shows a pre-ice age Antarctica. How could this admiral have known?\"\n    },\n    {\n      \"imagePrompt\": \"An animated depiction of a sailing ship navigating through rough seas, with a starry night sky above.  The ship appears small against the vastness of the ocean.  Realistic historical painting style.\",\n      \"contentText\": \"Theories abound. Did he use ancient sources? Did he stumble upon lost knowledge?\"\n     },\n    {\n        \"imagePrompt\": \"A diverse group of scholars debating and discussing the map in a grand hall, some are holding old texts and maps in their hands.  The room is lit with candlelight and has ornate decorations.  Realistic historical painting style.\",\n        \"contentText\":\"The map remains an enigma. A glimpse into a past we are still trying to understand. A question mark in history.\"\n    },\n     {\n      \"imagePrompt\": \"A close-up of the Piri Reis map again, focusing on the enigmatic coastline, fades into a slightly blurred view with the map's legend, a quote, or name of its creator superimposed over it. The map is faded with age.  Realistic photo-manipulation style.\",\n      \"contentText\": \"The Piri Reis map... a reminder that history is full of surprises.\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  