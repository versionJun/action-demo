const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai')


console.log(dayjs.tz.guess())

const d = '2023-11-21T16:57:01.338+00:00'
console.log(`${dayjs(d).format('YYYY-MM-DD HH:mm:ss')}`)
console.log(`${dayjs.tz(d).format('YYYY-MM-DD HH:mm:ss')}`)
console.log(`${dayjs.tz(dayjs(d)).format('YYYY-MM-DD HH:mm:ss')}`)
