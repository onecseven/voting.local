export interface Poll {
  name: string
  options: PollOption[]
  rankings: Map< string, Ranking<PollOption> >
}

export type PollOption = string


export type Ranking<T> = T[]
