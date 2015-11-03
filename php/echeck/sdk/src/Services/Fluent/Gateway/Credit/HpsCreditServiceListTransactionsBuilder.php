<?php

/**
 * A fluent interface for creating and executing a listTransactions
 * transaction through the HpsCreditService.
 *
 * @method HpsCreditServiceListTransactionsBuilder withStartDate(string $startDate)
 * @method HpsCreditServiceListTransactionsBuilder withEndDate(string $endDate)
 * @method HpsCreditServiceListTransactionsBuilder withFilterBy(integer|string $filterBy)
 * @method HpsCreditServiceListTransactionsBuilder withClientTransactionId(string $clientTransactionId)
 */
class HpsCreditServiceListTransactionsBuilder extends HpsBuilderAbstract
{
    /** @var string|null */
    protected $startDate = null;

    /** @var string|null */
    protected $endDate   = null;

    /** @var integer|string|null */
    protected $filterBy  = null;

    /**
     * Instatiates a new HpsCreditServiceListTransactionsBuilder
     *
     * @param HpsSoapGatewayService $service
     */
    public function __construct(HpsSoapGatewayService $service)
    {
        parent::__construct($service);
        $this->setUpValidations();
    }

    /**
     * Creates a listTransactions transaction through the HpsCreditService
     */
    public function execute()
    {
        parent::execute();

        $listTransactionsSvc = new HpsCreditService($this->service->servicesConfig());
        return $listTransactionsSvc->listTransactions(
            $this->startDate,
            $this->endDate,
            $this->filterBy
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
            ->addValidation(array($this, 'startDateNotNull'), 'HpsArgumentException', 'ListTransactions needs a startDate')
            ->addValidation(array($this, 'endDateNotNull'), 'HpsArgumentException', 'ListTransactions needs an endDate');
    }

    /**
     * Ensures a startDate has been set.
     *
     * @param array $actionCounts
     *
     * @return bool
     */
    protected function startDateNotNull($actionCounts)
    {
        return isset($actionCounts['startDate']);
    }

    /**
     * Ensures an endDate has been set.
     *
     * @param array $actionCounts
     *
     * @return bool
     */
    protected function endDateNotNull($actionCounts)
    {
        return isset($actionCounts['endDate']);
    }
}
