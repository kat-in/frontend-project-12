import cn from "classnames"
import { useTranslation } from "react-i18next"
import { useContext } from "react"
import { ChannelContext } from '../../../contexts/ChannelContext'
import { ModalContext } from '../../../contexts/ModalContext'


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

    const isDropdownOpen = (id) => id === activeDropdownId
    const isOpen = isDropdownOpen(channel.id)



    return (
        <div x-placement="bottom-start" id={channel.id} className={cn('dropdown-menu', { show: isOpen })} style={{ position: 'absolute', inset: '0px auto auto 0px', transform: 'translate3d(51px, 40px, 0px)' }}>
            <button onClick={handlerRemoveChannel} className="dropdown-item" role="button" tabIndex="0" href="#">{t('chat.remove')}</button>
            <button onClick={handlerRenameChannel} name={channel.name} className="dropdown-item" tabIndex="0">{t('chat.rename')}</button>
        </div>
    )
}


export default DropdownMenu