'use server';
/**
 * @fileOverview An AI agent that helps clients find the most cost-effective and fastest payment routes.
 *
 * - clientPaymentRouteOptimization - A function that handles the payment route optimization process.
 * - ClientPaymentRouteOptimizationInput - The input type for the clientPaymentRouteOptimization function.
 * - ClientPaymentRouteOptimizationOutput - The return type for the clientPaymentRouteOptimization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// 1. Input Schema
const ClientPaymentRouteOptimizationInputSchema = z.object({
  fromCountry: z.string().describe('The country from which the payment is being sent.'),
  toCountry: z.string().describe('The country to which the payment is being sent.'),
  amount: z.number().positive().describe('The amount of money to be transferred in USD.'),
});
export type ClientPaymentRouteOptimizationInput = z.infer<typeof ClientPaymentRouteOptimizationInputSchema>;

// 2. Output Schema
const RouteOptionSchema = z.object({
  name: z.string().describe('The name of the payment route (e.g., SWIFT, Stablecoin, Local Rail).'),
  cost: z.number().describe('The estimated cost of the transfer in USD.'),
  time: z.string().describe('The estimated transfer time (e.g., "2-5 days", "3-10 seconds").'),
  description: z.string().describe('A brief description of the route and its benefits/drawbacks.'),
  savingsPercentage: z.number().optional().describe('The percentage saved compared to the SWIFT route, if applicable.'),
});

const ClientPaymentRouteOptimizationOutputSchema = z.object({
  swift: RouteOptionSchema,
  stablecoin: RouteOptionSchema,
  localRail: RouteOptionSchema,
});
export type ClientPaymentRouteOptimizationOutput = z.infer<typeof ClientPaymentRouteOptimizationOutputSchema>;

// 3. Prompt definition
const paymentRouteOptimizationPrompt = ai.definePrompt({
  name: 'paymentRouteOptimizationPrompt',
  input: { schema: z.object({
    fromCountry: z.string(),
    toCountry: z.string(),
    amount: z.number(),
    swiftCost: z.number(),
    stablecoinCost: z.number(),
    localRailCost: z.number(),
    stablecoinSavings: z.number(),
    localRailSavings: z.number(),
  })},
  output: { schema: ClientPaymentRouteOptimizationOutputSchema },
  prompt: `You are an expert financial advisor specializing in international cross-border payments.
A client wants to send {{{amount}}} USD from {{{fromCountry}}} to {{{toCountry}}}.
Your task is to provide three payment route options: SWIFT, Stablecoin, and Local Rail.
For each option, provide the estimated cost, estimated time, a short description, and for Stablecoin and Local Rail, the percentage saved compared to SWIFT.

Use the following calculated values for your response:
SWIFT:
  Cost: {{{swiftCost}}} USD
  Time: "2-5 business days"

Stablecoin:
  Cost: {{{stablecoinCost}}} USD
  Time: "3-10 seconds"
  Savings vs SWIFT: {{{stablecoinSavings}}}%

Local Rail:
  Cost: {{{localRailCost}}} USD
  Time: "1-2 hours"
  Savings vs SWIFT: {{{localRailSavings}}}%

Provide your response in a JSON format matching the following structure:
{{jsonSchema ClientPaymentRouteOptimizationOutputSchema}}
`,
});

// 4. Flow definition
const clientPaymentRouteOptimizationFlow = ai.defineFlow(
  {
    name: 'clientPaymentRouteOptimizationFlow',
    inputSchema: ClientPaymentRouteOptimizationInputSchema,
    outputSchema: ClientPaymentRouteOptimizationOutputSchema,
  },
  async (input) => {
    // Mock cost and time calculations. In a real application, these would come from external APIs or a complex logic.
    // For simplicity, using linear cost models.
    const swiftCost = 30 + input.amount * 0.01; // $30 fixed + 1% of amount
    const stablecoinCost = 1 + input.amount * 0.001; // $1 fixed + 0.1% of amount
    const localRailCost = 10 + input.amount * 0.005; // $10 fixed + 0.5% of amount

    const stablecoinSavings = Math.max(0, ((swiftCost - stablecoinCost) / swiftCost) * 100);
    const localRailSavings = Math.max(0, ((swiftCost - localRailCost) / swiftCost) * 100);

    const promptInput = {
      fromCountry: input.fromCountry,
      toCountry: input.toCountry,
      amount: input.amount,
      swiftCost: parseFloat(swiftCost.toFixed(2)),
      stablecoinCost: parseFloat(stablecoinCost.toFixed(2)),
      localRailCost: parseFloat(localRailCost.toFixed(2)),
      stablecoinSavings: parseFloat(stablecoinSavings.toFixed(2)),
      localRailSavings: parseFloat(localRailSavings.toFixed(2)),
    };

    const { output } = await paymentRouteOptimizationPrompt(promptInput);
    return output!;
  }
);

// 5. Exported wrapper function
export async function clientPaymentRouteOptimization(
  input: ClientPaymentRouteOptimizationInput
): Promise<ClientPaymentRouteOptimizationOutput> {
  return clientPaymentRouteOptimizationFlow(input);
}
