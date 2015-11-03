<?php

class HpsGiftCard
{
    public $number         = null;
    public $expMonth       = null;
    public $expYear        = null;
    public $isTrackData    = false;
    public $encryptionData = null;

    public function __construct($number = null)
    {
        $this->number = $number;
    }
}
