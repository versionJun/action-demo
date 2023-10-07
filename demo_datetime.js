let last_sign_time = new Date('2023-10-06 02:17:32')

console.log(last_sign_time)
console.log(last_sign_time.toUTCString())
console.log(last_sign_time.toLocaleString())

let now_sign_time = new Date(new Date().getTime() + 28800000)


console.log(now_sign_time)
console.log(now_sign_time.toUTCString())
console.log(now_sign_time.toLocaleString())




console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
console.log(new Date().getTimezoneOffset() / 60)
