declare type DisMsgProps = {
  type?: string;
  name?: string;
  email?: string;
  emoji?: string;
  amount?: string;
  plan?: string;
  recurringRevenue?: string;
  growth?: string;
};

declare interface DisMsgInterface {
  content: DisMsgProps[];
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: null;
  image: string;
}

interface CategoryTableProps {
  categoryName: string;
  amount: string | null;
  events: string | null;
  clientUserEmail: string | null;
  lastPing: string | null;
}
