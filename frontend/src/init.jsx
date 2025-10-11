import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Provider } from 'react-redux'
import store from './store/store.js'
import App from './App.jsx'
import { io } from 'socket.io-client'
import i18next, { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nextProvider } from 'react-i18next';
import ru from './locales/index.js'


const init = async () => {

    const i18n = i18next.createInstance()

    await i18n
        .use(initReactI18next) // передаем экземпляр i18n в react-i18next, который сделает его доступным для всех компонентов через context API.
        .init({
             resources: { ru },// передаем переводы текстов интерфейса в формате JSON
            fallbackLng: 'ru', // если переводы на языке пользователя недоступны, то будет использоваться язык, указанный в этом поле
            interpolation: {
                escapeValue: false, // экранирование уже есть в React, поэтому отключаем
            },
        });

    const socket = io('http://localhost:5002', {
        path: '/socket.io',       // путь для проксирования
        transports: ['websocket', 'polling'], // обязательно для прокси
    });

    //  const socket = io('wws://chat-rfzu.onrender.com:443', {
    //   path: '/socket.io',       // путь для проксирования
    //   transports: ['websocket', 'polling'], // обязательно для прокси
    // });

    return createRoot(document.getElementById('root')).render(
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <App socket={socket} />
            </Provider>
        </I18nextProvider>
    )
}

export default init

