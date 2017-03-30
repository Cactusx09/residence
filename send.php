<?php
$name1 = $_POST['usr_name'];
$phone1 = $_POST['usr_phone'];
// $email1 = $_POST['email'];
// $comment1 = $_POST['comment'];
// $formname1 = $_POST['formname'];

$date = date("H:i:s m.d.y");

// **********************************************

if (empty($_POST['js'])) {
    if (strlen($name1) > 0) {
        $mes = "Форма: $formname1 \n";
    }

    if (strlen($name1) > 0) {
        $mes.= "Имя: $name1 \n";
    }

    if (strlen($phone1) > 0) {
        $mes.= "Телефон: $phone1 \n";
    }

    if (strlen($email1) > 0) {
        $mes.= "E-mail: $email1 \n";
    }

    if (strlen($comment1) > 0) {
        $mes.= "Вопрос: $comment1 \n";
    }

    $mes.= "\nВремя/Дата $date \n";
    $to = "starmatf@mail.ru"; // поменять на свой адрес
    $from = "From: admin";
    $subject = 'Заявка';
    $message = $mes;
    $boundary = md5(date('r', time()));
    $filesize = '';
    $headers = "MIME-Version: 1.0\r\n";
    $headers.= "From: " . $from . "\r\n";
    $headers.= "Reply-To: " . $from . "\r\n";
    $headers.= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
    $message = "
Content-Type: multipart/mixed; boundary=\"$boundary\"

--$boundary
Content-Type: text/plain; charset=\"utf-8\"
Content-Transfer-Encoding: 7bit

$message";
    if (is_uploaded_file($_FILES['usr_doc']['tmp_name'])) {
        $attachment = chunk_split(base64_encode(file_get_contents($_FILES['usr_doc']['tmp_name'])));
        $filename = $_FILES['usr_doc']['name'];
        $filetype = $_FILES['usr_doc']['type'];
        $filesize = $_FILES['usr_doc']['size'];
        $message.= "

--$boundary
Content-Type: \"$filetype\"; name=\"$filename\"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=\"$filename\"

$attachment";
    }

    $message.= "
--$boundary--";
    if ($filesize < 50000000) { // проверка на общий размер всех файлов. Многие почтовые сервисы не принимают вложения больше 10 МБ
        mail($to, $subject, $message, $headers);
        echo "1"; //Всё Ok!
    }
    else {
        $output = '<script>alert("Извините, письмо не отправлено. Размер всех файлов превышает 10 МБ.");</script>';
    }

    // CRM server conection data

    define('CRM_HOST', 'refresh.bitrix24.ru'); // your CRM domain name
    define('CRM_PORT', '443'); // CRM server port
    define('CRM_PATH', '/crm/configs/import/lead.php'); // CRM server REST service path

    // CRM server authorization data

    define('CRM_LOGIN', 'evgenicuss@gmail.com'); // login of a CRM user able to manage leads
    define('CRM_PASSWORD', '1й2ц3у'); // password of a CRM user
    /********************************************************************************************/

    // POST processing

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        // get lead data from the form

        $postData = array(
            'TITLE' => $name1,
            'NAME' => $name1,
            'PHONE_WORK' => $phone1,
            'COMMENTS' => $comment1,
            'EMAIL_WORK' => $email1,
            'SOURCE_ID' => 'Лендинг Refresh',
        );

        // append authorization data

        if (defined('CRM_AUTH')) {
            $postData['AUTH'] = CRM_AUTH;
        }
        else {
            $postData['LOGIN'] = CRM_LOGIN;
            $postData['PASSWORD'] = CRM_PASSWORD;
        }

        // open socket to CRM

        $fp = fsockopen("ssl://" . CRM_HOST, CRM_PORT, $errno, $errstr, 30);
        if ($fp) {

            // prepare POST data

            $strPostData = '';
            foreach($postData as $key => $value) $strPostData.= ($strPostData == '' ? '' : '&') . $key . '=' . urlencode($value);

            // prepare POST headers

            $str = "POST " . CRM_PATH . " HTTP/1.0\r\n";
            $str.= "Host: " . CRM_HOST . "\r\n";
            $str.= "Content-Type: application/x-www-form-urlencoded\r\n";
            $str.= "Content-Length: " . strlen($strPostData) . "\r\n";
            $str.= "Connection: close\r\n\r\n";
            $str.= $strPostData;

            // send POST to CRM

            fwrite($fp, $str);

            // get CRM headers

            $result = '';
            while (!feof($fp)) {
                $result.= fgets($fp, 128);
            }

            fclose($fp);

            // cut response headers

            $response = explode("\r\n\r\n", $result);
            $output = '<pre>' . print_r($response[1], 1) . '</pre>';
        }
        else {
            echo 'Connection Failed! ' . $errstr . ' (' . $errno . ')';
        }
    }
    else {
        $output = '';
    }
}

?>
