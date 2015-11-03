<?php

/**
 * A fluent interface for creating and executing a verify
 * transaction through the HpsCreditService.
 *
 * @method HpsCreditServiceVerifyBuilder withCard(HpsCreditCard $card)
 * @method HpsCreditServiceVerifyBuilder withToken(HpsTokenData $token)
 * @method HpsCreditServiceVerifyBuilder withCardHolder(HpsCardHolder $cardHolder)
 * @method HpsCreditServiceVerifyBuilder withRequestMultiUseToken(bool $requestMultiUseToken)
 * @method HpsCreditServiceVerifyBuilder withClientTransactionId(string $clientTransactionId)
 */
class HpsCreditServiceVerifyBuilder extends HpsBuilderAbstract
{
    /** @var HpsCreditCard|null */
    protected $card                 = null;

    /** @var HpsTokenData|null */
    protected $token                = null;

    /** @var HpsCardHolder|null */
    protected $cardHolder           = null;

    /** @var bool|null */
    protected $requestMultiUseToken = false;

    /** @var string|null */
    protected $clientTransactionId  = null;

    /**
     * Instatiates a new HpsCreditServiceVerifyBuilder
     *
     * @param HpsSoapGatewayService $service
     */
    public function __construct(HpsSoapGatewayService $service)
    {
        parent::__construct($service);
        $this->setUpValidations();
    }

    /**
     * Creates a verify transaction through the HpsCreditService
     */
    public function execute()
    {
        parent::execute();

        $verifySvc = new HpsCreditService($this->service->servicesConfig());
        return $verifySvc->verify(
            isset($this->card) ? $this->card : $this->token,
            $this->cardHolder,
            $this->requestMultiUseToken,
            $this->clientTransactionId
        );
    }

    /**
     * Setups up validations for building verifys.
     *
     * @return null
     */
    private function setUpValidations()
    {
        $this
            ->addValidation(array($this, 'onlyOnePaymentMethod'), 'HpsArgumentException', 'Verify can only use one payment method');
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
}
