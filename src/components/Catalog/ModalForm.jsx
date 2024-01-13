import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import "./modalForm.css";

// eslint-disable-next-line react/display-name
const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalForm = ({ open, handleModalClose, form }) => {
  const Form = form; //instantiating the form prop as a React component
  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleModalClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <Form handleModalClose={handleModalClose} />
      </Modal>
    </div>
  );
};

export default ModalForm;
