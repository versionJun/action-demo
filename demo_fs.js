const fs = require('fs')  
const path = require('path')  


// const dir = path.resolve(__dirname, './', 'test.txt')
const dir = path.resolve(__dirname, './temp', 'test.txt')

console.log(dir)



fs.writeFileSync(dir,`test_${Math.random()}`)
