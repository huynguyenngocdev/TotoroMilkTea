import { Email, Item, Span, renderEmail } from "react-html-email";

const SendEmail = (to_email, message) => {
  const message_html = renderEmail(
    <Email title="Thư gửi từ Totoro Milk Tea Shop">
      <Item align="center">
        <Span fontSize={20}>{message}</Span>
      </Item>
    </Email>
  );
  const variables = {
    message_html: message_html,
    to_email: to_email,
  };
  //params: email_serviceId, templateId,variables(have in template Email)
  return window.emailjs.send("shop_email", "totoro_email", variables);
};

export default SendEmail;
