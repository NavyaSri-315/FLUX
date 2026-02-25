'use server';
/**
 * @fileOverview An internal AI chat assistant for team members.
 *
 * - teamAIChatAssistant - A function that handles team member queries.
 * - TeamAIChatAssistantInput - The input type for the teamAIChatAssistant function.
 * - TeamAIChatAssistantOutput - The return type for the teamAIChatAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TeamAIChatAssistantInputSchema = z.object({
  query: z.string().describe('The query from the team member.'),
});
export type TeamAIChatAssistantInput = z.infer<typeof TeamAIChatAssistantInputSchema>;

const TeamAIChatAssistantOutputSchema = z.object({
  answer: z.string().describe('The AI assistant\'s response to the team member query.'),
});
export type TeamAIChatAssistantOutput = z.infer<typeof TeamAIChatAssistantOutputSchema>;

// Mock data for tools
const MOCK_TASKS = [
  { taskId: '1', title: 'Integrate Solana mainnet', status: 'Pending', dueDate: 'Tomorrow' },
  { taskId: '2', title: 'Client KYC verification for Acme Corp', status: 'Completed', dueDate: 'Yesterday' },
  { taskId: '3', title: 'Update stablecoin rates API', status: 'Pending', dueDate: 'Friday' },
  { taskId: '4', title: 'Review Q1 financial report', status: 'Pending', dueDate: 'End of week' },
  { taskId: '5', title: 'Onboard new client Global Logistics', status: 'Completed', dueDate: 'Last week' },
];

const MOCK_CLIENT_FEEDBACK = [
  { clientId: 'client1', rating: 5, comment: 'Excellent service, very fast transfers!' },
  { clientId: 'client2', rating: 4, comment: 'Good savings, but customer support can be slow sometimes.' },
  { clientId: 'client3', rating: 5, comment: 'FLUX is a game-changer for international payments.' },
];

// Tools for retrieving business-critical information

const getPendingTasks = ai.defineTool(
  {
    name: 'getPendingTasks',
    description: 'Returns a list of pending tasks for a team member, or all pending tasks if no member is specified.',
    inputSchema: z.object({
      assignedTo: z.string().optional().describe('Optional name of the team member to filter tasks for.'),
    }),
    outputSchema: z.array(z.object({
      taskId: z.string().describe('Unique identifier for the task.'),
      title: z.string().describe('Title of the task.'),
      status: z.enum(['Pending', 'Completed']).describe('Current status of the task.'),
      dueDate: z.string().describe('Due date of the task.'),
    })),
  },
  async (input) => {
    // In a real app, this would query a database.
    const pendingTasks = MOCK_TASKS.filter(task => task.status === 'Pending');
    if (input.assignedTo) {
      // This is a simplification; in a real app, tasks would have an 'assignedTo' field.
      return pendingTasks.filter(task => task.title.includes(input.assignedTo) || task.taskId === input.assignedTo); // Mock filtering
    }
    return pendingTasks;
  }
);

const getClientPerformanceMetrics = ai.defineTool(
  {
    name: 'getClientPerformanceMetrics',
    description: 'Retrieves overall client performance metrics such as total clients, total volume processed, average savings, and recent feedback.',
    inputSchema: z.object({
      clientId: z.string().optional().describe('Optional client ID to get specific client metrics.'),
    }),
    outputSchema: z.object({
      totalClients: z.number().describe('Total number of active clients.'),
      totalVolumeProcessed: z.number().describe('Total transaction volume processed across all clients.'),
      averageSavings: z.number().describe('Average savings percentage achieved by clients.'),
      latestClientFeedback: z.array(z.object({
        clientId: z.string().describe('The ID of the client who provided feedback.'),
        rating: z.number().describe('Rating given by the client (1-5).'),
        comment: z.string().describe('The client\'s feedback comment.'),
      })).optional().describe('A list of recent client feedback entries.'),
    }),
  },
  async (input) => {
    // Mock data for client performance.
    // In a real app, this would aggregate data from 'users', 'transactions', 'client_feedback' collections.
    const metrics = {
      totalClients: 1200,
      totalVolumeProcessed: 1_200_000_000,
      averageSavings: 32,
      latestClientFeedback: MOCK_CLIENT_FEEDBACK.slice(0, 3), // Return latest 3 feedback entries
    };
    // If a specific clientId is requested, one would fetch and return tailored metrics.
    // For this mock, we return aggregate.
    return metrics;
  }
);

const getRevenueFigures = ai.defineTool(
  {
    name: 'getRevenueFigures',
    description: 'Provides current and projected revenue figures for the company.',
    inputSchema: z.object({
      period: z.enum(['daily', 'monthly', 'quarterly', 'annually']).optional().describe('The period for which to retrieve revenue figures (e.g., "monthly", "quarterly"). Defaults to "monthly".'),
    }),
    outputSchema: z.object({
      totalFeesCollected: z.number().describe('Total fees collected for the specified period.'),
      projectedRevenue: z.number().describe('Projected revenue for the specified period.'),
    }),
  },
  async (input) => {
    // Mock data for revenue.
    // In a real app, this would aggregate data from 'transactions' collection.
    const period = input.period || 'monthly';
    switch (period) {
      case 'daily':
        return { totalFeesCollected: 15000, projectedRevenue: 17000 };
      case 'monthly':
        return { totalFeesCollected: 450000, projectedRevenue: 500000 };
      case 'quarterly':
        return { totalFeesCollected: 1350000, projectedRevenue: 1500000 };
      case 'annually':
        return { totalFeesCollected: 5400000, projectedRevenue: 6000000 };
      default:
        return { totalFeesCollected: 450000, projectedRevenue: 500000 }; // Default to monthly
    }
  }
);

const teamAIAssistantPrompt = ai.definePrompt({
  name: 'teamAIAssistantPrompt',
  input: { schema: TeamAIChatAssistantInputSchema },
  output: { schema: TeamAIChatAssistantOutputSchema },
  tools: [getPendingTasks, getClientPerformanceMetrics, getRevenueFigures],
  system: `You are an internal AI assistant for the FLUX team. Your goal is to help team members quickly retrieve business-critical information and provide relevant insights, alerts, or recommendations.

Use the available tools to answer questions about:
- Pending tasks (use getPendingTasks)
- Client performance metrics (use getClientPerformanceMetrics)
- Revenue figures (use getRevenueFigures)

If the user asks about tasks, try to determine if they are asking about tasks assigned to a specific team member. If they ask about revenue, try to determine the period (daily, monthly, quarterly, annually).

If the information requested cannot be found using the tools, or if the question is outside the scope of your tools, politely state that you cannot assist with that specific request. Always provide concise and helpful answers.`,
  prompt: `{{{query}}}`,
});

const teamAIChatAssistantFlow = ai.defineFlow(
  {
    name: 'teamAIChatAssistantFlow',
    inputSchema: TeamAIChatAssistantInputSchema,
    outputSchema: TeamAIChatAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await teamAIAssistantPrompt(input);
    return output!;
  }
);

export async function teamAIChatAssistant(input: TeamAIChatAssistantInput): Promise<TeamAIChatAssistantOutput> {
  return teamAIChatAssistantFlow(input);
}
