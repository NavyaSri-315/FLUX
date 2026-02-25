'use server';
/**
 * @fileOverview This file implements a Genkit flow for the client-side AI chat assistant.
 * The assistant can answer questions about payment routes, potential savings, and transaction statuses.
 *
 * - clientAIChatAssistant - A function that handles client AI chat interactions.
 * - ClientAIChatInput - The input type for the clientAIChatAssistant function.
 * - ClientAIChatOutput - The return type for the clientAIChatAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClientAIChatInputSchema = z
  .string()
  .describe('The client\'s query or message for the AI assistant.');
export type ClientAIChatInput = z.infer<typeof ClientAIChatInputSchema>;

const ClientAIChatOutputSchema = z
  .string()
  .describe('The AI assistant\'s response to the client\'s query.');
export type ClientAIChatOutput = z.infer<typeof ClientAIChatOutputSchema>;

const clientAIChatPrompt = ai.definePrompt({
  name: 'clientAIChatPrompt',
  input: {schema: ClientAIChatInputSchema},
  output: {schema: ClientAIChatOutputSchema},
  prompt: `You are the FLUX AI Assistant, a helpful and professional financial assistant designed to support clients of FLUX, a cross-border payment optimization platform.

FLUX helps clients make international payments that are better than traditional methods like Wise, typically offering 85% cheaper and 3-second settlements, with zero hidden fees and 24/7 availability. Our clients save on average 32% compared to traditional banking.

Here's what you need to know about payment routes:
-   **Stablecoin**: This is the optimal route for FLUX clients, offering very low costs and exceptionally fast settlement times (typically 3-10 seconds).
-   **Local Rail**: This route offers medium costs and fast settlement times (1-2 hours), suitable for many local transfers.
-   **SWIFT**: This is a traditional banking route, which is generally expensive and slower (2-5 days). FLUX aims to provide significantly better alternatives.

When asked about transaction status, you do not have access to live transaction data. Instead, you should politely direct the user to check their dashboard or transactions page for the latest information.

User query: {{prompt}}
`,
});

const clientAIChatFlow = ai.defineFlow(
  {
    name: 'clientAIChatFlow',
    inputSchema: ClientAIChatInputSchema,
    outputSchema: ClientAIChatOutputSchema,
  },
  async (prompt) => {
    const { output } = await clientAIChatPrompt(prompt);
    return output!;
  }
);


export async function clientAIChatAssistant(input: ClientAIChatInput): Promise<ClientAIChatOutput> {
  return clientAIChatFlow(input);
}
