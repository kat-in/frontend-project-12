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
            controlChannel: 'Управление каналом'
        },
        modal: {
            
        }



        //     validation: {
        //       yup: {
        //         mixed: {
        //           default: 'Некорректное значение',
        //           notOneOf: 'RSS уже существует',
        //           required: 'Не должно быть пустым',
        //         },
        //         string: {
        //           url: 'Ссылка должна быть валидным URL',
        //         },
        //       },
        //       networkError: 'Ошибка сети',
        //       invalidRss: 'Ресурс не содержит валидный RSS',
        //       success: 'RSS успешно загружен',
        //     },
    },
}
