<?php

class CheckEcommerceCertificationTest extends PHPUnit_Framework_TestCase
{
    // ACH Debit Consumer Tests
    public function testACHDebitConsumer1()
    {
        $check = TestCheck::certification();

        $checkService = new HpsCheckService(TestServicesConfig::validMultiUseConfig());
        $response = $checkService->sale($check, 11.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);

        $voidResponse = $checkService->void($response->transactionId);
        $this->assertEquals('0', $voidResponse->responseCode);
        $this->assertEquals('Transaction Approved', $voidResponse->responseText);
    }

    public function testACHDebitConsumer2CheckingBusiness()
    {
        $check = TestCheck::certification();
        $check->checkType = HpsCheckType::BUSINESS;

        $checkService = new HpsCheckService(TestServicesConfig::validMultiUseConfig());
        $response = $checkService->sale($check, 12.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    public function testACHDebitConsumer3SavingsPersonal()
    {
        $check = TestCheck::certification();
        $check->accountType = HpsAccountType::SAVINGS;

        $checkService = new HpsCheckService(TestServicesConfig::validMultiUseConfig());
        $response = $checkService->sale($check, 13.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    public function testACHDebitConsumer4SavingsBusiness()
    {
        $check = TestCheck::certification();
        $check->accountType = HpsAccountType::SAVINGS;
        $check->checkType = HpsCheckType::BUSINESS;

        $checkService = new HpsCheckService(TestServicesConfig::validMultiUseConfig());
        $response = $checkService->sale($check, 14.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    //End ACH Debit Consumer Tests

    // ACH Debit Corporate Tests

    public function testACHDebitCorporate5()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::CCD;
        $check->checkHolder->checkName = 'Heartland Pays';

        $checkService = new HpsCheckService(TestServicesConfig::certServicesConfigWithDescriptor());
        $response = $checkService->sale($check, 15.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);

        $voidResponse = $checkService->void($response->transactionId);
        $this->assertEquals('0', $voidResponse->responseCode);
        $this->assertEquals('Transaction Approved', $voidResponse->responseText);
    }

    public function testACHDebitCorporate6CheckingBusiness()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::CCD;
        $check->checkType = HpsCheckType::BUSINESS;
        $check->checkHolder->checkName = 'Heartland Pays';

        $checkService = new HpsCheckService(TestServicesConfig::certServicesConfigWithDescriptor());
        $response = $checkService->sale($check, 16.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    public function testACHDebitCorporate7SavingsPersonal()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::CCD;
        $check->accountType = HpsAccountType::SAVINGS;
        $check->checkHolder->checkName = 'Heartland Pays';

        $checkService = new HpsCheckService(TestServicesConfig::certServicesConfigWithDescriptor());
        $response = $checkService->sale($check, 17.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    public function testACHDebitCorporate8SavingsBusiness()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::CCD;
        $check->accountType = HpsAccountType::SAVINGS;
        $check->checkType = HpsCheckType::BUSINESS;
        $check->checkHolder->checkName = 'Heartland Pays';

        $checkService = new HpsCheckService(TestServicesConfig::certServicesConfigWithDescriptor());
        $response = $checkService->sale($check, 18.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    //End ACH Debit Corporate Tests

    //Starting ACH eGold Tests

    public function testEGold9()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::POP;

        $checkService = new HpsCheckService(TestServicesConfig::ValidEGoldConfig());
        $response = $checkService->sale($check, 11.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    public function testEGold10CheckingBusiness()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::POP;
        $check->checkType = HpsCheckType::BUSINESS;

        $checkService = new HpsCheckService(TestServicesConfig::ValidEGoldConfig());
        $response = $checkService->sale($check, 12.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);

        $voidResponse = $checkService->void($response->transactionId);
        $this->assertEquals('0', $voidResponse->responseCode);
        $this->assertEquals('Transaction Approved', $voidResponse->responseText);
    }

    public function testEGold11SavingsPersonal()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::POP;
        $check->accountType = HpsAccountType::SAVINGS;

        $checkService = new HpsCheckService(TestServicesConfig::ValidEGoldConfig());
        $response = $checkService->sale($check, 13.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    public function testEGold12SavingsBusiness()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::POP;
        $check->accountType = HpsAccountType::SAVINGS;
        $check->checkType = HpsCheckType::BUSINESS;

        $checkService = new HpsCheckService(TestServicesConfig::ValidEGoldConfig());
        $response = $checkService->sale($check, 14.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }


    //End ACH eGold Tests


    //Start ACH eSilver Tests

    public function testESilver13()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::POP;

        $checkService = new HpsCheckService(TestServicesConfig::ValidEGoldConfig());
        $response = $checkService->sale($check, 15.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    public function testESilver14CheckingBusiness()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::POP;
        $check->checkType = HpsCheckType::BUSINESS;

        $checkService = new HpsCheckService(TestServicesConfig::ValidEGoldConfig());
        $response = $checkService->sale($check, 16.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);

        $voidResponse = $checkService->void($response->transactionId);
        $this->assertEquals('0', $voidResponse->responseCode);
        $this->assertEquals('Transaction Approved', $voidResponse->responseText);
    }

    public function testESilver15SavingsPersonal()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::POP;
        $check->accountType = HpsAccountType::SAVINGS;

        $checkService = new HpsCheckService(TestServicesConfig::ValidEGoldConfig());
        $response = $checkService->sale($check, 17.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    public function testESilver16SavingsBusiness()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::POP;
        $check->accountType = HpsAccountType::SAVINGS;
        $check->checkType = HpsCheckType::BUSINESS;

        $checkService = new HpsCheckService(TestServicesConfig::ValidEGoldConfig());
        $response = $checkService->sale($check, 18.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    //End ACH eSilver Tests

    //Start ACH eBronze Tests

    public function testEBronzeVerify17CheckingPersonal()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::EBRONZE;
        $check->checkVerify = 'Y';

        $checkService = new HpsCheckService(TestServicesConfig::validMultiUseConfig());
        $response = $checkService->sale($check, 1);

        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    public function testEBronzeVerify18CheckingBusiness()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::EBRONZE;
        $check->checkType = HpsCheckType::BUSINESS;
        $check->checkVerify = 'Y';

        $checkService = new HpsCheckService(TestServicesConfig::validMultiUseConfig());
        $response = $checkService->sale($check, 1);

        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    public function testEBronzeVerify19SavingsPersonal()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::EBRONZE;
        $check->accountType = HpsAccountType::SAVINGS;
        $check->checkVerify = 'Y';

        $checkService = new HpsCheckService(TestServicesConfig::validMultiUseConfig());
        $response = $checkService->sale($check, 1);

        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    public function testEBronzeVerify20SavingsBusiness()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::EBRONZE;
        $check->checkType = HpsCheckType::BUSINESS;
        $check->accountType = HpsAccountType::SAVINGS;
        $check->checkVerify = 'Y';

        $checkService = new HpsCheckService(TestServicesConfig::validMultiUseConfig());
        $response = $checkService->sale($check, 1);

        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    //End ACH eBronze Tests

    //Start Checks-by-Web


    public function testCheckByWeb21()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::WEB;

        $checkService = new HpsCheckService(TestServicesConfig::certServicesConfigWithDescriptor());
        $response = $checkService->sale($check, 19.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    public function testCheckByWeb22CheckingBusiness()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::WEB;
        $check->checkType = HpsCheckType::BUSINESS;

        $checkService = new HpsCheckService(TestServicesConfig::certServicesConfigWithDescriptor());
        $response = $checkService->sale($check, 20.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    public function testCheckByWeb23SavingsPersonal()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::WEB;
        $check->accountType = HpsAccountType::SAVINGS;

        $checkService = new HpsCheckService(TestServicesConfig::certServicesConfigWithDescriptor());
        $response = $checkService->sale($check, 21.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);

        $voidResponse = $checkService->void($response->transactionId);
        $this->assertEquals('0', $voidResponse->responseCode);
        $this->assertEquals('Transaction Approved', $voidResponse->responseText);
    }

    public function testCheckByWeb24SavingsBusiness()
    {
        $check = TestCheck::certification();
        $check->secCode = HpsSECCode::WEB;
        $check->accountType = HpsAccountType::SAVINGS;
        $check->checkType = HpsCheckType::BUSINESS;

        $checkService = new HpsCheckService(TestServicesConfig::certServicesConfigWithDescriptor());
        $response = $checkService->sale($check, 22.00);
        $this->assertNotNull($response, 'Response is null');
        $this->assertEquals('0', $response->responseCode);
        $this->assertEquals('Transaction Approved', $response->responseText);
    }

    //End Checks-by-Web
}
