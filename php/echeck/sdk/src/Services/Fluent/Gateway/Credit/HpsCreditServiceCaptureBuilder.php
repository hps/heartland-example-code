<?php

/**
 * A fluent interface for creating and executing a capture
 * transaction through the HpsCreditService.
 *
 * @method HpsCreditServiceCaptureBuilder withTransactionId(string $transactionId)
 * @method HpsCreditServiceCaptureBuilder withAmount(double $amount)
 * @method HpsCreditServiceCaptureBuilder withGratuity(double $gratuity)
 * @method HpsCreditServiceCaptureBuilder withClientTransactionId(string $clientTransactionId)
 * @method HpsCreditServiceCaptureBuilder withDirectMarketData(HpsDirectMarketData $directMarketData)
 */
class HpsCreditServiceCaptureBuilder extends HpsBuilderAbstract
{
    /** @var string|null */
    protected $transactionId       = null;

    /** @var double|null */
    protected $amount              = null;

    /** @var double|null */
    protected $gratuity            = null;

    /** @var string|null */
    protected $clientTransactionId = null;

    /** @var HpsDirectMarketData|null */
    protected $directMarketData    = null;

    /**
     * Instatiates a new HpsCreditServiceCaptureBuilder
     *
     * @param HpsSoapGatewayService $service
     */
    public function __construct(HpsSoapGatewayService $service)
    {
        parent::__construct($service);
        $this->setUpValidations();
    }

    /**
     * Creates a capture transaction through the HpsCreditService
     */
    public function execute()
    {
        parent::execute();

        $captureSvc = new HpsCreditService($this->service->servicesConfig());
        return $captureSvc->capture(
            $this->transactionId,
            $this->amount,
            $this->gratuity,
            $this->clientTransactionId,
            $this->directMarketData
        );
    }

    /**
     * Setups up validations for building captures.
     *
     * @return null
     */
    private function setUpValidations()
    {
        $this
            ->addValidation(array($this, 'transactionIdNotNull'), 'HpsArgumentException', 'Capture needs a transactionId');
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
