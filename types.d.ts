interface Poll {
  id: string
  name: string
  options: PollOption[]
}

interface PollOption {
  name: string
}

interface Ranking<T> {
  user: string
  ranking: T[]
}