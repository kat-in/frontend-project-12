import { removeChannel } from "../store/slices/channelsSlice";

export default {
    translation: {
        auth: {
            logIn: 'Войти',
            password: 'Пароль',
            yourNikname: 'Ваш ник',
            confirmPassword: 'Подтвердите пароль',
            username: 'Имя пользователя',
            signUp: 'Зарегистрироваться',
            logOut: 'Выйти',
            registration: 'Регистрация',
            dontHaveAccout: 'Нет аккаунта?'
        },
        chat: {
            channels: 'Каналы',
            remove: 'Удалить',
            removeChannel: 'Удалить канал',
            rename: 'Переименовать',
            renameChannel: 'Переименовать канал',
            message: '{{count}} сообщение',
            message_one: '{{count}} сообщение',
            message_few: '{{count}} сообщения',
            message_many: '{{count}} сообщений',
            inputMessage: 'Введите сообщение...',
            cancel: 'Отменить',
            submit: 'Отправить',
            areYouShure: 'Уверены?',
            controlChannel: 'Управление каналом',
            channelName: 'Имя канала',
        },
        modal: {
            isUnique: 'Такое имя уже существует'

        },
        validation: {
            default: 'Некорректное значение',
            min: "Минимум {{count}} символа",
            max: "Максимум {{count}} символов",
            required: 'Обязательное поле',
        },
        errors: {
            Unauthorized: 'Неверные имя пользователя или пароль',
            notFound: "Не найдено",
            serverError: "Ошибка сервера",
            unknown: "Произошла неизвестная ошибка",
        }
    },
}
