
import { useFormik } from "formik"
import * as Yup from 'yup';
import { useEditChannelMutation } from "../../../api/channelsApi";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { ModalContext } from "../../../contexts/ModalContext";
import Modal from "./Modal";

const Rename = () => {
    const [editChannel] = useEditChannelMutation()
    const channels = useSelector(state => state.allChannels)
    const {  setIsModal,  modalData } = useContext(ModalContext)


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { name: modalData.channelName },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Обязательное поле')
                .min(3, 'От 3 до 20 символов')
                .max(20, 'От 3 до 20 символов')
                .test(
                    'Уникальность',
                    'Такое имя уже существует',
                    (value) => !channels.some(ch => ch.name === value && ch.id !== modalData.channelId)
                ),
        }),
        onSubmit: async (values) => {
            const id = modalData.channelId
            try {
                const response = await editChannel({ name: values.name, id }).unwrap();
                formik.resetForm();
                setIsModal(false)
            }
            catch (err) {
                console.log(err)
            }
        }
    })

    return <Modal formik={formik} />

}

export default Rename