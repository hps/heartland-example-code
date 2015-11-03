<?php

class HpsDirectMarketData
{
    public $invoiceNumber = null;
    public $shipMonth     = null;
    public $shipDay       = null;

    public function __construct($invoiceNumber = null, $shipMonth = null, $shipDay = null)
    {
        $this->invoiceNumber = $invoiceNumber;
        $this->shipMonth = $shipMonth;
        $this->shipDay = $shipDay;
    }
}
