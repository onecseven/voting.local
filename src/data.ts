import { Poll, PollOption, Ranking } from "./types.js"

class PollHolder {
  polls = new Map<string, Poll>()
  
  add_poll(name: string, options: PollOption[]) {
    this.polls.set(name, {name, options, rankings: new Map() })
  }

  add_ranking(poll: string, user: string, ranking: Ranking<PollOption>) {
    let current = this.polls.get(poll)
    // if current
    // current.rankins.set(user, ranking)
  }

  get_poll(name: string) {

  }
}

export let singleton = new PollHolder()
