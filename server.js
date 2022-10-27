const app = require('./src/app')
const PORT = process.env.PORT || 3001

app.get('/', (req, res) =>
  res.status(200).json({ success: true, message: 'hello world' })
)

app.listen(PORT, () =>
  console.log(`🚀 Server listen and running on port: ${PORT}`)
)
