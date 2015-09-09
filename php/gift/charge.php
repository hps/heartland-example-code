<?php

require_once "sdk/Hps.php";

$config = new HpsServicesConfig();
$config->secretApiKey = 'skapi_cert_MYl2AQAowiQAbLp5JesGKh7QFkcizOP2jcX9BrEMqQ';

$config->versionNumber = '0000';
$config->developerId = '000000';

$giftService = new HpsGiftCardService($config);

try {
	$card = new HpsGiftCard();
	$card->number = $_GET["card-number"];
	$card->expMonth = $_GET["expiration-month"];
	$card->expYear = $_GET["expiration-year"];

	$response = $giftService->sale($card, 1.00);
} catch (HpsException $e) {
	echo $e->getMessage();
}

//echo $response->responseCode;
echo "Transaction Id: " . $response->transactionId;

?>