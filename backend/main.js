import express from express
import dotenv from dotenv
dotenv.config()
const app = express()
console.log(process.env.PORT)
const port = process.env.PORT | 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})