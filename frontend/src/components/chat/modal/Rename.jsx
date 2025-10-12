import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEditChannelMutation } from '../../../api/channelsApi'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { ModalContext } from '../../../contexts/ModalContext'
import { useTranslation } from 'react-i18next'
import ModalContainer from './ModalContainer'
import notify from '../../../utils/notify'

const Rename = () => {
  const [editChannel] = useEditChannelMutation()
  const channels = useSelector(state => state.allChannels)
  const { setIsModal, modalData } = useContext(ModalContext)
  const { t } = useTranslation()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { name: modalData.channelName },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('validation.required'))
        .min(3, t('validation.min', { count: 3 }))
        .max(20, t('validation.max', { count: 20 }))
        .test(
          'Unique',
          t('modal.isUnique'),
          value => !channels.some(ch => ch.name === value && ch.id !== modalData.channelId)
        ),
    }),
    onSubmit: async (values) => {
      const id = modalData.channelId
      try {
        await editChannel({ name: values.name, id }).unwrap()
        formik.resetForm()
        setIsModal(false)
        notify(t('toast.renameChannel'), 'success')
      }
      catch (err) {
        notify(err, 'error')
      }
    },
  })

  return <ModalContainer formik={formik} />
}

export default Rename
