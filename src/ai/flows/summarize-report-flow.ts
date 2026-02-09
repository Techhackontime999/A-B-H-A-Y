'use server';
/**
 * @fileOverview AI flow to generate a concise summary of whistleblower reports.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeReportInputSchema = z.object({
  content: z.string().describe('The full text of the whistleblower report.'),
});
export type SummarizeReportInput = z.infer<typeof SummarizeReportInputSchema>;

const SummarizeReportOutputSchema = z.object({
  summary: z.string().describe('A one or two sentence summary of the report.'),
  impactLevel: z.enum(['Low', 'Medium', 'High', 'Critical']).describe('The potential impact of this information.'),
  keyEntities: z.array(z.string()).describe('Major organizations or individuals mentioned.'),
});
export type SummarizeReportOutput = z.infer<typeof SummarizeReportOutputSchema>;

export async function summarizeReport(input: SummarizeReportInput): Promise<SummarizeReportOutput> {
  return summarizeReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeReportPrompt',
  input: {schema: SummarizeReportInputSchema},
  output: {schema: SummarizeReportOutputSchema},
  prompt: `You are an expert investigative journalist. 
  Summarize the following whistleblower report into a punchy, readable summary for the general public.
  Identify the impact level and major entities involved.
  
  Report Content:
  {{{content}}}`,
});

const summarizeReportFlow = ai.defineFlow(
  {
    name: 'summarizeReportFlow',
    inputSchema: SummarizeReportInputSchema,
    outputSchema: SummarizeReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
