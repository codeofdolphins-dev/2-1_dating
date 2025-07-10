// src/hooks/useAlert.js
import Swal from 'sweetalert2';

const UseAlert = () => {
  const showAlert = ({
    title = 'Alert',
    text = '',
    icon = 'info', // 'success', 'error', 'warning', 'info', 'question'
    confirmButtonText = 'OK',
    onConfirm = null,
  }) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
    }).then((result) => {
      if (result.isConfirmed && typeof onConfirm === 'function') {
        onConfirm();
      }
    });
  };

  return { showAlert };
};

export default UseAlert;
