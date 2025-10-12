import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const goToHome = () => {
    navigate('/')
  }
  return (
    <>
      <div className="container">
        <div className="col p-4 justify-content-center m-auto align-tems-center">
          <h3 className="text-center">{t('errors.notFound')}</h3>
          <p className="text-center">
            {t('errors.youCanGo')}
            {' '}
            <a onClick={goToHome} href="">
              {' '}
              {t('errors.onHomePage')}
            </a>
          </p>
        </div>

      </div>

    </>
  )
}

export default NotFound
