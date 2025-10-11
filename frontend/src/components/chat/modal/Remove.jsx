
import { useFormik } from "formik"
import { useRemoveChannelMutation } from "../../../api/channelsApi";
import { useContext } from "react";
import { ModalContext } from "../../../contexts/ModalContext";
import { ChannelContext } from "../../../contexts/ChannelContext";
import Modal from "./Modal";

const Remove = () => {
    const [removeChannel] = useRemoveChannelMutation()

    const { setIsModal, modalData } = useContext(ModalContext)
    const { setActiveChannelId } = useContext(ChannelContext)

    const formik = useFormik({
        initialValues: { name: ''},
        onSubmit: async () => {
            const id = modalData.channelId
            try {
                const response = await removeChannel(id).unwrap()
                formik.resetForm()
                setActiveChannelId('1')
                setIsModal(false)
            }
            catch (err) {
                console.log(err)
            }
        }
    })

    return <Modal formik={formik} />
}

export default Remove