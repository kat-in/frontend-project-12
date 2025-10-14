import { useFormik } from 'formik'
import { useRemoveChannelMutation } from '../../../api/channelsApi'
import { useContext } from 'react'
import { ModalContext } from '../../../contexts/ModalContext'
import { ChannelContext } from '../../../contexts/ChannelContext'
import { useTranslation } from 'react-i18next'
import ModalContainer from './ModalContainer'
import notify from '../../../utils/notify'

const Remove = () => {
  const [removeChannel] = useRemoveChannelMutation()
  const { t } = useTranslation()

  const { setIsModal, modalData } = useContext(ModalContext)
  const { setActiveChannelId } = useContext(ChannelContext)

  const handleSubmitRemove = async () => {
    const id = modalData.channelId
    try {
      await removeChannel(id).unwrap()
      formik.resetForm()
      setActiveChannelId('1')
      setIsModal(false)
      notify(t('toast.removeChannel'), 'success')
    }
    catch (err) {
      notify(err, 'error')
    }
  }

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: handleSubmitRemove,
  })

  return <ModalContainer formik={formik} />
}

export default Remove
