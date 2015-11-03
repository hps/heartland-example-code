<?php

/**
 * A fluent interface for creating and executing a sale
 * transaction through the HpsGiftCardService.
 *
 * @method HpsGiftCardServiceSaleBuilder withCard(HpsGiftCard $card)
 * @method HpsGiftCardServiceSaleBuilder withAmount(double $amount)
 * @method HpsGiftCardServiceSaleBuilder withCurrency(string $currency)
 * @method HpsGiftCardServiceRewardBuilder withGratuity(double $gratuity)
 * @method HpsGiftCardServiceRewardBuilder withTax(double $tax)
 */
class HpsGiftCardServiceSaleBuilder extends HpsBuilderAbstract
{
    /** @var HpsGiftCard|null */
    protected $card     = null;

    /** @var double|null */
    protected $amount   = null;

    /** @var string */
    protected $currency = 'usd';

    /** @var double|null */
    protected $gratuity = null;

    /** @var double|null */
    protected $tax      = null;

    /**
     * Instatiates a new HpsGiftCardServiceSaleBuilder
     *
     * @param HpsSoapGatewayService $service
     */
    public function __construct(HpsSoapGatewayService $service)
    {
        parent::__construct($service);
        $this->setUpValidations();
    }

    /**
     * Creates a sale transaction through the HpsGiftCardService
     */
    public function execute()
    {
        parent::execute();

        $saleSvc = new HpsGiftCardService($this->service->servicesConfig());
        return $saleSvc->sale(
            $this->card,
            $this->amount,
            $this->currency,
            $this->gratuity,
            $this->tax
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
            ->addValidation(array($this, 'cardNotNull'), 'HpsArgumentException', 'Sale needs a card')
            ->addValidation(array($this, 'amountNotNull'), 'HpsArgumentException', 'Sale needs an amount')
            ->addValidation(array($this, 'currencyNotNull'), 'HpsArgumentException', 'Sale needs a currency');
    }

    /**
     * Ensures a card has been set.
     *
     * @param array $actionCounts
     *
     * @return bool
     */
    protected function cardNotNull($actionCounts)
    {
        return isset($actionCounts['card']);
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
