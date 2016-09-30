Imports SecureSubmit.Infrastructure
Imports SecureSubmit.Services
Imports SecureSubmit.Services.Credit
Imports SecureSubmit.Entities
Imports SecureSubmit.Serialization
Imports System.Net

Module Module1

    Sub Main()
        Dim config As HpsServicesConfig = New HpsServicesConfig()
        With config
            .SecretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A"
        End With

        config.DeveloperId = "000000"
        config.VersionNumber = "0000"
        Dim credit_service As New HpsCreditService(config)

        Dim token_service As New HpsTokenService("pkapi_cert_jKc1FtuyAydZhZfbB3")
        Dim creditCard As New HpsCreditCard
        creditCard.Number = "4012002000060016"
        creditCard.Cvv = "123"
        creditCard.ExpMonth = "12"
        creditCard.ExpYear = "2025"
        Dim cardHolder As New HpsCardHolder
        cardHolder.Address = New HpsAddress()
        cardHolder.Address.Zip = "750241234"
        Dim token = token_service.GetToken(creditCard)
        Try
            Dim authorization As HpsAuthorization = credit_service.Authorize(10, "usd", token.token_value)
            Console.WriteLine(authorization.AuthorizationCode)
        Catch ex As HpsException
            Console.WriteLine(ex.InnerException)
            Console.WriteLine(ex.Message)
            'Console.WriteLine(ex.Code)
        End Try
        Console.ReadLine()
    End Sub

End Module
