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
