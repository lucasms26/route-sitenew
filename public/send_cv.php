<?php
// NAMESPACES NO TOPO
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
// Não forçar Content-Type: application/json no header AQUI,
// senão complica o upload de arquivo multipart/form-data.

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit();
}

// Carregamento dos arquivos (certifique-se que o caminho /src/ está correto)
require __DIR__ . '/src/Exception.php';
require __DIR__ . '/src/PHPMailer.php';
require __DIR__ . '/src/SMTP.php';

// Para multipart/form-data, lemos de $_POST e não do php://input raw
$name  = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$vaga  = isset($_POST['vaga']) ? trim($_POST['vaga']) : '';

if (empty($name) || empty($email) || empty($vaga)) {
    http_response_code(400);
    echo json_encode(['error' => 'Por favor, preencha todos os campos obrigatórios.']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Formato de e-mail inválido.']);
    exit();
}

$mail = new PHPMailer(true);

try {
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER; 

    $mail->isSMTP();
    $mail->Host       = 'ns155.hostgator.com.br';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'no-replay@routesecurity.com.br'; 
    $mail->Password   = 'Noreplay@0450';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    $mail->setFrom('no-replay@routesecurity.com.br', 'Route Security Site (RH)');
    // Para onde enviar os currículos
    $mail->addAddress('vagas@routesecurity.com.br'); 
    $mail->addReplyTo($email, $name);

    // Lidar com o arquivo anexado
    if (isset($_FILES['cv']) && $_FILES['cv']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['cv']['tmp_name'];
        $fileName = $_FILES['cv']['name'];
        // Adicionando o anexo
        $mail->addAttachment($fileTmpPath, $fileName);
    }

    $mail->isHTML(false);
    $mail->Subject = "Novo Currículo Recebido: " . $name . " - " . $vaga;
    $mail->Body    = "Você recebeu um novo currículo através do site.\n\n" .
                     "Nome: $name\n" .
                     "E-mail: $email\n" .
                     "Telefone: $phone\n" .
                     "Vaga de Interesse: $vaga\n\n" .
                     "O currículo (se enviado) está em anexo.";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Currículo enviado com sucesso.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => "Erro no envio: {$mail->ErrorInfo}"]);
}
