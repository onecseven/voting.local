import express from "express"
import bodyParser from "body-parser"
import logger from "morgan"
import path from "path"
import chalk from "chalk"
import http from "http"

function buildExpressApp() {
  let app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(logger('dev'))
  app.use('/', express.static(path.join(".", 'public'), { redirect: false }))
  app.get('*', (rqe, res) => res.sendFile(path.resolve(path.join(__dirname, 'public/index.html'))))
  return app
}

let app = buildExpressApp()
let server = http.createServer(app)
let port = process.env.PORT || 3333

server.listen(port, function () {
  console.log(chalk.bgYellow.black(` Server listening on port ${chalk.bold.blue(port)} inside the container`));
  console.log(` To access server, use http://localhost:${port}`)
})