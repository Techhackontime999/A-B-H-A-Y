
'use server';
/**
 * @fileOverview AI flow to provide a deep, expert analysis of a whistleblower report.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExpertAnalysisInputSchema = z.object({
  content: z.string().describe('The full text of the report.'),
});
export type ExpertAnalysisInput = z.infer<typeof ExpertAnalysisInputSchema>;

const ExpertAnalysisOutputSchema = z.object({
  legalImplications: z.string().describe('Potential legal consequences or laws involved.'),
  ethicalAnalysis: z.string().describe('A breakdown of the ethical violations.'),
  societalImpact: z.string().describe('How this affects the general public.'),
  actionableSteps: z.array(z.string()).describe('Recommended next steps for journalists or investigators.'),
});
export type ExpertAnalysisOutput = z.infer<typeof ExpertAnalysisOutputSchema>;

export async function getExpertAnalysis(input: ExpertAnalysisInput): Promise<ExpertAnalysisOutput> {
  return expertAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'expertAnalysisPrompt',
  input: {schema: ExpertAnalysisInputSchema},
  output: {schema: ExpertAnalysisOutputSchema},
  prompt: `You are a senior investigative consultant with expertise in law and ethics. 
  Analyze the following whistleblower report and provide a deep, professional breakdown.
  
  Report:
  {{{content}}}`,
});

const expertAnalysisFlow = ai.defineFlow(
  {
    name: 'expertAnalysisFlow',
    inputSchema: ExpertAnalysisInputSchema,
    outputSchema: ExpertAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
