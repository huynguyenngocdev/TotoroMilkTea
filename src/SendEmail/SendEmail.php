<?php

use PHPMailer\PHPMailer\PHPMailer;

class SendEmail
{
    public function SendEmail($newUser)
    {
        require_once 'MVC/phpmailer/Exception.php';
        require_once 'MVC/phpmailer/PHPMailer.php';
        require_once 'MVC/phpmailer/SMTP.php';
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'tenlahuy4.0@gmail.com'; // Gmail address which you want to use as SMTP server
            $mail->Password = 'Nagamaru'; // Gmail address Password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = '587';

            $mail->setFrom('NgaHuySmartphone@gmail.com'); // Gmail address which you used as SMTP server
            $mail->addAddress($newUser['email']); // Email address where you want to receive emails (you can use any of your gmail address including the gmail address which you used as SMTP server)

            $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
            $verification = substr(str_shuffle($permitted_chars), 0, 6);

            $mail->isHTML(true);
            $mail->Subject = 'Email Vertification Password';

            $mail->Body =
                "<div>
                <p><h1>Nga Huy Smartphone</h1></p>
                <p><h2>Email xác thực Tài Khoản</h2></p>
                <p>Bạn đã đăng ký tài khoản với các thông tin:</p>
                <p>-Họ và tên:" . $newUser['name'] . "</p>
                <p>-Tên đăng nhập:" . $newUser['username'] . "</p>
                <p>-Email:" . $newUser['email'] . "</p>
                <p>-Số điện thoại:" . $newUser['phonenumber'] . "</p>
                <p>-Địa chỉ: " . $newUser['address'] . "</p>
                <p>Vui lòng nhập mã xác thực bên dưới để hoàn tất đăng ký</p>
                <p>Mã xác thực: $verification</p>
                </div>";

            $mail->send();
            return $verification;
        } catch (Exception $e) {
            $alert = '<p>' . $e->getMessage() . '</p>';
        }
    }
    
    public function SendEmailReceiveInfor($emailUser)
    {
        require_once 'MVC/phpmailer/Exception.php';
        require_once 'MVC/phpmailer/PHPMailer.php';
        require_once 'MVC/phpmailer/SMTP.php';
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'tenlahuy4.0@gmail.com'; // Gmail address which you want to use as SMTP server
            $mail->Password = 'Nagamaru'; // Gmail address Password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = '587';
            $mail->setFrom('tenlahuy4.0@gmail.com'); // Gmail address which you used as SMTP server
            $mail->addAddress($emailUser); // Email address where you want to receive emails (you can use any of your gmail address including the gmail address which you used as SMTP server)
            $mail->isHTML(true);
            $mail->Subject = 'Email Register to Receice new Information';

            $mail->Body =
                "<div>
                <p><h1>Nga Huy Smartphone</h1></p>
                <p><h2>Email Đăng ký nhận thông tin mới nhất</h2></p>
                <p> Cảm ơn bạn đã đăng ký nhận các thông tin mới nhất của shop.</p>
                <p>Chúng tôi sẽ gửi đến bạn những thông tin mới nhất vào địa chỉ: </p>
                <p>" .$emailUser . "</p>
                </div>";

            $mail->send();
            echo "<script>alert('  Đăng ký nhận email thành công với địa chỉ email:\n $emailUser')
            window.location.assign('http://huysmartphone.xyz')</script>";
        } catch (Exception $e) {
            $alert = '<p>' . $e->getMessage() . '</p>';
        }
    }
    public function SendEmailPayment($emailUser)
    {
        require_once 'MVC/phpmailer/Exception.php';
        require_once 'MVC/phpmailer/PHPMailer.php';
        require_once 'MVC/phpmailer/SMTP.php';
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'tenlahuy4.0@gmail.com'; // Gmail address which you want to use as SMTP server
            $mail->Password = 'Nagamaru'; // Gmail address Password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = '587';
            $mail->setFrom('tenlahuy4.0@gmail.com'); // Gmail address which you used as SMTP server
            $mail->addAddress($emailUser); // Email address where you want to receive emails (you can use any of your gmail address including the gmail address which you used as SMTP server)
            $mail->isHTML(true);
            $mail->Subject = 'Email Infrom Order Product Success';


            
            $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
            $productKey = substr(str_shuffle($permitted_chars), 0, 12);
            
            $mail->Body =
                "<div>
                <p><h1>Totoro Milk Tea</h1></p>
                <p><h2>Cảm ơn bạn đã đặt hàng, hàng của bạn sẽ tới trong 30 phút nữa</h2></p>
                <p> Mã đơn hàng.</p>
                <p>" .$productKey . "</p>
                </div>";

            $mail->send();
            echo "<script>alert('Đặt hàng thành công!')
            window.location.assign('')</script>";
        } catch (Exception $e) {
            $alert = '<p>' . $e->getMessage() . '</p>';
        }
    }
}
