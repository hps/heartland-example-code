<?php

class EcommerceTests extends PHPUnit_Framework_TestCase
{
    /** @var HpsFluentCreditService|null */
    private $service      = null;

    /** @var HpsBatchService|null */
    private $batchService = null;

    /** @var bool */
    private $useTokens  = false;

    /** @var bool */
    private $usePrepaid = false;

    /** @var string */
    private $publicKey  = '';

    private function config()
    {
        $config = new HpsServicesConfig();
        $config->secretApiKey  = 'skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A';
        $config->developerId   = '';
        $config->versionNumber = '';
        return $config;
    }

    protected function setup()
    {
        $this->service      = new HpsFluentCreditService($this->config());
        $this->batchService = new HpsBatchService($this->config());

        $this->useTokens  = true;
        $this->usePrepaid = true;
        $this->publicKey  = 'pkapi_cert_jKc1FtuyAydZhZfbB3';
    }

    /// CARD VERIFY

    public function test000CloseBatch()
    {
        try {
            $response = $this->batchService.closeBatch();
            if ($response == null) {
                $this->fail('Response is null');
            }
            print 'batch id: ' . $response->id . "\n";
            print 'sequence number: ' . $response->sequence_number . "\n";
        } catch (HpsException $e) {
            $this->fail($e->getMessage());
        }
    }

    /// Account Verification

    public function test001VerifyVisa()
    {
        $response = $this->service
            ->verify()
            ->withCard(TestData::visa_card(array('cvv'=>false)))
            ->withRequestMultiUseToken($this->useTokens)
            ->execute();

        $this->assertEquals(true, $response != null);
        $this->assertEqauls('85', $response->responseCode);
    }

    public function test002VerifyMasterCard()
    {
        $response = $this->service
            ->verify()
            ->withCard(TestData::mastercard_card(array('cvv'=>false)))
            ->withRequestMultiUseToken($this->useTokens)
            ->execute();

        $this->assertEquals(true, $response != null);
        $this->assertEqauls('85', $response->responseCode);
    }

    public function test003VerifyDiscover()
    {
        $cardHolder = new HpsCardHolder();
        $cardHolder->address = new HpsAddress();
        $cardHolder->addres->zip = '75024';

        $response = $this->service
            ->verify()
            ->withCard(TestData::discover_card(array('cvv'=>false)))
            ->withCardHolder($cardHolder)
            ->withRequestMultiUseToken($this->useTokens)
            ->execute();

        $this->assertEquals(true, $response != null);
        $this->assertEqauls('85', $response->responseCode);
    }

    /// Address Verification

    public function test004VerifyAmex()
    {
        $cardHolder = new HpsCardHolder();
        $cardHolder->address = new HpsAddress();
        $cardHolder->address->zip = '75024';

        $response = $this->service
            ->verify()
            ->withCard(TestData::amex_card(array('cvv'=>false)))
            ->withCardHolder($cardHolder)
            ->withRequestMultiUseToken($this->useTokens)
            ->execute();

        $this->assertEquals(true, $response != null);
        $this->assertEqauls('00', $response->responseCode);
    }

    /// Balance Inquiry (for Prepad Card)

    public function test005BalanceInquiryVisa()
    {
        $response = $this->service
            ->prepaidBalanceInquiry()
            ->withCard(TestData::visa_card(array('cvv'=>false)))
            ->execute();

        $this->assertEquals(true, $response != null);
        $this->assertEqauls('85', $response->responseCode);
    }

    /// CREDIT SALE (For Multi-Use Token Only

    public function test006ChargeVisaToken()
    {
        $cardHolder = new HpsCardHolder();
        $cardHolder->address = new HpsAddress();
        $cardHolder->address->address = '6860 Dallas Pkwy';
        $cardHolder->address->zip     = '75024';

        $response = $this->service
            ->charge()
            ->withAmount(13.01)
            ->withCard(TestData::visaCard())
            ->withCardHolder($cardHolder)
            ->withRequestMultiUseToken(true)
            ->execute();

        $this->assertEquals(true, $response != null);
        $this->assertEqauls('00', $response->responseCode);
    }

    public function test007ChargeMasterCardToken()
    {
        $cardHolder = new HpsCardHolder();
        $cardHolder->address = new HpsAddress();
        $cardHolder->address->address = '6860';
        $cardHolder->address->zip     = '75024';

        $response = $this->service
            ->charge()
            ->withAmount(13.02)
            ->withCard(TestData::mastercardCard())
            ->withCardHolder($cardHolder)
            ->withRequestMultiUseToken(true)
            ->execute();

        $this->assertEquals(true, $response != null);
        $this->assertEqauls('00', $response->responseCode);
    }

    public function test008ChargeDiscoverToken()
    {
        $cardHolder = new HpsCardHolder();
        $cardHolder->address = new HpsAddress();
        $cardHolder->address->address = '6860 Dallas Pkwy';
        $cardHolder->address->zip     = '75024';

        $response = $this->service
            ->charge()
            ->withAmount(13.03)
            ->withCard(TestData::discoverCard())
            ->withCardHolder($cardHolder)
            ->withRequestMultiUseToken(true)
            ->execute();

        $this->assertEquals(true, $response != null);
        $this->assertEqauls('00', $response->responseCode);
    }

    public function test009ChargeAmexToken()
    {
        $cardHolder = new HpsCardHolder();
        $cardHolder->address = new HpsAddress();
        $cardHolder->address->address = '6860 Dallas Pkwy';
        $cardHolder->address->zip     = '75024';

        $response = $this->service
            ->charge()
            ->withAmount(13.04)
            ->withCard(TestData::visaCard())
            ->withCardHolder($cardHolder)
            ->withRequestMultiUseToken(true)
            ->execute();

        $this->assertEquals(true, $response != null);
        $this->assertEqauls('00', $response->responseCode);
    }

    /// CREDIT SALE

    public function test010ChargeVisaToken()
    {
        $cardHolder = new HpsCardHolder();
        $cardHolder->address = new HpsAddress();
        $cardHolder->address->address = '6860 Dallas Pkwy';
        $cardHolder->address->zip     = '75024';

        $directMarketData = new HpsDirectMarketData('123456');

        $response = $this->service
            ->charge()
            ->withAmount(13.01)
            ->withCard(TestData::visaCard(array('cvv'=>false)))
            ->withCardHolder($cardHolder)
            ->withRequestMultiUseToken(true)
            ->execute();

        $this->assertEquals(true, $response != null);
        $this->assertEqauls('00', $response->responseCode);
    }
}
