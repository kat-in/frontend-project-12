
import { useFormik } from "formik"
import * as Yup from 'yup';
import { useAddChannelMutation } from "../../../api/channelsApi";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { ModalContext } from "../../../contexts/ModalContext";
import { ChannelContext } from "../../../contexts/ChannelContext";
import Modal from './Modal'


const Add = () => {
    const [addChannel] = useAddChannelMutation()
    const { setIsModal } = useContext(ModalContext)
    const channels = useSelector(state => state.allChannels)
    const { setActiveChannelId } = useContext(ChannelContext)


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { name: '' },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Обязательное поле')
                .min(3, 'От 3 до 20 символов')
                .max(20, 'От 3 до 20 символов')
                .test(
                    'Уникальность',
                    'Такое имя уже существует',
                    (value) => !channels.some(ch => ch.name === value)
                ),
        }),
        onSubmit: async (values) => {
            try {
                const response = await addChannel(values).unwrap();
                formik.resetForm();
                setIsModal(false)
                setActiveChannelId(response.id)
            }
            catch (err) {
                console.log(err)
            }
        }
    })

    return <Modal formik={formik} />

}

export default Add