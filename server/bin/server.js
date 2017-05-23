const {createServer} = require('..')
const PORT = process.env.PORT || 3000

createServer().listen(PORT, () => console.log(`Now running on ${PORT}.`))
