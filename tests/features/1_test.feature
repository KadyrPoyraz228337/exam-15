#language:ru

Функционал: Монипуляции пользователями
  Как администратор
  Я хочу иметь возможность удалять, редактировать и добавлять пользователей

@login
Сценарий:
Допустим я нахожусь на странице логина
Если я заполняю поля формы:
| username | 123   |
| password | 12345 |
И нажимаю на кнопку "#login"
То я вижу текст "Login successful!"