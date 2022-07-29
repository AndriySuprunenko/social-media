import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Mongodb
mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.cxibak0.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

// підключили express
const app = express();

// читає json формат
app.use(express.json());

app.post('/auth/register', (reg, res) => {
  
});

// порт серверу
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server work');
});
