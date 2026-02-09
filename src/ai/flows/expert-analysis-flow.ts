'use server';
/**
 * @fileOverview AI flow to provide decision-support analysis for A-B-H-A-Y complaints.
 * This tool does NOT judge truth, but provides evaluative frameworks for human reviewers.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExpertAnalysisInputSchema = z.object({
  content: z.string().describe('The full text of the report.'),
});
export type ExpertAnalysisInput = z.infer<typeof ExpertAnalysisInputSchema>;

const ExpertAnalysisOutputSchema = z.object({
  legalImplications: z.string().describe('Relevant laws or legal precedents to consider.'),
  ethicalAnalysis: z.string().describe('A breakdown of the ethical concerns raised.'),
  societalImpact: z.string().describe('How this issue might affect the public or institution.'),
  investigativeLeads: z.array(z.string()).describe('Suggested areas for manual verification or investigation.'),
  patternCorrelation: z.string().describe('Potential patterns or systemic issues hinted at by this content.'),
});
export type ExpertAnalysisOutput = z.infer<typeof ExpertAnalysisOutputSchema>;

export async function getExpertAnalysis(input: ExpertAnalysisInput): Promise<ExpertAnalysisOutput> {
  return expertAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'expertAnalysisPrompt',
  input: {schema: ExpertAnalysisInputSchema},
  output: {schema: ExpertAnalysisOutputSchema},
  prompt: `You are an AI decision-support agent for the A-B-H-A-Y Justice Support platform. 
  Your goal is to assist authorized human reviewers in evaluating anonymous complaints responsibly.
  
  CRITICAL: Do not attempt to judge whether the report is definitely true or false. Instead, provide investigative frameworks, legal context, and ethical breakdowns that help human investigators prioritize and evaluate the report.
  
  Analyze the following content:
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
