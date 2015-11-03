<?php

/**
 * A fluent interface for creating and executing an edit
 * transaction through the HpsCreditService.
 *
 * @method HpsCreditServiceEditBuilder withTransactionId(string $transactionId)
 * @method HpsCreditServiceEditBuilder withAmount(double $amount)
 * @method HpsCreditServiceEditBuilder withGratuity(double $gratuity)
 * @method HpsCreditServiceEditBuilder withClientTransactionId(string $clientTransactionId)
 */
class HpsCreditServiceEditBuilder extends HpsBuilderAbstract
{
    /** @var string|null */
    protected $transactionId       = null;

    /** @var double|null */
    protected $amount              = null;

    /** @var double|null */
    protected $gratuity            = null;

    /** @var string|null */
    protected $clientTransactionId = null;

    /**
     * Instatiates a new HpsCreditServiceEditBuilder
     *
     * @param HpsSoapGatewayService $service
     */
    public function __construct(HpsSoapGatewayService $service)
    {
        parent::__construct($service);
        $this->setUpValidations();
    }

    /**
     * Creates an edit transaction through the HpsCreditService
     */
    public function execute()
    {
        parent::execute();

        $editSvc = new HpsCreditService($this->service->servicesConfig());
        return $editSvc->edit(
            $this->transactionId,
            $this->amount,
            $this->gratuity,
            $this->clientTransactionId
        );
    }

    /**
     * Setups up validations for building edits.
     *
     * @return null
     */
    private function setUpValidations()
    {
        $this
            ->addValidation(array($this, 'transactionIdNotNull'), 'HpsArgumentException', 'Edit needs a transactionId');
    }

    /**
     * Ensures a transactionId has been set.
     *
     * @param array $actionCounts
     *
     * @return bool
     */
    protected function transactionIdNotNull($actionCounts)
    {
        return isset($actionCounts['transactionId']);
    }
}
