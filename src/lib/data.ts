import type { User, TeamMember, Transaction, Task, ClientFeedback, StablecoinRate, TimelineEvent, Client } from './types';

export const mockClientUser: User = {
  uid: 'client1',
  name: 'Acme Inc.',
  email: 'client@demo.com',
  company: 'Acme Inc.',
  balance: 150325.75,
  feesOwed: 258.90,
  createdAt: '2023-01-15T10:00:00Z',
  avatarUrl: 'https://picsum.photos/seed/101/100/100',
};

export const mockTeamUser: TeamMember = {
  uid: 'team1',
  name: 'Navya',
  email: 'team@flux.com',
  role: 'Lead Developer',
  tasksCompleted: 12,
  tasksPending: 3,
  avatarUrl: 'https://picsum.photos/seed/102/100/100',
};

export const mockTransactions: Transaction[] = [
  { id: 'TX001', date: '2024-03-25', amount: 50000, fromCountry: 'USA', toCountry: 'Germany', routeUsed: 'Stablecoin', feePaid: 50, status: 'Completed', savingsPercentage: 88.5 },
  { id: 'TX002', date: '2024-03-24', amount: 15000, fromCountry: 'UK', toCountry: 'India', routeUsed: 'Local Rail', feePaid: 75, status: 'Completed', savingsPercentage: 45.2 },
  { id: 'TX003', date: '2024-03-22', amount: 120000, fromCountry: 'Singapore', toCountry: 'USA', routeUsed: 'SWIFT', feePaid: 450, status: 'Completed', savingsPercentage: 0 },
  { id: 'TX004', date: '2024-03-20', amount: 5000, fromCountry: 'USA', toCountry: 'UK', routeUsed: 'Stablecoin', feePaid: 5, status: 'Completed', savingsPercentage: 92.1 },
  { id: 'TX005', date: '2024-03-18', amount: 25000, fromCountry: 'Germany', toCountry: 'Singapore', routeUsed: 'Stablecoin', feePaid: 25, status: 'Pending', savingsPercentage: 89.8 },
  { id: 'TX006', date: '2024-03-15', amount: 8000, fromCountry: 'India', toCountry: 'USA', routeUsed: 'Local Rail', feePaid: 40, status: 'Completed', savingsPercentage: 55.0 },
  { id: 'TX007', date: '2024-03-12', amount: 1000, fromCountry: 'USA', toCountry: 'India', routeUsed: 'Stablecoin', feePaid: 1, status: 'Failed', savingsPercentage: 95.0 },
];

export const mockStablecoinRates: StablecoinRate[] = [
  { pair: 'USDC/USD', rate: 1.0001, change: 0.01 },
  { pair: 'USDT/EUR', rate: 0.92, change: -0.12 },
  { pair: 'DAI/GBP', rate: 0.79, change: 0.05 },
  { pair: 'USDC/INR', rate: 83.15, change: 0.25 },
  { pair: 'USDC/SGD', rate: 1.34, change: -0.08 },
];

export const mockClientFeedback: ClientFeedback[] = [
    { id: 'FB01', clientId: 'c1', clientName: 'Jane Doe', clientCompany: 'Innovate LLC', rating: 5, comment: 'FLUX is a game-changer! Our international payments are now incredibly fast and cheap.', timestamp: '2024-03-20T10:00:00Z', avatarUrl: 'https://picsum.photos/seed/201/100/100' },
    { id: 'FB02', clientId: 'c2', clientName: 'John Smith', clientCompany: 'Global Exports', rating: 5, comment: 'The savings are substantial compared to our old bank. The AI route suggestions are brilliant.', timestamp: '2024-03-18T14:30:00Z', avatarUrl: 'https://picsum.photos/seed/202/100/100' },
    { id: 'FB03', clientId: 'c3', clientName: 'Emily White', clientCompany: 'Tech Solutions', rating: 4, comment: 'Excellent service, though I wish there were more local rail options for Africa.', timestamp: '2024-03-15T09:00:00Z', avatarUrl: 'https://picsum.photos/seed/203/100/100' },
];

export const mockTeamMembers: TeamMember[] = [
  { uid: 'team1', name: 'Navya', email: 'navya@flux.com', role: 'Lead Developer', tasksCompleted: 12, tasksPending: 3, avatarUrl: 'https://picsum.photos/seed/102/100/100' },
  { uid: 'team2', name: 'Sowmya', email: 'sowmya@flux.com', role: 'Product Manager', tasksCompleted: 8, tasksPending: 1, avatarUrl: 'https://picsum.photos/seed/103/100/100' },
  { uid: 'team3', name: 'Subhash', email: 'subhash@flux.com', role: 'Blockchain Engineer', tasksCompleted: 15, tasksPending: 2, avatarUrl: 'https://picsum.photos/seed/104/100/100' },
  { uid: 'team4', name: 'Gaffar', email: 'gaffar@flux.com', role: 'Client Success', tasksCompleted: 20, tasksPending: 0, avatarUrl: 'https://picsum.photos/seed/105/100/100' },
];

export const mockTasks: Task[] = [
    { id: 'T01', title: 'Integrate Solana mainnet', status: 'Pending', dueDate: 'Tomorrow', assignedTo: 'Subhash' },
    { id: 'T02', title: 'Client KYC verification for Acme Corp', status: 'Completed', dueDate: 'Yesterday', assignedTo: 'Gaffar' },
    { id: 'T03', title: 'Update stablecoin rates API', status: 'Pending', dueDate: 'Friday', assignedTo: 'Navya' },
    { id: 'T04', title: 'Plan Q2 feature roadmap', status: 'Pending', dueDate: 'Next week', assignedTo: 'Sowmya' },
    { id: 'T05', title: 'Resolve client ticket #5821', status: 'Completed', dueDate: 'Today', assignedTo: 'Gaffar'},
    { id: 'T06', title: 'Deploy security patch v1.2.4', status: 'Completed', dueDate: 'Yesterday', assignedTo: 'Navya' },
    { id: 'T07', title: 'Draft documentation for new API endpoint', status: 'Pending', dueDate: 'Wednesday', assignedTo: 'Navya' }
];

export const mockTimelineEvents: TimelineEvent[] = [
    { id: 'E01', date: new Date(2024, 3, 25), title: 'Acme Corp → Germany ($50k)', priority: 'high' },
    { id: 'E02', date: new Date(2024, 3, 27), title: 'TechStart → India ($25k)', priority: 'medium' },
    { id: 'E03', date: new Date(2024, 4, 2), title: 'Global Inc → Singapore ($100k)', priority: 'high' },
    { id: 'E04', date: new Date(2024, 4, 5), title: 'Innovate LLC → UK ($15k)', priority: 'low' },
];

export const mockClients: Client[] = [
    { id: 'C01', name: 'Acme Inc.', company: 'Acme Inc.', totalVolume: 1250000, lastTransaction: '2024-03-25', status: 'Active', avatarUrl: 'https://picsum.photos/seed/301/100/100' },
    { id: 'C02', name: 'Global Exports', company: 'Global Exports Ltd.', totalVolume: 850000, lastTransaction: '2024-03-22', status: 'Active', avatarUrl: 'https://picsum.photos/seed/302/100/100' },
    { id: 'C03', name: 'Tech Solutions', company: 'Tech Solutions Co.', totalVolume: 2300000, lastTransaction: '2024-03-20', status: 'Active', avatarUrl: 'https://picsum.photos/seed/303/100/100' },
    { id: 'C04', name: 'Innovate LLC', company: 'Innovate LLC', totalVolume: 450000, lastTransaction: '2024-02-15', status: 'Inactive', avatarUrl: 'https://picsum.photos/seed/304/100/100' },
    { id: 'C05', name: 'Market Makers', company: 'Market Makers Inc.', totalVolume: 5600000, lastTransaction: '2024-03-18', status: 'Flagged', avatarUrl: 'https://picsum.photos/seed/305/100/100' },
];

export const analyticsData = {
    savingsOverTime: [
        { month: 'Jan', "Your Savings": 2400, "Traditional Fees": 3500 },
        { month: 'Feb', "Your Savings": 3100, "Traditional Fees": 4200 },
        { month: 'Mar', "Your Savings": 4200, "Traditional Fees": 5800 },
        { month: 'Apr', "Your Savings": 3800, "Traditional Fees": 5100 },
        { month: 'May', "Your Savings": 5100, "Traditional Fees": 6900 },
        { month: 'Jun', "Your Savings": 5500, "Traditional Fees": 7500 },
    ],
    routeUsage: [
        { route: 'Stablecoin', value: 75, fill: 'hsl(var(--primary))' },
        { route: 'Local Rail', value: 15, fill: 'hsl(var(--accent))' },
        { route: 'SWIFT', value: 10, fill: 'hsl(var(--muted))' },
    ],
    feesComparison: [
        { name: "Total Fees Paid", "FLUX Fees": 1240, "Traditional Banking Fees": 8950 },
    ]
};

export const teamRevenueData = [
  { month: 'Jan', revenue: 23000, profit: 15000, loss: 0 },
  { month: 'Feb', revenue: 28000, profit: 19000, loss: 0 },
  { month: 'Mar', revenue: 25000, profit: 17000, loss: 0 },
  { month: 'Apr', revenue: 32000, profit: 24000, loss: 0 },
  { month: 'May', revenue: 35000, profit: 28000, loss: 0 },
  { month: 'Jun', revenue: 31000, profit: 21000, loss: 0 },
];
