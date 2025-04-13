import { Modal } from "@mui/material";


export const PopupModal = (props) => {
  const { children, openModal, onCloseModal, darkerOpacity } = props;
  return (
    <Modal
      open={openModal}
      onClose={onCloseModal}
      disableEscapeKeyDown // Disable closing the modal with the Escape key
      disableAutoFocus={true}
      sx={{ backgroundColor: darkerOpacity ? "rgba(0, 0, 0, 0.6)" : "", touchAction: "manipulation" }}
    >
      <div>
        {children}
      </div>
    </Modal>
    
  );
};
