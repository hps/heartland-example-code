<?php

class HpsFluentCreditService extends HpsSoapGatewayService
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

    public function authorize($amount = null)
    {
        $builder = new HpsCreditServiceAuthorizeBuilder($this);
        return $builder
            ->withAmount($amount)
            ->withCurrency('usd');
    }

    public function capture($transactionId = null)
    {
        $builder = new HpsCreditServiceCaptureBuilder($this);
        return $builder
            ->withTransactionId($transactionId);
    }

    public function charge($amount = null)
    {
        $builder = new HpsCreditServiceChargeBuilder($this);
        return $builder
            ->withAmount($amount)
            ->withCurrency('usd');
    }

    public function cpcEdit()
    {
        return new HpsCreditServiceCpcEditBuilder($this);
    }

    public function edit()
    {
        return new HpsCreditServiceEditBuilder($this);
    }

    public function get($transactionId = null)
    {
        $builder = new HpsCreditServiceGetBuilder($this);
        return $builder
            ->withTransactionId($transactionId);
    }

    public function listTransactions()
    {
        return new HpsCreditServiceListTransactionsBuilder($this);
    }

    public function refund($amount = null)
    {
        $builder = new HpsCreditServiceRefundBuilder($this);
        return $builder
            ->withAmount($amount)
            ->withCurrency('usd');
    }

    public function reverse($amount = null)
    {
        $builder = new HpsCreditServiceReverseBuilder($this);
        return $builder
            ->withAmount($amount)
            ->withCurrency('usd');
    }

    public function verify()
    {
        return new HpsCreditServiceVerifyBuilder($this);
    }

    public function void($transactionId = null)
    {
        $builder = new HpsCreditServiceVoidBuilder($this);
        return $builder
            ->withTransactionId($transactionId);
    }
}
