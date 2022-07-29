import express from 'express';
import jwt from 'jsonwebtoken';
// підключили express
const app = express();

// читає json формат
app.use(express.json());

// повернули щось
app.get('/', (reg, res) => {
  res.send('Hello World!');
});

// перевірка логіну
app.post('/auth/login', (reg, res) => {
  console.log(reg.body);
  // генерація токену
  const token = jwt.sign(
    {
      email: reg.body.email,
      fullName: 'Suprunenko Andrii',
    },
    'kukuoskar12345',
  );
  res.json({
    success: true,
    token,
  });
});

// порт серверу
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server work');
});
