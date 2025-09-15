"use client";

import CustomModal from "@/components/common/modal";
import RegistrationForm from "@/forms/registration.form";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: IProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Создать аккаунт">
      <RegistrationForm onClose={onClose}></RegistrationForm>
    </CustomModal>
  )
}

export default RegistrationModal