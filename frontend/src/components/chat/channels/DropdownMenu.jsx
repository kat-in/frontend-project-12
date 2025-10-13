import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { ChannelContext } from '../../../contexts/ChannelContext'
import { ModalContext } from '../../../contexts/ModalContext'
import Dropdown from 'react-bootstrap/Dropdown'

const DropdownMenu = ({ channel }) => {
  const { t } = useTranslation()
  const { activeDropdownId, setActiveDropdownId } = useContext(ChannelContext)
  const { setModalMode, setIsModal, setModalData } = useContext(ModalContext)

  const handlerRemoveChannel = (e) => {
    setModalMode('remove')
    setModalData({
      name: t('chat.removeChannel'),
      submit: t('chat.remove'),
      cancel: t('chat.cancel'),
      channelName: e.target.name,
      channelId: e.target.parentElement.id,
    })
    setIsModal(true)
  }

  const handlerRenameChannel = (e) => {
    setModalMode('rename')
    setModalData({
      name: t('chat.renameChannel'),
      submit: t('chat.submit'),
      cancel: t('chat.cancel'),
      channelName: e.target.name,
      channelId: e.target.parentElement.id,
    })
    setIsModal(true)
    setActiveDropdownId(null)
  }

  const isDropdownOpen = id => id === activeDropdownId
  const isOpen = isDropdownOpen(channel.id)

  return (
    <Dropdown.Menu show={isOpen} id={channel.id}>
     <span className="visually-hidden">{t('chat.controlChannel')}</span>
      <Dropdown.Item onClick={handlerRemoveChannel}>
        {t('chat.remove')}
      </Dropdown.Item>
      <Dropdown.Item onClick={handlerRenameChannel} name={channel.name}>
        {t('chat.rename')}
      </Dropdown.Item>
    </Dropdown.Menu>
  )
}

export default DropdownMenu
