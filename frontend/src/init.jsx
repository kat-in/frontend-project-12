import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Provider } from 'react-redux'
import store from './store/store.js'
import App from './App.jsx'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { I18nextProvider } from 'react-i18next'
import ru from './locales/index.js'
import leoProfanity from 'leo-profanity'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'

const init = async () => {
  const i18n = i18next.createInstance()

  leoProfanity.add(leoProfanity.getDictionary('ru'))

  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
    environment: import.meta.env.VITE_ROLLBAR_ENV,
  }

  await i18n
    .use(initReactI18next) // передаем экземпляр i18n в react-i18next, который сделает его доступным для всех компонентов через context API.
    .init({
      resources: { ru }, // передаем переводы текстов интерфейса в формате JSON
      fallbackLng: 'ru', // если переводы на языке пользователя недоступны, то будет использоваться язык, указанный в этом поле
      interpolation: {
        escapeValue: false, // экранирование уже есть в React, поэтому отключаем
      },
    })

  return createRoot(document.getElementById('root')).render(
    <RollbarProvider config={rollbarConfig}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Provider>
      </I18nextProvider>
    </RollbarProvider>)
}

export default init
