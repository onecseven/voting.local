import { Poll, PollOption, Ranking } from "./types.js"

class PollHolder {
  polls = new Map<string, Poll>()

  add_poll(name: string, options: PollOption[]): boolean {
    if (this.polls.size > 20) {
      delete this.polls
      this.polls = new Map<string, Poll>()
    }
    if (this.polls.has(name)) return false
    this.polls.set(name, { name, options, rankings: new Map() })
    return true
  }

  add_ranking(
    poll: string,
    user: string,
    ranking: Ranking<PollOption>
  ): boolean {
    if (this.polls.has(poll)) {
      let current = this.polls.get(poll)
      current.rankings.set(user, ranking)
      this.polls.set(current.name, current)
      return true
    } else return false
  }

  get_poll(name: string): Poll | null {
    if (this.polls.has(name)) {
      return this.polls.get(name)
    }
    return null
  }

  get_poll_json(name: string) {
    let gottenpoll = this.get_poll(name)
    if (gottenpoll)
      return JSON.stringify({
        ...gottenpoll,
        rankings: Object.fromEntries(gottenpoll.rankings),
      })
    else return null
  }

  get_all_polls() {
    let result: Poll[] = []
    this.polls.forEach((entry) => result.push(entry))
    return result
  }

  add_option(poll: string, option: string) {
    if (this.polls.has(poll)) {
      let poll_ref = this.polls.get(poll)
      poll_ref.options.push(option)
      this.polls.set(poll_ref.name, poll_ref)
      return true
    } else {
      return false
    }
  }
}

let singleton = new PollHolder()


export default singleton
