const keys = require('../keys')

module.exports = function(email, token) {
  return {
      to: email,
      from: keys.EMAIL_FROM,
      subject: 'Восстановление пароля',
      html: `
        <h1>Вами был запрошен сброс пароля</h1>
        <p>Если вы не совершали этого действия, проигнорируйте данное письмо</p>  
        <p>Иначе перейдите по ссылку ниже:</p>
        <p><a href="${keys.BASE_URL}/auth/password/${token}">Восстановить пароль</a></p>
        <hr />
        <a href="${keys.BASE_URL}">Магазин курсов</a>
      `
    }
}