Imports System.Web.Mvc
Imports SecureSubmit
Imports SecureSubmit.Entities

Namespace Controllers
    Public Class HomeController
        Inherits Controller

        ' GET: Home
        Function Index() As ActionResult
            Return View()
        End Function

        ' GET: Process
        Function ProcessPayment() As ActionResult

            Dim config As Services.HpsServicesConfig
            Dim chargeService As Services.HpsCreditService
            Dim address As Entities.HpsAddress
            Dim cardHolder As Entities.HpsCardHolder
            Dim token, merchantDesc, merchantInvoice, customerNumber As String
            Dim response As Entities.HpsCharge
            Dim errorFlag As Boolean
            Dim amount As Decimal
            Dim txnDetails As HpsReportTransactionDetails = Nothing


            address = New Entities.HpsAddress
            cardHolder = New Entities.HpsCardHolder
            errorFlag = False

            ' Initialize the credit card charge service
            ' Remember to change public key in tokenization javascript on webpage (index.vbhtml) if you change this private key
            config = New SecureSubmit.Services.HpsServicesConfig With {
                     .SecretApiKey = "skapi_cert_MYl2AQAowiQAbLp5JesGKh7QFkcizOP2jcX9BrEMqQ",
                     .VersionNumber = "0000",
                     .DeveloperId = "000000"
            }
            chargeService = New Services.HpsCreditService(config)

            ' Get form values
            address.Address = Request.Form("address")
            address.City = Request.Form("city")
            address.State = Request.Form("state")
            address.Zip = Request.Form("zip")

            cardHolder.Email = Request.Form("email")
            cardHolder.FirstName = Request.Form("firstname")
            cardHolder.LastName = Request.Form("lastname")
            cardHolder.Address = address

            merchantDesc = Request.Form("MerchantDescription")
            merchantInvoice = Request.Form("MerchantInvoice")
            customerNumber = Request.Form("CustomerNumber")

            Dim details As HpsTransactionDetails
            details = New HpsTransactionDetails

            details.CustomerId = Request.Form("CustomerNumber")
            details.InvoiceNumber = Request.Form("MerchantInvoice")
            details.Memo = Request.Form("MerchantDescription")
            details.ClientTransactionId = Request.Form("ClientTransactionId")

            token = Request.Form("token_value")
            amount = If(Convert.ToDecimal(Request.Form("amount")) = 0, 13D, Convert.ToDecimal(Request.Form("amount")))

            ' Call Heartland with Charge
            response = chargeService.Charge(amount, "USD", token, cardHolder, False, "Descriptor", True, details)

            ' Get Txn Details
            If (response.ResponseCode = "00") Then
                txnDetails = chargeService.Get(response.TransactionId)
            End If

            ' Pass data into view
            ViewBag.details = txnDetails
            ViewBag.response = response
            ViewBag.errorFlag = errorFlag
            ViewBag.phone = Request.Form("phone")
            Return View("paymentDetails", response)
        End Function


    End Class

    Public Class paymentDetails
        Inherits Entities.HpsCharge

        Public Phone As String
    End Class

End Namespace