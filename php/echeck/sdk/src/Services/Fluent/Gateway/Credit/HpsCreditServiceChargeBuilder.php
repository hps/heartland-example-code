<?php

/**
 * A fluent interface for creating and executing a charge
 * transaction through the HpsCreditService.
 *
 * @method HpsCreditServiceChargeBuilder withAmount(double $amount)
 * @method HpsCreditServiceChargeBuilder withCurrency(string $currency)
 * @method HpsCreditServiceChargeBuilder withCard(HpsCreditCard $card)
 * @method HpsCreditServiceChargeBuilder withToken(HpsTokenData $token)
 * @method HpsCreditServiceChargeBuilder withCardHolder(HpsCardHolder $cardHolder)
 * @method HpsCreditServiceChargeBuilder withRequestMultiUseToken(bool $requestMultiUseToken)
 * @method HpsCreditServiceChargeBuilder withDetails(HpsTransactionDetails $details)
 * @method HpsCreditServiceChargeBuilder withTxnDescriptor(string $txnDescriptor)
 * @method HpsCreditServiceChargeBuilder withAllowPartialAuth(bool $allowPartialAuth)
 * @method HpsCreditServiceChargeBuilder withCpcReq(bool $cpcReq)
 * @method HpsCreditServiceChargeBuilder withDirectMarketData(HpsDirectMarketData $directMarketData)
 */
class HpsCreditServiceChargeBuilder extends HpsBuilderAbstract
{
    /** @var double|null */
    protected $amount               = null;

    /** @var string|null */
    protected $currency             = null;

    /** @var HpsCreditCard|null */
    protected $card                 = null;

    /** @var HpsTokenData|null */
    protected $token                = null;

    /** @var HpsCardHolder|null */
    protected $cardHolder           = null;

    /** @var bool|null */
    protected $requestMultiUseToken = false;

    /** @var HpsTransactionDetails|null */
    protected $details              = null;

    /** @var string|null */
    protected $txnDescriptor        = null;

    /** @var bool|null */
    protected $allowPartialAuth     = false;

    /** @var bool|null */
    protected $cpcReq               = false;

    /** @var HpsDirectMarketData|null */
    protected $directMarketData     = null;

    /**
     * Instatiates a new HpsCreditServiceChargeBuilder
     *
     * @param HpsSoapGatewayService $service
     */
    public function __construct(HpsSoapGatewayService $service)
    {
        parent::__construct($service);
        $this->setUpValidations();
    }

    /**
     * Creates a charge transaction through the HpsCreditService
     */
    public function execute()
    {
        parent::execute();

        $chargeSvc = new HpsCreditService($this->service->servicesConfig());
        return $chargeSvc->charge(
            $this->amount,
            $this->currency,
            isset($this->card) ? $this->card : $this->token,
            $this->cardHolder,
            $this->requestMultiUseToken,
            $this->details,
            $this->txnDescriptor,
            $this->allowPartialAuth,
            $this->cpcReq,
            $this->directMarketData
        );
    }

    /**
     * Setups up validations for building charges.
     *
     * @return null
     */
    private function setUpValidations()
    {
        $this
            ->addValidation(array($this, 'onlyOnePaymentMethod'), 'HpsArgumentException', 'Charge can only use one payment method')
            ->addValidation(array($this, 'amountNotNull'), 'HpsArgumentException', 'Charge needs an amount')
            ->addValidation(array($this, 'currencyNotNull'), 'HpsArgumentException', 'Charge needs an currency');
    }

    /**
     * Ensures there is only one payment method, and checks that
     * there is only one card or one token in use. Both cannot be
     * used.
     *
     * @param array $actionCounts
     *
     * @return bool
     */
    public function onlyOnePaymentMethod($actionCounts)
    {
        return (isset($actionCounts['card']) && $actionCounts['card'] == 1
                && (!isset($actionCounts['token'])
                    || isset($actionCounts['token']) && $actionCounts['token'] == 0))
            || (isset($actionCounts['token']) && $actionCounts['token'] == 1
                && (!isset($actionCounts['card'])
                    || isset($actionCounts['card']) && $actionCounts['card'] == 0));
    }

    /**
     * Ensures an amount has been set.
     *
     * @param array $actionCounts
     *
     * @return bool
     */
    protected function amountNotNull($actionCounts)
    {
        return isset($actionCounts['amount']);
    }

    /**
     * Ensures a currency has been set.
     *
     * @param array $actionCounts
     *
     * @return bool
     */
    protected function currencyNotNull($actionCounts)
    {
        return isset($actionCounts['currency']);
    }
}
