import Swal from 'sweetalert2';

const mixinOptions = {
  customClass: {
    confirmButton: 'btn btn-success m-3',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
}

export enum typeIcon {
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  QUESTION = 'question',
  ERROR = 'error',
}

export const MODAL = {
  swalGeneric: (text: string, title: string, icon: typeIcon) => {
    return Swal
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
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      });
  },
  swalError: (title: string, text: string, icon: typeIcon, html?: any,) => {
    return Swal
      .mixin(mixinOptions)
      .fire({
        title: title,
        text: text,
        icon: icon,
        html: html,
        confirmButtonText: 'Aceptar',
      });
  }
}
