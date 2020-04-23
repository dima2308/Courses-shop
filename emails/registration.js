const keys = require('../keys')

module.exports = function(email) {
  return {
      to: email,
      from: keys.EMAIL_FROM,
      subject: 'Аккаунт был успешно создан',
      html: `
        <h1>Рады видеть вас в нашем магазине!</h1>
        <p>Вы успешно зарегистрировались</p>  
        <hr />
        <a href="${keys.BASE_URL}">Магазин курсов</a>
      `
    }
}