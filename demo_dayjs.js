const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)


// let d1 = dayjs.tz("2023-10-06 02:17:32",  "YYYY-MMMM-DD HH:mm:ss", "Asia/Shanghai") 

// console.log(d1)

// console.log(dayjs.tz.guess())

let d = dayjs()

console.log(dayjs.tz.guess())

console.log(d.format())
console.log(dayjs.utc(d).format())

let tz = 'America/Shanghai'
dayjs.tz.setDefault(tz)
console.log(tz)

console.log(dayjs.tz(d).format())
console.log(dayjs.tz(d).utc().format())
