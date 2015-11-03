<?php

class HpsFluentGiftCardService extends HpsSoapGatewayService
{
    public function __construct($config = null)
    {
        parent::__construct($config);
    }

    public function withConfig($config)
    {
        $this->_config = $config;
        return $this;
    }

    public function activate($amount = null)
    {
        $builder = new HpsGiftCardServiceActivateBuilder($this);
        return $builder
            ->withAmount($amount)
            ->withCurrency('usd');
    }

    public function addValue($amount = null)
    {
        $builder = new HpsGiftCardServiceAddValueBuilder($this);
        return $builder
            ->withAmount($amount);
    }

    public function alias($amount = null)
    {
        $builder = new HpsGiftCardServiceAliasBuilder($this);
        return $builder
            ->withAmount($amount)
            ->withCurrency('usd');
    }

    public function balance()
    {
        return new HpsGiftCardServiceBalanceBuilder($this);
    }

    public function deactivate()
    {
        return new HpsGiftCardServiceDeactivateBuilder($this);
    }

    public function replace()
    {
        return new HpsGiftCardServiceReplaceBuilder($this);
    }

    public function reverse($amount = null)
    {
        $builder = new HpsGiftCardServiceReverseBuilder($this);
        return $builder
            ->withAmount($amount)
            ->withCurrency('usd');
    }

    public function reward($amount = null)
    {
        $builder = new HpsGiftCardServiceRewardBuilder($this);
        return $builder
            ->withAmount($amount)
            ->withCurrency('usd');
    }

    public function sale($amount = null)
    {
        $builder = new HpsGiftCardServiceSaleBuilder($this);
        return $builder
            ->withAmount($amount)
            ->withCurrency('usd');
    }

    public function void($transactionId = null)
    {
        $builder = new HpsGiftCardServiceVoidBuilder($this);
        return $builder
            ->withTransactionId($transactionId);
    }
}
