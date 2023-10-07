let last_sign_time = new Date('2023-10-06 02:17:32')

console.log(last_sign_time)
console.log(last_sign_time.toUTCString())
console.log(last_sign_time.toLocaleString())

let now_sign_time = new Date()

console.log(now_sign_time)
console.log(now_sign_time.toUTCString())
console.log(now_sign_time.toLocaleString())




let timestamp_1 = Date.parse(last_sign_time)
let timestamp_2 = Date.parse(now_sign_time)

console.log()

if (
    (timestamp_2 - timestamp_1) > (24 * 60 * 60 * 1000)
    ) {

        console.log(`距上次签到时间大于24小时啦,可签到(上次签到时间:${last_sign_time})(本次触发时间:${now_sign_time})`)
    
} else {    

    console.log(`---还未到时间！(上次签到时间:${last_sign_time})(本次触发时间:${now_sign_time})`)

}
