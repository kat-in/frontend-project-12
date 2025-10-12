import { createContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const ModalContext = createContext({})

export const ModalProvider = ({ children }) => {
  const { t } = useTranslation()
  const [isModal, setIsModal] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const modalButtonsData = {
    name: t('chat.addChannel'),
    submit: t('chat.submit'),
    cancel: t('chat.cancel'),
  }

  const [modalData, setModalData] = useState(modalButtonsData)
  return (
    <ModalContext.Provider value={{ isModal, setIsModal, modalMode, setModalMode, modalData, setModalData, isButtonDisabled, setIsButtonDisabled }}>
      {children}
    </ModalContext.Provider>
  )
}
