<?php

/**
 * A fluent interface for creating and executing a refund
 * transaction through the HpsCreditService.
 *
 * @method HpsCreditServiceRefundBuilder withAmount(double $amount)
 * @method HpsCreditServiceRefundBuilder withCurrency(string $currency)
 * @method HpsCreditServiceRefundBuilder withCard(HpsCreditCard $card)
 * @method HpsCreditServiceRefundBuilder withToken(HpsTokenData $token)
 * @method HpsCreditServiceRefundBuilder withTransactionId(HpsTokenData $transactionId)
 * @method HpsCreditServiceRefundBuilder withCardHolder(HpsCardHolder $cardHolder)
 * @method HpsCreditServiceRefundBuilder withDetails(HpsTransactionDetails $details)
 */
class HpsCreditServiceRefundBuilder extends HpsBuilderAbstract
{
    /** @var double|null */
    protected $amount        = null;

    /** @var string|null */
    protected $currency      = null;

    /** @var HpsCreditCard|null */
    protected $card          = null;

    /** @var HpsTokenData|null */
    protected $token         = null;

    /** @var string|null */
    protected $transactionId = null;

    /** @var HpsCardHolder|null */
    protected $cardHolder    = null;

    /** @var HpsTransactionDetails|null */
    protected $details       = null;

    /**
     * Instatiates a new HpsCreditServiceRefundBuilder
     *
     * @param HpsSoapGatewayService $service
     */
    public function __construct(HpsSoapGatewayService $service)
    {
        parent::__construct($service);
        $this->setUpValidations();
    }

    /**
     * Creates a refund transaction through the HpsCreditService
     */
    public function execute()
    {
        parent::execute();

        $refundSvc = new HpsCreditService($this->service->servicesConfig());
        return $refundSvc->refund(
            $this->amount,
            $this->currency,
            isset($this->card) ? $this->card : (isset($this->token) ? $this->token : $this->transactionId),
            $this->cardHolder,
            $this->details
        );
    }

    /**
     * Setups up validations for building refunds.
     *
     * @return null
     */
    private function setUpValidations()
    {
        $this
            ->addValidation(array($this, 'onlyOnePaymentMethod'), 'HpsArgumentException', 'Refund can only use one payment method')
            ->addValidation(array($this, 'amountNotNull'), 'HpsArgumentException', 'Refund needs an amount')
            ->addValidation(array($this, 'currencyNotNull'), 'HpsArgumentException', 'Refund needs an currency');
    }

    /**
     * Ensures there is only one payment method, and checks that
     * there is only one card, one token, or one transactionId
     * in use.
     *
     * @param array $actionCounts
     *
     * @return bool
     */
    public function onlyOnePaymentMethod($actionCounts)
    {
        return (isset($actionCounts['card']) && $actionCounts['card'] == 1
                && (!isset($actionCounts['token'])
                    || isset($actionCounts['token']) && $actionCounts['token'] == 0)
                && (!isset($actionCounts['transactionId'])
                    || isset($actionCounts['transactionId']) == 0))
            || (isset($actionCounts['token']) && $actionCounts['token'] == 1
                && (!isset($actionCounts['card'])
                    || isset($actionCounts['card']) && $actionCounts['card'] == 0)
                && (!isset($actionCounts['transactionId'])
                    || isset($actionCounts['transactionId']) == 0))
            || (isset($actionCounts['transactionId']) && $actionCounts['transactionId'] == 1
                && (!isset($actionCounts['card'])
                    || isset($actionCounts['card']) && $actionCounts['card'] == 0)
                && (!isset($actionCounts['token'])
                    || isset($actionCounts['token']) == 0));
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
