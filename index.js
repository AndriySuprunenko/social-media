import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';
import UserModel from './models/User.js';

// Mongodb
mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.cxibak0.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

// підключили express
const app = express();

// читає json формат
app.use(express.json());

// Authorisation
app.post('/auth/login', async (req, res) => {
  try {

  } catch (err) {}
});

// Registration
app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt); //шифруєм пароль

    const doc = new UserModel({
      email: req.body.email,
      passwordHash: hash,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
    });

    // генеруємо токен з id користувача та ставимо час його дії 14 днів
    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'oskar5647',
      {
        expiresIn: '14d',
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалось зареєструватись',
    });
  }
});

// порт серверу
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server work');
});
