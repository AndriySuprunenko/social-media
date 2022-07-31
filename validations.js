import { body } from 'express-validator';

export const loginValidation = [
  body('email', ' Неправильний формат пошти').isEmail(),
  body('password', 'Пароль повинен бути більше 5 символів').isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body('email', ' Неправильний формат пошти').isEmail(),
  body('password', 'Пароль повинен бути більше 5 символів').isLength({
    min: 5,
  }),
  body('fullName', 'Вкажіть імя').isLength({ min: 2 }),
  body('avatarUrl', 'Неправильна силка на аватарку').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Введіть заголовок').isLength({ man: 3 }).isString(),
  body('text', 'Введіть текст').isLength({ man: 10 }).isString(),
  body('tags', 'Неправельний формат(введіть масив)').optional().isString(),
  body('imageUrl', 'Невірна силка на зображення').optional().isString(),
];
