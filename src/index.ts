import express from "express"
import bodyParser from "body-parser"
import logger from "morgan"
import path from "path"
import chalk from "chalk"
import http from "http"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
// import cors from "cors"

import { postPoll, getAllPolls, getPollbyID, postRanking, addOption } from "./endpoints/polls.js"
function buildExpressApp() {
  let app = express()
  
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  // app.use(cors());
  app.use(logger('dev'))
  app.post('/polls', postPoll)
  app.get('/polls', getAllPolls)
  app.post('/pollID', getPollbyID)
  app.post('/ranking', postRanking)
  app.patch('/polls', addOption)
  app.use(express.static(path.join(__dirname, '../public'), { redirect: false }))
  app.use('*', express.static(path.join(__dirname, '../public'), { redirect: true }))
  return app
}

let app = buildExpressApp()
let server = http.createServer(app)
let port = process.env.PORT || 3333

server.listen(port, function () {
  console.log(chalk.bgYellow.black(` Server listening on port ${chalk.bold.blue(port)} inside the container`));
  console.log(` To access server, use http://localhost:${port}`)
})