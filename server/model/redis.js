const redis = require('redis')
const url = require('url')
const {promisify} = require('util')

const redisURL = url.parse('redis://rediscloud:a9QUXtctsZZRegwyIh3LI3qcjVxry2PQ@redis-13293.c16.us-east-1-3.ec2.cloud.redislabs.com:13293')
const client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true})
client.auth(redisURL.auth.split(':')[1])

client.on('connect', function () {
  console.log('connected Redis')
})

const hmset = promisify(client.hmset).bind(client)
const hget = promisify(client.hget).bind(client)
const lpush = promisify(client.lpush).bind(client)
const lrange = promisify(client.lrange).bind(client)
const lset = promisify(client.lset).bind(client)
const sadd = promisify(client.sadd).bind(client)
const smembers = promisify(client.smembers).bind(client)
const lpop = promisify(client.lpop).bind(client)

module.exports = {
  hmset, hget, lpush, lrange, lset, sadd, smembers, lpop, client
}
