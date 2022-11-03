
import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: (req, file, cb) =>{ cb(null, getFileName(file))},
  }),
});

const getFileName = (file: any) => { 
  const filename = file.originalname;
  return filename.replace('.', Math.floor(Math.random() * 1000000) + ".");
};

const apiRoute = nextConnect({
  onError(error: any, req: any, res: any) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('uploadfile'));

apiRoute.post((req, res) => {
  console.log(req.file);
  res.status(200).json("uploads/" + req.file.originalname); 
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};