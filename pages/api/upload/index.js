import nc from 'next-connect'
import multer from 'multer'

export const config = {
  api: {
    bodyParser: false
  }
}

const handler = nc()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

const uploadFile = upload.single('file')
handler.use(uploadFile)
handler.post((req, res) => {
  console.log('req', req.file)
  if (!req.file) {
    res.status(400).json({ error: 'File not found' })
  }
  res.status(200).json({ message: 'File uploaded successfully' })
})

export default handler
