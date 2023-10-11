const fs = require('fs')  
const path = require('path')  


const dir = path.resolve(__dirname, './', 'test.txt')

console.log(dir)



fs.writeFileSync(dir,'123123123')
