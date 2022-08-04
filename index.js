import express, { request } from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import checkAuth from './utils/checkAuth.js';
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

// Mongodb
mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.cxibak0.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

// підключили express
const app = express();

// Створюємо сховище
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// читає json формат
app.use(express.json());

// Authorisation
app.post('/auth/login', loginValidation, UserController.login);
// Registration
app.post('/auth/register', registerValidation, UserController.register);
// Перевірка що ми можемо отримати інформацію про себе
app.get('/auth/me', checkAuth, UserController.getMe);

// Завантаження зображень
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// Posts
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);

// порт серверу
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server work');
});
