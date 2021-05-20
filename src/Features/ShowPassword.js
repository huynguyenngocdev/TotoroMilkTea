import $ from "jquery";
const showPassword = (elementId,idIcon) => {
    if ($(`#${elementId}`).attr("type") === "text") {
      $(`#${elementId}`).attr("type", "password");
      $(`#${idIcon}`).addClass("fa-eye-slash");
      $(`#${idIcon}`).removeClass("fa-eye");
    } else if ($(`#${elementId}`).attr("type") === "password") {
      $(`#${elementId}`).attr("type", "text");
      $(`#${idIcon}`).removeClass("fa-eye-slash");
      $(`#${idIcon}`).addClass("fa-eye");
    }
  };
export default showPassword;