<?php

/**
 * A fluent interface for creating and executing an alias
 * transaction through the HpsGiftCardService.
 *
 * @method HpsGiftCardServiceAliasBuilder withCard(HpsGiftCard $card)
 * @method HpsGiftCardServiceAliasBuilder withAlias(string $alias)
 * @method HpsGiftCardServiceAliasBuilder withAction(string $action)
 */
class HpsGiftCardServiceAliasBuilder extends HpsBuilderAbstract
{
    /** @var HpsGiftCard|null */
    protected $card   = null;

    /** @var string|null */
    protected $alias  = null;

    /** @var string|null */
    protected $action = null;

    /**
     * Instatiates a new HpsGiftCardServiceAliasBuilder
     *
     * @param HpsSoapGatewayService $service
     */
    public function __construct(HpsSoapGatewayService $service)
    {
        parent::__construct($service);
        $this->setUpValidations();
    }

    /**
     * Creates an alias transaction through the HpsGiftCardService
     */
    public function execute()
    {
        parent::execute();

        $aliasSvc = new HpsGiftCardService($this->service->servicesConfig());
        return $aliasSvc->alias(
            $this->action,
            $this->card,
            $this->alias
        );
    }

    /**
     * Setups up validations for building aliases.
     *
     * @return null
     */
    private function setUpValidations()
    {
        $this
            ->addValidation(array($this, 'cardNotNull'), 'HpsArgumentException', 'Alias needs a card')
            ->addValidation(array($this, 'aliasNotNull'), 'HpsArgumentException', 'Alias needs an alias')
            ->addValidation(array($this, 'actionNotNull'), 'HpsArgumentException', 'Alias needs an action');
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
     * Ensures an alias has been set.
     *
     * @param array $actionCounts
     *
     * @return bool
     */
    protected function aliasNotNull($actionCounts)
    {
        return isset($actionCounts['alias']);
    }

    /**
     * Ensures a action has been set.
     *
     * @param array $actionCounts
     *
     * @return bool
     */
    protected function actionNotNull($actionCounts)
    {
        return isset($actionCounts['action']);
    }
}
