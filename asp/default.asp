<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<%
    If Request.ServerVariables("REQUEST_METHOD") = "POST" Then        
        'verify that the tokenization process worked properly.
        if Request.Form("token_value") = "" then
            Response.Write("<hr>The secure submit tokenization attempt failed<hr>")
            Response.Flush
            Response.End
        else
            response.write("<hr>Tokenized Card Value = " + Request.Form("token_value") + "<hr>")
            dim objXMLDocument
            set objXMLDocument = CreateObject("Msxml2.DOMDocument.6.0")            
            'See the SOAP UI project for more samples of the various types of Portico Gateway calls
            'This example uses the XML for a Credit Sale. Replace the 'SecretAPIKey' with the value
            'you get from the developer portal. Note you'll also need to replace the public key in the
            'javascript at the bottom of the page.
            objXMLDocument.loadXML("<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:hps='http://Hps.Exchange.PosGateway'> " + _
	                            "<soapenv:Header/>"+ _
	                            "<soapenv:Body>"+ _
		                            "<hps:PosRequest clientType='' clientVer=''>"+ _
			                            "<hps:Ver1.0>"+ _
				                            "<hps:Header>"+ _
					                            "<hps:SecretAPIKey>skapi_cert_MYl2AQAowiQAbLp5JesGKh7QFkcizOP2jcX9BrEMqQ</hps:SecretAPIKey>"+ _	
				                            "</hps:Header>"+ _
				                            "<hps:Transaction>"+ _
					                            "<hps:CreditSale>"+ _
						                            "<hps:Block1>"+ _
							                            "<hps:CardData>"+ _
								                            "<hps:TokenData>"+ _
									                            "<hps:TokenValue>"+request.form("token_value")+"</hps:TokenValue>"+ _
								                            "</hps:TokenData>"+ _
							                            "</hps:CardData>"+ _
							                            "<hps:Amt>"+request.form("charge_amount")+"</hps:Amt>"+ _
							                            "<hps:AllowDup>Y</hps:AllowDup>"+ _
						                            "</hps:Block1>"+ _
					                            "</hps:CreditSale>"+ _
				                            "</hps:Transaction>"+ _
			                            "</hps:Ver1.0>"+ _
		                            "</hps:PosRequest>"+ _
	                            "</soapenv:Body>"+ _
                            "</soapenv:Envelope>")
    
            Set oXMLHTTP = CreateObject("MSXML2.ServerXMLHTTP.6.0")

            oXMLHTTP.Open "POST", "https://cert.api2.heartlandportico.com/Hps.Exchange.PosGateway/PosGatewayService.asmx", False
            oXMLHTTP.Send objXMLDocument
    
            GetTextFromUrl = oXMLHTTP.responseText

            response.write("<HR>Payment Gateway Response Status =" + Cstr(oXMLHTTP.Status) + "<hr>")
    
            response.write(Server.HTMLEncode(GetTextFromUrl))
            response.Flush
            response.End
        end if    
    End If
    
%>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="SecureSubmit C# WebForms end-to-end payment example using tokenization.">
    <meta name="author" content="Clayton Hunt">
    <title>Simple Payment Form Demo</title>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="assets/jquery.securesubmit.js"></script>

    <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- FORM -->
    <div class="container">
        <h1>Classic ASP SecureSubmit Example</h1>
        <form class="payment_form form-horizontal" id="payment_form" method="post">
            <h2>Billing Information</h2>
            <div class="form-group">
                <label for="FirstName" class="col-sm-2 control-label">First Name</label>
                <div class="col-sm-10">
                    <input type="text" name="FirstName" id="firstname" />
                </div>
            </div>
            <div class="form-group">
                <label for="LastName" class="col-sm-2 control-label">Last Name</label>
                <div class="col-sm-10">
                    <input type="text" name="LastName" id="lastname" />
                </div>
            </div>
            <div class="form-group">
                <label for="PhoneNumber" class="col-sm-2 control-label">Phone Number</label>
                <div class="col-sm-10">
                    <input type="text" name="PhoneNumber" id="phonenumber" />
                </div>
            </div>
            <div class="form-group">
                <label for="Email" class="col-sm-2 control-label">Email</label>
                <div class="col-sm-10">
                    <input type="text" name="Email" id="email" />
                </div>
            </div>
            <div class="form-group">
                <label for="Address" class="col-sm-2 control-label">Address</label>
                <div class="col-sm-10">
                    <input type="text" name="Address" id="address" />
                </div>
            </div>
            <div class="form-group">
                <label for="City" class="col-sm-2 control-label">City</label>
                <div class="col-sm-10">
                    <input type="text" name="City" id="city" />
                </div>
            </div>
            <div class="form-group">
                <label for="State" class="col-sm-2 control-label">State</label>
                <div class="col-sm-10">
                    <select name="State" id="state">
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="Zip" class="col-sm-2 control-label">Zip</label>
                <div class="col-sm-10">
                    <input type="text" name="Zip" id="zip" />
                </div>
            </div>

            <h2>Card Information</h2>
            <div class="form-group">
                <label for="card_number" class="col-sm-2 control-label">Card Number</label>
                <div class="col-sm-10">
                    <input type="text" id="card_number" />
                </div>
            </div>
            <div class="form-group">
                <label for="card_cvc" class="col-sm-2 control-label">CVC</label>
                <div class="col-sm-10">
                    <input type="text" id="card_cvc" />
                </div>
            </div>
            <div class="form-group">
                <label for="exp_month" class="col-sm-2 control-label">Expiration Date</label>
                <div class="col-sm-10">
                    <select id="exp_month">
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
                    /
		<select id="exp_year"></select>
                </div>
            </div>
            <br />
            <div class="form-group">
                <label for="charge_amount" class="col-sm-2 control-label">Charge Amount</label>
                <div class="col-sm-10">
                    <input type="text" id="charge_amount" name="charge_amount"/>
                </div>
            </div>
            <br />
            <input type="button" value="Autofill Form" onclick="autofillform();" />
            &nbsp;&nbsp;
            <input type="button" value="Clear Form" onlcick="document.getElementById('payment_form').reset(); return true;" />&nbsp;&nbsp;
            <input type="submit" value="Submit Payment" id="PaymentButton" /><br>
        </form>
    </div>
    <script>
        // Replace the public key with your public key value from the developer portal        
	    jQuery("#payment_form").SecureSubmit({
	        public_key: "pkapi_cert_P6dRqs1LzfWJ6HgGVZ",
	        error: function (response) {
	            alert(response.message);
	        }
	    });

    </script>
    <script type="text/javascript">
        var myselect = document.getElementById("exp_year"), year = new Date().getFullYear();
        var gen = function (max) { do { myselect.add(new Option(year++), null); } while (max-- > 0); }(10);

        function autofillform() {
            $('#firstname').val('Kevin');
            $('#lastname').val('Flynn');
            $('#phonenumber').val('5555555555');
            $('#email').val('example@example.com');
            $('#address').val('one heartland way');
            $('#city').val('jeffersonville');
            $('#state').val('IN');
            $('#zip').val('47130');
            $('#card_number').val('4012002000060016');
            $('#card_cvc').val('123');
            $('#exp_month').val('12');
            $('#exp_year').val('2025');
            $('#charge_amount').val('5.00');
        };
    </script>


</body>
</html>
