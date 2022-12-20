import React from 'react'
import { Modal } from 'antd'
import api from "../../../apis/apiAdmin";
import { useQuery, useMutation, useQueryClient } from 'react-query'
const ModalCustom = ({ isModalOpen, onOk, onCancel, adminId }) => {
    const { isLoading, isError, data, error } = useQuery(['admin', adminId], () => api.fetchGetAdminItem(adminId))
    console.log(data)
    return (
        <Modal title="Basic Modal" visible={isModalOpen} onOk={onOk} onCancel={onCancel}>

        </Modal>
    )
}

export default ModalCustom