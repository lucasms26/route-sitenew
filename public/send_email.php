<?php
// 1. NAMESPACES NO TOPO
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

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

$data = json_decode(file_get_contents("php://input"), true);

$name    = isset($data['name']) ? trim($data['name']) : '';
$email   = isset($data['email']) ? trim($data['email']) : '';
$phone   = isset($data['phone']) ? trim($data['phone']) : '';
$message = isset($data['message']) ? trim($data['message']) : '';

if (empty($name) || empty($email) || empty($message)) {
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
    // --- DEBUG ---
    // Remova o comentário da linha abaixo para ver o log de erro real se falhar
    
    $mail->SMTPDebug = SMTP::DEBUG_SERVER; 

    $mail->isSMTP();
    $mail->Host       = 'ns155.routesecurity.com.br';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'no-replay@routesecurity.com.br'; // Verifique se é 'no-replay' ou 'no-reply'
    $mail->Password   = 'Noreplay@0450';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // ALTERADO: STARTTLS para porta 587
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    // Ajuste para evitar falhas de certificado SSL em alguns servidores
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    $mail->setFrom('no-replay@routesecurity.com.br', 'Route Security Site');
    $mail->addAddress('suporte@gruporoutesecurity.com'); 
    $mail->addReplyTo($email, $name);

    $mail->isHTML(false);
    $mail->Subject = "Novo contato recebido pelo site - " . $name;
    $mail->Body    = "Você recebeu uma nova mensagem através do site:\n\n" .
                     "Nome: $name\n" .
                     "E-mail: $email\n" .
                     "Telefone: $phone\n\n" .
                     "Mensagem:\n$message";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'E-mail enviado com sucesso.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => "Erro no envio: {$mail->ErrorInfo}"]);
}