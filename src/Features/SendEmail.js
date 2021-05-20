const SendEmail = (to_email, message) => {
  const variables = {
    message: message,
    to_email: to_email,
  };
  //params: email_serviceId, templateId,variables(have in template Email)
  return window.emailjs.send("shop_email", "totoro_email", variables);
};

export default SendEmail;