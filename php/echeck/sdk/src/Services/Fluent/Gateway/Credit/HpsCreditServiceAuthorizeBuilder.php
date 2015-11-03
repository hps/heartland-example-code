<?php

/**
 * A fluent interface for creating and executing an authorization
 * transaction through the HpsCreditService.
 *
 * @method HpsCreditServiceAuthorizeBuilder withAmount(double $amount)
 * @method HpsCreditServiceAuthorizeBuilder withCurrency(string $currency)
 * @method HpsCreditServiceAuthorizeBuilder withCard(HpsCreditCard $card)
 * @method HpsCreditServiceAuthorizeBuilder withToken(HpsTokenData $token)
 * @method HpsCreditServiceAuthorizeBuilder withCardHolder(HpsCardHolder $cardHolder)
 * @method HpsCreditServiceAuthorizeBuilder withRequestMultiUseToken(bool $requestMultiUseToken)
 * @method HpsCreditServiceAuthorizeBuilder withDetails(HpsTransactionDetails $details)
 * @method HpsCreditServiceAuthorizeBuilder withTxnDescriptor(string $txnDescriptor)
 * @method HpsCreditServiceAuthorizeBuilder withAllowPartialAuth(bool $allowPartialAuth)
 * @method HpsCreditServiceAuthorizeBuilder withCpcReq(bool $cpcReq)
 */
class HpsCreditServiceAuthorizeBuilder extends HpsBuilderAbstract
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

    /**
     * Instatiates a new HpsCreditServiceAuthorizeBuilder
     *
     * @param HpsSoapGatewayService $service
     */
    public function __construct(HpsSoapGatewayService $service)
    {
        parent::__construct($service);
        $this->setUpValidations();
    }

    /**
     * Creates an authorization transaction through the HpsCreditService
     */
    public function execute()
    {
        parent::execute();

        $authorizationSvc = new HpsCreditService($this->service->servicesConfig());
        return $authorizationSvc->authorize(
            $this->amount,
            $this->currency,
            isset($this->card) ? $this->card : $this->token,
            $this->cardHolder,
            $this->requestMultiUseToken,
            $this->details,
            $this->txnDescriptor,
            $this->allowPartialAuth,
            $this->cpcReq
        );
    }

    /**
     * Setups up validations for building authorizations.
     *
     * @return null
     */
    private function setUpValidations()
    {
        $this
            ->addValidation(array($this, 'onlyOnePaymentMethod'), 'HpsArgumentException', 'Authorize can only use one payment method')
            ->addValidation(array($this, 'amountNotNull'), 'HpsArgumentException', 'Authorize needs an amount')
            ->addValidation(array($this, 'currencyNotNull'), 'HpsArgumentException', 'Authorize needs a currency');
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
