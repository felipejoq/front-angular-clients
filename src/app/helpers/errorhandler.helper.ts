import {ErrorHandler} from "@angular/core";
import {MODAL, typeIcon} from "./swal.helper";

export const handleError = (e: any, message?: any): void => {
  let template: any;

  if (e.status === 400 && e.error.errors) {
    const divElement = document.createElement("div");
    const ulElement = document.createElement("ul");

    e.error.errors.forEach(
      (err: string) => {
        ulElement.append(`<h6 class="list-group-item"><span class="badge bg-danger">${err}</span></h6>`)
      }
    );

    divElement.append(ulElement);

    template = divElement.innerText;
  }

  if(e.status == 401 || e.status == 403) {
    return;
  }

  if (!e.error.errors) {
    message = `${e.error.message} ${e.error.error}`;
  }

  MODAL.swalError(
    "Oops! algo salió mal.",
    message,
    typeIcon.ERROR,
    e.error.errors ? template : message,
  );
}

