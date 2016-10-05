<h2>Transaction Report Details</h2>
<h5>Details retrieved from a seperate <i>charge.get(transactionId)</i> call. Note: all fields are shown even though not all will be applicable for the transaction type called.</h5>
<div>
    <hr />
    <dl class="dl-horizontal">
        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-AuthCode.html" target="_blank" ">Authorization Code</a>:
        </dt>
        <dd>
            @ViewBag.details.AuthorizationCode
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-AuthAmt.html" target="_blank">Authorized Amount:</a>
        </dt>
        <dd>
            @ViewBag.details.AuthorizedAmount
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-AVSRsltCode.html" target="_blank"> AVS Result Code</a>:
        </dt>
        <dd>
            @ViewBag.details.AvsResultCode
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-AVSRsltText.html" target="_blank">Avs Result Text</a>:
        </dt>
        <dd>
            @ViewBag.details.AvsResultText
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-CardType.html" target="_blank">Card Type</a>:
        </dt>
        <dd>
            @ViewBag.details.CardType
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-PosReportTxnDetailRspType~e-ClientTxnId.html" target="_blank">Client Transaction Id</a>:
        </dt>
        <dd>
            @ViewBag.details.ClientTransactionId
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-CPCInd.html" target="_blank">Cpc Indicator</a>:
        </dt>
        <dd>
            @ViewBag.details.CpcIndicator
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/webframe.html#Portico%20Schema_xsd~c-AdditionalTxnFieldsType~e-CustomerID.html" target="_blank">Customer Id</a>:
        </dt>
        <dd>
            @ViewBag.details.CustomerId
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-PosReportTxnDetailRspType~e-Data~e-CVVRsltCode.html" target="_blank">Cvv Result Code</a>:
        </dt>
        <dd>
            @ViewBag.details.CvvResultCode
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-PosReportTxnDetailRspType~e-Data~e-CVVRsltText.html" target="_blank">Cvv Result Text</a>:
        </dt>
        <dd>
            @ViewBag.details.CvvResultText
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/webframe.html#Portico%20Schema_xsd~c-AuthRspStatusType~e-TxnDescriptor.html" target="_blank">Descriptor</a>:
        </dt>
        <dd>
            @ViewBag.details.Descriptor
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-EMVIssuerResp.html" target="_blank">EMV Issuer Response</a>:
        </dt>
        <dd>
            @ViewBag.details.EMVIssuerResp
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AdditionalTxnFieldsType~e-InvoiceNbr.html" target="_blank">Invoice Number</a>:
        </dt>
        <dd>
            @ViewBag.details.InvoiceNumber
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/webframe.html#Portico%20Schema_xsd~c-PosReportTxnDetailRspType~e-Data~e-IssTxnId.html" target="_blank">Issuer Transaction Id</a>:
        </dt>
        <dd>
            @ViewBag.details.IssuerTransactionId
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-PosReportTxnDetailRspType~e-Data~e-IssValidationCode.html" target="_blank">Issuer Validation Code</a>:
        </dt>
        <dd>
            @ViewBag.details.IssuerValidationCode
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/webframe.html#Portico%20Schema_xsd~c-PosReportTxnDetailRspType~e-Data~e-MaskedCardNbr.html" target="_blank">Masked Card Number</a>:
        </dt>
        <dd>
            @ViewBag.details.MaskedCardNumber
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/webframe.html#Portico%20Schema_xsd~c-AdditionalTxnFieldsType~e-Description.html" target="_blank">Memo</a>:
        </dt>
        <dd>
            @ViewBag.details.Memo
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/webframe.html#Portico%20Schema_xsd~c-AttachmentRspDataType~e-GatewayTxnId.html" target="_blank">Original Transaction Id</a>:
        </dt>
        <dd>
            @ViewBag.details.OriginalTransactionId
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/webframe.html#Portico%20Schema_xsd~c-PosReportTxnDetailRspType~e-Data~e-TxnStatus.html" target="_blank">Transaction Status</a>:
        </dt>
        <dd>
            @ViewBag.details.TransactionStatus
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/webframe.html#Portico%20Schema_xsd~c-PosReportTxnDetailRspType~e-ServiceName.html" target="_blank">Transaction Type</a>:
        </dt>
        <dd>
            @ViewBag.details.TransactionType
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/webframe.html#Portico%20Schema_xsd~c-PosReportTxnDetailRspType~e-ReqUtcDT.html" target="_blank">Transaction Utc Date</a>:
        </dt>
        <dd>
            @ViewBag.details.TransactionUtcDate
        </dd>

    </dl>
</div>

