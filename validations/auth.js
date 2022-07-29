import { body } from 'express-validator';

export const registerValidation = [
  body('email', ' Неправильний формат пошти').isEmail(),
  body('password', 'Пароль повинен бути більше 5 символів').isLength({ min: 5 }),
  body('fullName', 'Вкажіть імя').isLength({ min: 2 }),
  body('avatarUrl', 'Неправильна силка на аватарку').optional().isURL(),
];
