import { config } from 'dotenv';
config();

import '@/ai/flows/prevent-duplicate-reports.ts';
import '@/ai/flows/summarize-report-flow.ts';
