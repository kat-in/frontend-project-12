import cn from 'classnames'
import { ChannelContext } from '../contexts/ChannelContext'
import { ModalContext } from '../contexts/ModalContext'
import { useContext, useState } from 'react'


const ChannelButton = ({ channel }) => {

    const { activeChannelId, setActiveChannelId } = useContext(ChannelContext)
    const { setModalMode, ModalMode, setIsModal, isModal, modalData, setModalData } = useContext(ModalContext)
    const [isOpen, setIsOpen] = useState(false)

    const channelClassList = (id, removable) => {
        return cn('w-100', 'rounded-0', 'text-start', 'btn',
            {
                'btn-secondary': id === activeChannelId,
                'dropdown-toggle': removable,
                'dropdown-toggle-split': removable,
            },
        )
    }

    const channelRemovableClassList = (id) => {
        return cn('w-100', 'rounded-0', 'text-start', 'btn', 'text-truncate',
            { 'btn-secondary': id === activeChannelId },
        )
    }

    const buttonRemovableClassList = (id, removable) => {
        return cn('flex-grow-0', 'btn',
            {
                'btn-secondary': id === activeChannelId,
                'dropdown-toggle': removable,
                'dropdown-toggle-split': removable,
            },
        )
    }


    const handleActiveChannel = (e) => {
        setActiveChannelId(e.target.id)
        setIsOpenId(false)
    }

    const toggleDropdown = (e) => {
        setIsOpen(!isOpen)
    }

    const handlerRemoveChannel = (e) => {
        setModalMode('remove')
        setModalData({
            name: 'Удалить канал',
            submit: 'Удалить',
            cancel: 'Отменить',
            channelId: e.target.parentElement.id

        })
        setIsModal(true)
    }

     const handlerRenameChannel = () => {
        setModalMode('rename')
        setModalData({
            name: 'Переименовать канал',
            submit: 'Удалить',
            cancel: 'Отправить',
        })
        setIsModal(true)
    }

    const dropdownClassList = (isOpen) => cn('dropdown-menu', { show: isOpen })

    const dropdownChannelMenu = (
        <div x-placement="bottom-start" id={channel.id} className={dropdownClassList(isOpen)} data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-start" style={{ position: 'absolute', inset: '0px auto auto 0px', transform: 'translate3d(51px, 40px, 0px)' }}>
            <a onClick={handlerRemoveChannel} className="dropdown-item" role="button" tabIndex="0" href="#">Удалить</a>
            <a onClick={handlerRenameChannel} className="dropdown-item" role="button" tabIndex="0" href="#">Переименовать</a>
        </div>
    )




    const removableChannel = (channel) => (
        <div role="group" className="d-flex dropdown btn-group">
            <button onClick={handleActiveChannel} type="button" id={channel.id} className={channelRemovableClassList(channel.id)}>
                <span className="me-1">#</span>{channel.name}</button>
            <button onClick={toggleDropdown} type="button" id={channel.id} aria-expanded="false" className={buttonRemovableClassList(channel.id, channel.removable)}>
                <span className="visually-hidden">Управление каналом</span>
            </button>
            {dropdownChannelMenu}
        </div>
    )


    const customChannel = (channel) => (
        <button onClick={handleActiveChannel} type="button" id={channel.id} className={channelClassList(channel.id, channel.removable)}>
            <span className="me-1">#</span>
            {channel.name}
        </button>
    )

    const isRemovable = channel.removable

    return (isRemovable ? removableChannel(channel) : customChannel(channel))
}

export default ChannelButton