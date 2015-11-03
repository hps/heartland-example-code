<?php

class HpsEncryptionData
{
    public $version = null;

    /**
     * This is required in certain encryption versions when supplying
     * track data and indicates which track has been supplied.
     *
     * @var null
     */
    public $encryptedTrackNumber = null;

    /**
     * This is requied in certain encryption versions;
     * the Key Transmission Block (KTB) used at the point of sale.
     *
     * @var null
     */
    public $ktb = null;

    /**
     * This is required in certain encryption versions;
     * the Key Serial Number (KSN) used at the point of sale.
     *
     * @var null
     */
    public $ksn = null;
}
