<?php

class HpsFluentCheckService extends HpsSoapGatewayService
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

    public function override($amount = null)
    {
        $builder = new HpsCheckServiceOverrideBuilder($this);
        return $builder
            ->withAmount($amount);
    }

    public function returnCheck($amount = null)
    {
        $builder = new HpsCheckServiceReturnBuilder($this);
        return $builder
            ->withAmount($amount);
    }

    public function sale($amount = null)
    {
        $builder = new HpsCheckServiceSaleBuilder($this);
        return $builder
            ->withAmount($amount);
    }

    public function void($transactionId = null)
    {
        $builder = new HpsCheckServiceVoidBuilder($this);
        return $builder
            ->withTransactionId($transactionId);
    }
}
