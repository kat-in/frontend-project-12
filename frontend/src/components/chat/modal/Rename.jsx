import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEditChannelMutation, useGetChannelsQuery, channelsApi } from '../../../api/channelsApi'
import { useContext } from 'react'
import { ModalContext } from '../../../contexts/ModalContext'
import { useTranslation } from 'react-i18next'
import ModalContainer from './ModalContainer'
import notify from '../../../utils/notify'
import { useDispatch } from 'react-redux'

const Rename = () => {
  const [editChannel] = useEditChannelMutation()
  const dispatch = useDispatch()
  const { data: channels = [] } = useGetChannelsQuery()
  const { setIsModal, modalData } = useContext(ModalContext)
  const { t } = useTranslation()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { name: modalData.channelName },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('validation.required'))
        .min(3, t('validation.minMax'))
        .max(20, t('validation.minMax'))
        .test(
          'Unique',
          t('modal.isUnique'),
          value => !channels.some(ch => ch.name === value && ch.id !== modalData.channelId),
        ),
    }),
    onSubmit: async (values) => {
      const id = modalData.channelId

      try {
        const newChannel = await editChannel({ name: values.name, id }).unwrap()
        dispatch(
          channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
            const ch = draft.find(c => c.id === id)
            if (ch) ch.name = newChannel.name
          }),
        )
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
