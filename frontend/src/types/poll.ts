type Poll = {
  title: string;
  description: string;
  nb_against: string;
  nb_for: string;
  startTimestamp: string;
  endTimestamp: string;
  isActive: boolean;
  canVote: boolean;
  alreadyVoted: boolean;
  owner: string;
  id: number;
};

enum VoteChoie {
  Unset,
  For,
  Against,
}

type CreatePoll = {
  title: string;
  description: string;
  enddate: Date;
  authorized: string[];
};

type CreatePollError = {
  title: string;
  description: string;
  enddate: string;
  authorized: string;
};

export type { Poll, CreatePoll, CreatePollError };
export { VoteChoie };
