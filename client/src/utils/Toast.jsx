import Swal from "sweetalert2";

export const SuccessToast = (message) =>{
    console.log("message",message);
    Swal.fire({
        title: "Success!",
        text: message,
        icon: "success"
      });
}

export const ErrorToast = (message) =>{
    console.log("message",message);
    Swal.fire({
        icon: "error",
        title: "Oops...?",
        text: message,  
      });
}
export const WarningToast = (message) =>{
    console.log("message",message);
    Swal.fire({
        title: "Opps...?",
        text: message,
        icon: "question"
      });
}