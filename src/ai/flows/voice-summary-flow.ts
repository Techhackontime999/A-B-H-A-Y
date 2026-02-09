
'use server';
/**
 * @fileOverview AI flow to convert a report summary into a high-quality voice audio clip.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {z} from 'genkit';
import wav from 'wav';

const VoiceSummaryInputSchema = z.object({
  text: z.string().describe('The text to convert to speech.'),
});
export type VoiceSummaryInput = z.infer<typeof VoiceSummaryInputSchema>;

export async function generateVoiceSummary(input: VoiceSummaryInput): Promise<{media: string}> {
  return voiceSummaryFlow(input);
}

const voiceSummaryFlow = ai.defineFlow(
  {
    name: 'voiceSummaryFlow',
    inputSchema: VoiceSummaryInputSchema,
    outputSchema: z.object({media: z.string()}),
  },
  async (input) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: input.text,
    });
    
    if (!media) {
      throw new Error('no media returned');
    }
    
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavBase64 = await toWav(audioBuffer);
    
    return {
      media: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
