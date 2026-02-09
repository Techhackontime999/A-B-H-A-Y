'use server';

/**
 * @fileOverview An AI flow for flagging potential duplicate reports.
 *
 * - preventDuplicateReports - A function that takes a report as input and flags it if it's a potential duplicate.
 * - PreventDuplicateReportsInput - The input type for the preventDuplicateReports function.
 * - PreventDuplicateReportsOutput - The return type for the preventDuplicateReports function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PreventDuplicateReportsInputSchema = z.object({
  reportText: z.string().describe('The text content of the report.'),
  previousReports: z.array(z.string()).describe('An array of previous reports to check against.'),
});
export type PreventDuplicateReportsInput = z.infer<typeof PreventDuplicateReportsInputSchema>;

const PreventDuplicateReportsOutputSchema = z.object({
  isDuplicate: z.boolean().describe('Whether the report is a potential duplicate.'),
  similarityScore: z.number().describe('A score indicating the similarity between the report and existing reports. Higher values indicate greater similarity.'),
  duplicateReportExcerpt: z.string().optional().describe('An excerpt from the most similar existing report, if one exists.'),
});
export type PreventDuplicateReportsOutput = z.infer<typeof PreventDuplicateReportsOutputSchema>;

export async function preventDuplicateReports(input: PreventDuplicateReportsInput): Promise<PreventDuplicateReportsOutput> {
  return preventDuplicateReportsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'preventDuplicateReportsPrompt',
  input: {schema: PreventDuplicateReportsInputSchema},
  output: {schema: PreventDuplicateReportsOutputSchema},
  prompt: `You are an AI assistant tasked with identifying potential duplicate reports.

  Given a new report and a list of previous reports, determine if the new report is a duplicate of any of the previous reports.

  Consider factors such as:
  - Similarity in content and wording.
  - Overlapping information or claims.
  - Repetitive reporting on the same topic.

  Provide a similarity score between 0 and 1, where 0 indicates no similarity and 1 indicates an exact match.
  If the report is a duplicate, extract a relevant excerpt from the most similar existing report to illustrate the duplication.

  New Report: {{{reportText}}}

  Previous Reports:
  {{#each previousReports}}
  - {{{this}}}
  {{/each}}
  `,
});

const preventDuplicateReportsFlow = ai.defineFlow(
  {
    name: 'preventDuplicateReportsFlow',
    inputSchema: PreventDuplicateReportsInputSchema,
    outputSchema: PreventDuplicateReportsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
