<?php

/**
 * A fluent interface for creating and executing a sale
 * transaction through the HpsCheckService.
 *
 * @method HpsCheckServiceSaleBuilder withCheck(HpsCheck $check)
 * @method HpsCheckServiceSaleBuilder withAmount(double $amount)
 * @method HpsCheckServiceSaleBuilder withClientTransactionId(string $clientTransactionId)
 */
class HpsCheckServiceSaleBuilder extends HpsBuilderAbstract
{
    /** @var HpsCheck|null */
    protected $check               = null;

    /** @var double|null */
    protected $amount              = null;

    /** @var string|null */
    protected $clientTransactionId = null;

    /**
     * Instatiates a new HpsCheckServiceSaleBuilder
     *
     * @param HpsSoapGatewayService $service
     */
    public function __construct(HpsSoapGatewayService $service)
    {
        parent::__construct($service);
        $this->setUpValidations();
    }

    /**
     * Creates a sale transaction through the HpsCheckService
     */
    public function execute()
    {
        parent::execute();

        $saleSvc = new HpsCheckService($this->service->servicesConfig());
        return $saleSvc->sale(
            $this->check,
            $this->amount,
            $this->clientTransactionId
        );
    }

    /**
     * Setups up validations for building sales.
     *
     * @return null
     */
    private function setUpValidations()
    {
        $this
            ->addValidation(array($this, 'checkNotNull'), 'HpsArgumentException', 'Sale needs a check')
            ->addValidation(array($this, 'amountNotNull'), 'HpsArgumentException', 'Sale needs an amount');
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
     * Ensures a check has been set.
     *
     * @param array $actionCounts
     *
     * @return bool
     */
    protected function checkNotNull($actionCounts)
    {
        return isset($actionCounts['check']);
    }
}
