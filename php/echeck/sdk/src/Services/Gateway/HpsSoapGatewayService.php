<?php

class HpsSoapGatewayService extends HpsGatewayServiceAbstract
{
    public function doTransaction($transaction, $clientTransactionId = null)
    {
        $xml = new DOMDocument('1.0', 'utf-8');
        $soapEnvelope = $xml->createElement('soapenv:Envelope');
        $soapEnvelope->setAttribute('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
        $soapEnvelope->setAttribute('xmlns:hps', 'http://Hps.Exchange.PosGateway');

        $soapBody = $xml->createElement('soapenv:Body');
        $hpsRequest = $xml->createElement('hps:PosRequest');

        $hpsVersion = $xml->createElement('hps:Ver1.0');
        $hpsHeader = $xml->createElement('hps:Header');

        if ($this->_config->secretApiKey != null && $this->_config->secretApiKey != "") {
            $hpsHeader->appendChild($xml->createElement('hps:SecretAPIKey', $this->_config->secretApiKey));
        } else {
            $hpsHeader->appendChild($xml->createElement('hps:SiteId', $this->_config->siteId));
            $hpsHeader->appendChild($xml->createElement('hps:DeviceId', $this->_config->deviceId));
            $hpsHeader->appendChild($xml->createElement('hps:LicenseId', $this->_config->licenseId));
            $hpsHeader->appendChild($xml->createElement('hps:UserName', $this->_config->username));
            $hpsHeader->appendChild($xml->createElement('hps:Password', $this->_config->password));
        }
        if ($this->_config->developerId != null && $this->_config->developerId != "") {
            $hpsHeader->appendChild($xml->createElement('hps:DeveloperID', $this->_config->developerId));
            $hpsHeader->appendChild($xml->createElement('hps:VersionNbr', $this->_config->versionNumber));
            $hpsHeader->appendChild($xml->createElement('hps:SiteTrace', $this->_config->siteTrace));
        }
        if ($clientTransactionId != null) {
            $hpsHeader->appendChild($xml->createElement('hps:ClientTxnId', $clientTransactionId));
        }

        $hpsVersion->appendChild($hpsHeader);
        $transaction = $xml->importNode($transaction, true);
        $hpsVersion->appendChild($transaction);

        $hpsRequest->appendChild($hpsVersion);
        $soapBody->appendChild($hpsRequest);
        $soapEnvelope->appendChild($soapBody);
        $xml->appendChild($soapEnvelope);

        $url = $this->_gatewayUrlForKey();
        $header = array(
            'Content-type: text/xml;charset="utf-8"',
            'Accept: text/xml',
            'SOAPAction: ""',
            'Content-length: '.strlen($xml->saveXML()),
        );
        $data = $xml->saveXML();

        return $this->submitRequest($url, $header, $data);
    }

    protected function processResponse($curlResponse, $curlInfo, $curlError)
    {
        switch ($curlInfo['http_code']) {
            case '200':
                $responseObject = $this->_XML2Array($curlResponse);
                $ver = "Ver1.0";
                return $responseObject->$ver;
                break;
            case '500':
                $faultString = $this->_XMLFault2String($curlResponse);
                throw new HpsException($faultString);
                break;
            default:
                throw new HpsException('Unexpected response');
                break;
        }
    }

    protected function _hydrateAdditionalTxnFields($details, DOMDocument $xml)
    {
        $additionalTxnFields = $xml->createElement('hps:AdditionalTxnFields');

        if ($details->memo != null && $details->memo != "") {
            $additionalTxnFields->appendChild($xml->createElement('hps:Description', $details->memo));
        }

        if ($details->invoiceNumber != null && $details->invoiceNumber != "") {
            $additionalTxnFields->appendChild($xml->createElement('hps:InvoiceNbr', $details->invoiceNumber));
        }

        if ($details->customerId != null && $details->customerId != "") {
            $additionalTxnFields->appendChild($xml->createElement('hps:CustomerID', $details->customerId));
        }

        return $additionalTxnFields;
    }

    protected function _hydrateCardHolderData(HpsCardHolder $cardHolder, DOMDocument $xml)
    {
        $cardHolderData = $xml->createElement('hps:CardHolderData');
        $cardHolderData->appendChild($xml->createElement('hps:CardHolderFirstName', $cardHolder->firstName));
        $cardHolderData->appendChild($xml->createElement('hps:CardHolderLastName', $cardHolder->lastName));
        $cardHolderData->appendChild($xml->createElement('hps:CardHolderEmail', $cardHolder->email));
        $cardHolderData->appendChild($xml->createElement('hps:CardHolderPhone', $cardHolder->phone));
        $cardHolderData->appendChild($xml->createElement('hps:CardHolderAddr', $cardHolder->address->address));
        $cardHolderData->appendChild($xml->createElement('hps:CardHolderCity', $cardHolder->address->city));
        $cardHolderData->appendChild($xml->createElement('hps:CardHolderState', $cardHolder->address->state));
        $cardHolderData->appendChild($xml->createElement('hps:CardHolderZip', $cardHolder->address->zip));

        return $cardHolderData;
    }

    protected function _hydrateCheckData(HpsCheck $check, DOMDocument $xml)
    {
        $checkData = $xml->createElement('hps:AccountInfo');

        if ($check->accountNumber != null) {
            $checkData->appendChild($xml->createElement('hps:AccountNumber', $check->accountNumber));
        }

        if ($check->checkNumber != null) {
            $checkData->appendChild($xml->createElement('hps:CheckNumber', $check->checkNumber));
        }

        if ($check->micrNumber != null) {
            $checkData->appendChild($xml->createElement('hps:MICRData', $check->micrNumber));
        }

        if ($check->routingNumber != null) {
            $checkData->appendChild($xml->createElement('hps:RoutingNumber', $check->routingNumber));
        }

        if ($check->accountType != null) {
            $checkData->appendChild($xml->createElement('hps:AccountType', strtoupper($check->accountType)));
        }

        return $checkData;
    }

    protected function _hydrateConsumerInfo(HpsCheck $check, DOMDocument $xml)
    {
        $consumerInfo = $xml->createElement('hps:ConsumerInfo');

        if ($check->checkHolder->address != null) {
            $consumerInfo->appendChild($xml->createElement('hps:Address1', $check->checkHolder->address->address));
            $consumerInfo->appendChild($xml->createElement('hps:City', $check->checkHolder->address->city));
            $consumerInfo->appendChild($xml->createElement('hps:State', $check->checkHolder->address->state));
            $consumerInfo->appendChild($xml->createElement('hps:Zip', $check->checkHolder->address->zip));
        }

        if ($check->checkHolder->checkName != null) {
            $consumerInfo->appendChild($xml->createElement('hps:CheckName', $check->checkHolder->checkName));
        }

        if ($check->checkHolder->courtesyCard != null) {
            $consumerInfo->appendChild($xml->createElement('hps:CourtesyCard', $check->checkHolder->courtesyCard));
        }

        if ($check->checkHolder->dlNumber != null) {
            $consumerInfo->appendChild($xml->createElement('hps:DLNumber', $check->checkHolder->dlNumber));
        }

        if ($check->checkHolder->dlState != null) {
            $consumerInfo->appendChild($xml->createElement('hps:DLState', $check->checkHolder->dlState));
        }

        if ($check->checkHolder->email != null) {
            $consumerInfo->appendChild($xml->createElement('hps:EmailAddress', $check->checkHolder->email));
        }

        if ($check->checkHolder->firstName != null) {
            $consumerInfo->appendChild($xml->createElement('hps:FirstName', $check->checkHolder->firstName));
        }

        if ($check->checkHolder->lastName != null) {
            $consumerInfo->appendChild($xml->createElement('hps:LastName', $check->checkHolder->lastName));
        }

        if ($check->checkHolder->phone != null) {
            $consumerInfo->appendChild($xml->createElement('hps:PhoneNumber', $check->checkHolder->phone));
        }
        if ($check->checkHolder->ssl4 != null || $check->checkHolder->dobYear != null) {
            $identityInfo = $xml->createElement('hps:IdentityInfo');
            if ($check->checkHolder->ssl4 != null) {
                $identityInfo->appendChild($xml->createElement('hps:SSNL4', $check->checkHolder->ssl4));
            }
            if ($check->checkHolder->dobYear != null) {
                $identityInfo->appendChild($xml->createElement('hps:DOBYear', $check->checkHolder->dobYear));
            }
            $consumerInfo->appendChild($identityInfo);
        }

        return $consumerInfo;
    }

    protected function _hydrateCPCData(HpsCPCData $cpcData, DOMDocument $xml)
    {
        $cpcDataElement = $xml->createElement('hps:CPCData');
        $cpcDataElement->appendChild($xml->createElement('hps:CardHolderPONbr', $cpcData->CardHolderPONbr));
        $cpcDataElement->appendChild($xml->createElement('hps:TaxAmt', $cpcData->TaxAmt));
        $cpcDataElement->appendChild($xml->createElement('hps:TaxType', $cpcData->TaxType));

        return $cpcDataElement;
    }

    protected function _hydrateDirectMarketData(HpsDirectMarketData $data, DOMDocument $xml)
    {
        $directMktDataElement = $xml->createElement('hps:DirectMktData');
        $directMktDataElement->appendChild($xml->createElement('hps:DirectMktInvoiceNbr', $data->invoiceNumber));
        $directMktDataElement->appendChild($xml->createElement('hps:DirectMktShipMonth', $data->shipMonth));
        $directMktDataElement->appendChild($xml->createElement('hps:DirectMktShipDay', $data->shipDay));

        return $directMktDataElement;
    }

    protected function _hydrateEncryptionData(HpsEncryptionData $encryptionData, DOMDocument $xml)
    {
        $encData = $xml->createElement('hps:EncryptionData');
        if ($encryptionData->encryptedTrackNumber != null) {
            $encData->appendChild($xml->createElement('hps:EncryptedTrackNumber', $encryptionData->encryptedTrackNumber));
        }
        $encData->appendChild($xml->createElement('hps:KSN', $encryptionData->ksn));
        $encData->appendChild($xml->createElement('hps:KTB', $encryptionData->ksn));
        $encData->appendChild($xml->createElement('hps:Version', $encryptionData->version));
        return $encData;
    }

    protected function _hydrateGiftCardData(HpsGiftCard $giftCard, DOMDocument $xml, $elementName = 'CardData')
    {
        $giftCardData = $xml->createElement('hps:'.$elementName);
        if ($giftCard->isTrackData == true) {
            $giftCardData->appendChild($xml->createElement('hps:TrackData', $giftCard->number));
        } else {
            $giftCardData->appendChild($xml->createElement('hps:CardNbr', $giftCard->number));
        }

        if ($giftCard->encryptionData != null) {
            $giftCardData->appendChild($this->_hydrateEncryptionData($giftCard->encryptionData, $xml));
        }

        return $giftCardData;
    }

    protected function _hydrateManualEntry(HpsCreditCard $card, DOMDocument $xml)
    {
        $manualEntry = $xml->createElement('hps:ManualEntry');

        if (isset($card->number)) {
            $manualEntry->appendChild($xml->createElement('hps:CardNbr', $card->number));
        }

        if (isset($card->expMonth)) {
            $manualEntry->appendChild($xml->createElement('hps:ExpMonth', $card->expMonth));
        }

        if (isset($card->expYear)) {
            $manualEntry->appendChild($xml->createElement('hps:ExpYear', $card->expYear));
        }

        if (isset($card->cvv)) {
            $manualEntry->appendChild($xml->createElement('hps:CVV2', $card->cvv));
        }

        $manualEntry->appendChild($xml->createElement('hps:CardPresent', 'N'));
        $manualEntry->appendChild($xml->createElement('hps:ReaderPresent', 'N'));

        return $manualEntry;
    }

    private function _gatewayUrlForKey()
    {
        if ($this->_config->secretApiKey != null && $this->_config->secretApiKey != "") {
            if (strpos($this->_config->secretApiKey, '_cert_') !== false) {
                return "https://cert.api2.heartlandportico.com/Hps.Exchange.PosGateway/PosGatewayService.asmx";
            } else if (strpos($this->_config->secretApiKey, '_uat_') !== false) {
                return "https://posgateway.uat.secureexchange.net/Hps.Exchange.PosGateway/PosGatewayService.asmx";
            } else {
                return "https://cert.api2.heartlandportico.com/Hps.Exchange.PosGateway/PosGatewayService.asmx";
            }
        } else {
            return $this->_config->soapServiceUri;
        }
    }

    private function _XML2Array($xml)
    {
        $envelope = simplexml_load_string($xml, "SimpleXMLElement", 0, 'http://schemas.xmlsoap.org/soap/envelope/');
        foreach ($envelope->Body as $response) {
            foreach ($response->children('http://Hps.Exchange.PosGateway') as $item) {
                return $item;
            }
        }
    }

    private function _XMLFault2String($xml)
    {
        $dom = new DOMDocument();
        $dom->loadXML($xml);
        return $dom->getElementsByTagName('faultstring')->item(0)->nodeValue;
    }
}
