const {body} = require('express-validator')
const User = require('../models/user')

exports.registerValidators = [
  body('email')
    .isEmail().withMessage('Введите корректный email')
    .custom(async (value, {req}) => {
      try {
        const candidate = await User.findOne({email: value})
        if (candidate) {
          return Promise.reject('Пользователь с таким email уже существует')
        }
      } catch (e) {
        console.log(e)
      }
    })
    .normalizeEmail(),

  body('password', 'Пароль должен быть не меньше 6 символов')
    .isLength({min: 6, max: 50})
    .trim(),

  body('name', 'Имя должно содержать минимум 3 символа')
    .isLength({min: 3})
    .trim(),

  body('confirm')
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error('Пароли не совпадают')
      }
      return true
    })
    .trim()
]

exports.courseValidators = [
  body('title').isLength({min: 3}).withMessage('Минимальная длина названия 3 символа').trim(),
  body('price').isNumeric().withMessage('Введите корректную цену'),
  body('img').isURL().withMessage('Введите корректный URL изображения').trim()
]