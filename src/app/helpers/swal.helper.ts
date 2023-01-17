import Swal from 'sweetalert2';

const mixinOptions = {
  customClass: {
    confirmButton: 'btn btn-success m-3',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
}

export enum typeIcon {
  success = 'success',
  warning = 'warning',
  info = 'info',
  question = 'question',
  error = 'error',
}

export const MODAL = {
  swalClient: (text: string, title: string, icon: typeIcon): void => {
    Swal
      .mixin(mixinOptions)
      .fire({
      title: `${title}`,
      text: text,
      icon: icon,
      confirmButtonText: 'Aceptar'
    });
  },
  swalConfirm: (question: string, text: string, icon: typeIcon) => {
    return Swal
      .mixin(mixinOptions)
      .fire({
        title: question,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      });
  }
}
