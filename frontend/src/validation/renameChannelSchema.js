import * as Yup from 'yup'

export default (t, channels, modalData) => Yup.object({
    name: Yup.string()
        .required(t('validation.required'))
        .min(3, t('validation.minMax'))
        .max(20, t('validation.minMax'))
        .test(
            'Unique',
            t('modal.isUnique'),
            value => !channels.some(ch => ch.name === value && ch.id !== modalData.channelId),
        ),
})
