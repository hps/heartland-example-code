
<h2>Credit Sale Transaction Result</h2>
<h5>Values from the credit sale response object</h5>
<div>
    <hr />
    <dl class="dl-horizontal">
        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/webframe.html#Portico%20Schema_xsd~c-CreditSaleReqBlock1Type~e-GatewayTxnId.html" target="_blank">Transaction ID</a>:
        </dt>
        <dd>
            @ViewBag.response.TransactionId
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-RspCode.html" target="_blank">Response Code</a>
        </dt>
        <dd>
            @ViewBag.response.ResponseCode
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-RspText.html" target="_blank">Response Text</a>
        </dt>
        <dd>
            @ViewBag.response.ResponseText
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-RefNbr.html" target="_blank">Reference Number</a>
        </dt>

        <dd>
            @ViewBag.response.ReferenceNumber
        </dd>
        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-AuthCode.html" target="_blank">Authorization Code</a>
        </dt>

        <dd>
            @ViewBag.response.AuthorizationCode
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-AVSRsltCode.html" target="_blank">Avs Result Code</a>  
        </dt>

        <dd>
            @ViewBag.response.AvsResultCode
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-CVVRsltCode.html" target="_blank">Cvv Result Code</a>
        </dt>

        <dd>
            @ViewBag.response.CvvResultCode
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-AVSRsltText.html" target="_blank">Avs Result Text</a>
        </dt>
        <dd>
            @ViewBag.response.AvsResultText
        </dd>

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-CVVRsltCode.html" target="_blank">Cvv Result Text</a>
        </dt>
        <dd>
            @ViewBag.response.CvvResultText
        </dd>

        @code
            If Not ViewBag.response.AuthorizedAmount = "0" Then
        End Code
        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-AuthAmt.html" target="_blank">Authorized Amount</a>
        </dt>

        <dd>
            @FormatCurrency(ViewBag.response.AuthorizedAmount, , , TriState.True, TriState.True)
        </dd>
        @code
            End If
        End Code
        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-CardType.html" target="_blank">Card Type</a>
        </dt>

        <dd>
            @ViewBag.response.CardType
        </dd>
        @code
            If Not ViewBag.response.Descriptor = "" Then
        End Code

        <dt>
            <a href="https://cert.api2.heartlandportico.com/Gateway/PorticoSOAPSchema/build/Default/Portico%20Schema_xsd~c-AuthRspStatusType~e-TxnDescriptor.html" target="_blank">Descriptor</a>
        </dt>

        <dd>
            @ViewBag.response.Descriptor
        </dd>
        @code
            End If
        End Code
    </dl>
</div>
<p><br/></p>
@code
    If Not (ViewBag.details Is Nothing) Then
        Html.RenderPartial("_TransactionDetails")
    End If
End Code

<p>
    @Html.ActionLink("Return to Payment Page", "Index")
</p>
