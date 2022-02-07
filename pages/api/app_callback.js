import initAuth from '../../lib/firebase/initAuth'
import Cors from 'cors'
import initMiddleware from '../../lib/initMiddleware'

initAuth()

const cors = initMiddleware(
  Cors({
    origin: '*',
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

const handler = async (req, res) => {
  console.log(req.body)
  await cors(req, res)

  return res.status(200).json({ message: 'success' })
}

export default handler
