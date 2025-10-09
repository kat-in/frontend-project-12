import { createContext, useState } from 'react';

export const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);
  const [modalMode, setModalMode] = useState('add')
  const modalButtonsData = {
    name: 'Добавить канал',
    submit: 'Отправить',
    cancel: 'Отменить',
  }
const [modalData, setModalData] = useState(modalButtonsData)
  return (
    <ModalContext.Provider value={{ isModal, setIsModal, modalMode, setModalMode, modalData, setModalData }}>
      {children}
    </ModalContext.Provider>
    )
}