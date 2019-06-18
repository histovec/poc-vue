const server = require('restana/libs/turbo-http')
const service = require('restana')({
  server
})

const config = {
  apiPath: process.env.UTAC_API,
  latency: process.env.UTAC_LATENCY || 300,
  port: process.env.UTAC_PORT || 9000
}

const ct = require('./utac_sample.json')

const nb = ct.length

function getCT() {
  let response = ct[Math.floor(Math.random() * (nb + 1))]
  return response
}

function erlangWait() {
  // Erelang generated response time with lambda = 1 and k = 5
  return - ( config.latency / 4 ) * Math.log(Math.random() * Math.random() * Math.random() * Math.random() * Math.random())
}

async function latencyResSend(res, response, time) {
  return await setTimeout(function(){
    res.send(response);
  }, erlangWait() );
}

service.post(`/${config.apiPath}`, async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  await latencyResSend(res, getCT());
})

service.start(config.port)