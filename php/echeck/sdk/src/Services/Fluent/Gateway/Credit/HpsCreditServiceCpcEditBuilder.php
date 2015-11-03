<?php

/**
 * A fluent interface for creating and executing a cpcEdit
 * transaction through the HpsCreditService.
 *
 * @method HpsCreditServiceCpcEditBuilder withTransactionId(string $transactionId)
 * @method HpsCreditServiceCpcEditBuilder withDirectMarketData(HpsCPCData $cpcData)
 */
class HpsCreditServiceCpcEditBuilder extends HpsBuilderAbstract
{
    /** @var string|null */
    protected $transactionId = null;

    /** @var HpsCPCData|null */
    protected $cpcData       = null;

    /**
     * Instatiates a new HpsCreditServiceCpcEditBuilder
     *
     * @param HpsSoapGatewayService $service
     */
    public function __construct(HpsSoapGatewayService $service)
    {
        parent::__construct($service);
        $this->setUpValidations();
    }

    /**
     * Creates a cpcEdit transaction through the HpsCreditService
     */
    public function execute()
    {
        parent::execute();

        $cpcEditSvc = new HpsCreditService($this->service->servicesConfig());
        return $cpcEditSvc->cpcEdit(
            $this->transactionId,
            $this->cpcData
        );
    }

    /**
     * Setups up validations for building cpcEdits.
     *
     * @return null
     */
    private function setUpValidations()
    {
        $this
            ->addValidation(array($this, 'transactionIdNotNull'), 'HpsArgumentException', 'CpcEdit needs a transactionId')
            ->addValidation(array($this, 'cpcDataNotNull'), 'HpsArgumentException', 'CpcEdit needs cpcData');
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

    /**
     * Ensures cpcData has been set.
     *
     * @param array $actionCounts
     *
     * @return bool
     */
    protected function cpcDataNotNull($actionCounts)
    {
        return isset($actionCounts['cpcData']);
    }
}
