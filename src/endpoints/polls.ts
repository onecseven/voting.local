import { Request, Response } from "express"
import { singleton } from "../data.js"

export const getAllPolls = (request: Request, response: Response) => {
  let polls = singleton.get_all_polls()
  response.send(polls).json()
}

export const getPollbyID = (request: Request, response: Response) => {
  let {name} = request.body
  if (name && typeof name === 'string') {
    let poll = singleton.get_poll(name)
    if (poll) response.send({...poll, rankings: Object.fromEntries(poll.rankings)}).json()
    else response.send(404)
  } else response.send(404)
}

export const postPoll = (request: Request, response: Response) => {
  let { name, options } = request.body
  if (
    options &&
    Array.isArray(options) &&
    options.every((t) => typeof t === "string") &&
    name &&
    typeof name === "string"
  ) {
    if (singleton.add_poll(name, options)) response.send(200)
    else response.send(400)
  } else {
    response.send(400)
  }
}

export const postRanking = (request: Request, response: Response) => {
  let { poll, user, ranking } = request.body
  if (
    ranking &&
    Array.isArray(ranking) &&
    ranking.every((t) => typeof t === "string") &&
    poll &&
    typeof poll === "string" &&
    user && 
    typeof user === "string"
  ) {
    if (singleton.add_ranking(poll, user, ranking)) response.send(singleton.get_poll(poll)).json()
    else response.send(400)
  } else {
    response.send(400)
  }
}

export const addOption = (request: Request, response: Response) => {
  let { poll, option } = request.body
  if (
    option &&
    typeof option === "string" &&
    poll &&
    typeof poll === "string"
  ) {
    if (singleton.add_option(poll, option)) response.send(200)
    else response.send(404)
  } else {
    response.send(400)
  }
}