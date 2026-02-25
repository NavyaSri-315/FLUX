export type User = {
  uid: string;
  name: string;
  email: string;
  company: string;
  balance: number;
  feesOwed: number;
  createdAt: string;
  avatarUrl: string;
};

export type TeamMember = {
  uid: string;
  name:string;
  email: string;
  role: 'Lead Developer' | 'Product Manager' | 'Blockchain Engineer' | 'Client Success';
  tasksCompleted: number;
  tasksPending: number;
  avatarUrl: string;
};

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  fromCountry: string;
  toCountry: string;
  routeUsed: 'SWIFT' | 'Stablecoin' | 'Local Rail';
  feePaid: number;
  status: 'Completed' | 'Pending' | 'Failed';
  savingsPercentage: number;
};

export type Task = {
  id: string;
  title: string;
  status: 'Pending' | 'Completed';
  dueDate: string;
  assignedTo: string;
};

export type ClientFeedback = {
  id: string;
  clientId: string;
  clientName: string;
  clientCompany: string;
  rating: number;
  comment: string;
  timestamp: string;
  avatarUrl: string;
};

export type StablecoinRate = {
  pair: string;
  rate: number;
  change: number;
};

export type TimelineEvent = {
  id: string;
  date: Date;
  title: string;
  priority: 'high' | 'medium' | 'low';
};

export type Client = {
    id: string;
    name: string;
    company: string;
    totalVolume: number;
    lastTransaction: string;
    status: 'Active' | 'Inactive' | 'Flagged';
    avatarUrl: string;
}
