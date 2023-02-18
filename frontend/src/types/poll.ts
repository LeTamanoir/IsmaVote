type Poll = {
  title: string;
  description: string;
  enddate: Date;
  authorized: string[];
  address: string;
};

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
