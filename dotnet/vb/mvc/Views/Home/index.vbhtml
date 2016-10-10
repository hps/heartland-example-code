<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="SecureSubmit VB MVC end-to-end payment example using tokenization.">
    <meta name="author" content="Mark Hagan">
    <title>Simple Payment Form Demo</title>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="/assets/securesubmit.js"></script>

    <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Asp.Net VB Mvc SecureSubmit Example</h1>
        <form Class="payment_form form-horizontal" id="payment_form" action="@Url.Action("ProcessPayment")" method="POST">
            <h2> Billing Information</h2>
            <div Class="form-group">
                <Label for="FirstName" class="col-sm-2 control-label">First Name</Label>
                <div Class="col-sm-10">
                    <input type="text" name="FirstName" />
                </div>
            </div>
            <div Class="form-group">
                <Label for="LastName" class="col-sm-2 control-label">Last Name</Label>
                <div Class="col-sm-10">
                    <input type="text" name="LastName" />
                </div>
            </div>
            <div Class="form-group">
                <Label for="PhoneNumber" class="col-sm-2 control-label">Phone Number</Label>
                <div Class="col-sm-10">
                    <input type="text" name="PhoneNumber" />
                </div>
            </div>
            <div Class="form-group">
                <Label for="Email" class="col-sm-2 control-label">Email</Label>
                <div Class="col-sm-10">
                    <input type="text" name="Email" />
                </div>
            </div>
            <div Class="form-group">
                <Label for="Address" class="col-sm-2 control-label">Address</Label>
                <div Class="col-sm-10">
                    <input type="text" name="Address" />
                </div>
            </div>
            <div Class="form-group">
                <Label for="City" class="col-sm-2 control-label">City</Label>
                <div Class="col-sm-10">
                    <input type="text" name="City" />
                </div>
            </div>
            <div Class="form-group">
                <Label for="State" class="col-sm-2 control-label">State</Label>
                <div Class="col-sm-10">
                    <select Name="State">
                        <option value="AL">Alabama</option>
                        <option value="AK"> Alaska</option>
                        <option value="AZ"> Arizona</option>
                        <option value="AR"> Arkansas</option>
                        <option value="CA"> California</option>
                        <option value="CO"> Colorado</option>
                        <option value="CT"> Connecticut</option>
                        <option value="DE"> Delaware</option>
                        <option value="DC"> District Of Columbia</option>
                        <option value="FL"> Florida</option>
                        <option value="GA"> Georgia</option>
                        <option value="HI"> Hawaii</option>
                        <option value="ID"> Idaho</option>
                        <option value="IL"> Illinois</option>
                        <option value="IN"> Indiana</option>
                        <option value="IA"> Iowa</option>
                        <option value="KS"> Kansas</option>
                        <option value="KY"> Kentucky</option>
                        <option value="LA"> Louisiana</option>
                        <option value="ME"> Maine</option>
                        <option value="MD"> Maryland</option>
                        <option value="MA"> Massachusetts</option>
                        <option value="MI"> Michigan</option>
                        <option value="MN"> Minnesota</option>
                        <option value="MS"> Mississippi</option>
                        <option value="MO"> Missouri</option>
                        <option value="MT"> Montana</option>
                        <option value="NE"> Nebraska</option>
                        <option value="NV"> Nevada</option>
                        <option value="NH"> New Hampshire</option>
                        <option value="NJ"> New Jersey</option>
                        <option value="NM"> New Mexico</option>
                        <option value="NY"> New York</option>
                        <option value="NC"> North Carolina</option>
                        <option value="ND"> North Dakota</option>
                        <option value="OH"> Ohio</option>
                        <option value="OK"> Oklahoma</option>
                        <option value="OR"> Oregon</option>
                        <option value="PA"> Pennsylvania</option>
                        <option value="RI"> Rhode Island</option>
                        <option value="SC"> South Carolina</option>
                        <option value="SD"> South Dakota</option>
                        <option value="TN"> Tennessee</option>
                        <option value="TX"> Texas</option>
                        <option value="UT"> Utah</option>
                        <option value="VT"> Vermont</option>
                        <option value="VA"> Virginia</option>
                        <option value="WA"> Washington</option>
                        <option value="WV"> West Virginia</option>
                        <option value="WI"> Wisconsin</option>
                        <option value="WY"> Wyoming</option>
                    </select>
                </div>
            </div>
            <Label for="Zip" class="col-sm-2 control-label">Zip</Label>
            <div Class="col-sm-10">
                <input type="text" name="Zip" />
            </div>
            <p><br /></p><br />

            <h2> Charge Information</h2>
            <div Class="form-group">
                <Label for="Amount" class="col-sm-2 control-label">Charge Amount</Label>
                <div Class="col-sm-10">
                    <input type="text" name="amount" />
                </div>
            </div>
            <div Class="form-group">
                <Label for="MerchantDescription" class="col-sm-2 control-label">Description [optional]</Label>
                <div Class="col-sm-10">
                    <input type="text" name="MerchantDescription" value="Example Description" />
                </div>
            </div>
            <div Class="form-group">
                <Label for="MerchantInvoice" class="col-sm-2 control-label">Invoice# [optional]</Label>
                <div Class="col-sm-10">
                    <input type="text" name="MerchantInvoice" value="1" />
                </div>
            </div>
            <div Class="form-group">
                <Label for="CustomerNumber" class="col-sm-2 control-label">Customer# [optional]</Label>
                <div Class="col-sm-10">
                    <input type="text" name="CustomerNumber" value="47" />
                </div>
            </div>
            <div Class="form-group">
                <Label for="ClientTransactionId" class="col-sm-2 control-label">Client Transaction# [optional]</Label>
                <div Class="col-sm-10">
                    <input type="text" name="ClientTransactionId" value="256" />
                </div>
            </div>

            <p><br /></p><br />

            <h2> Card Information</h2>
            <div style="margin-left:120px">
                <label for="iframesCardNumber">Card Number:</label>
                <div id="iframesCardNumber"></div>
                <label for="iframesCardExpiration">Card Expiration:</label>
                <div id="iframesCardExpiration"></div>
                <label for="iframesCardCvv">Card CVV:</label>
                <div id="iframesCardCvv"></div>
                <input type="text" style="visibility:hidden" id="token_value" name="token_value" />
                <br />
                <div id="iframesSubmit"></div>
            </div>
        </form>
    </div>
    <br />
    <script>

        (function (document, Heartland) {
            // Create a new `HPS` object with the necessary configuration
            var hps = new Heartland.HPS({
                publicKey: 'pkapi_cert_P6dRqs1LzfWJ6HgGVZ',
                type: 'iframe',
                // Configure the iframe fields to tell the library where
                // the iframe should be inserted into the DOM and some
                // basic options
                fields: {
                    cardNumber: {
                        target: 'iframesCardNumber',
                        placeholder: '•••• •••• •••• ••••'
                    },
                    cardExpiration: {
                        target: 'iframesCardExpiration',
                        placeholder: 'MM / YYYY'
                    },
                    cardCvv: {
                        target: 'iframesCardCvv',
                        placeholder: 'CVV'
                    },
                    submit: {
                        target: 'iframesSubmit'
                    }
                },
                // Collection of CSS to inject into the iframes.
                // These properties can match the site's styles
                // to create a seamless experience.
                style: {
                    'input': {
                        // 'background': '#fff',
                        // 'border': '1px solid',
                        // 'border-color': '#bbb3b9 #c7c1c6 #c7c1c6',
                        // 'box-sizing': 'border-box',
                        // 'font-family': 'serif',
                        // 'font-size': '16px',
                        // 'line-height': '1',
                        // 'margin': '0 .5em 0 0',
                        // 'max-width': '100%',
                        // 'outline': '0',
                        // 'padding': '0.5278em',
                        // 'vertical-align': 'baseline',
                        // 'width': '100%'
                    }
                },
                // Callback when a token is received from the service
                onTokenSuccess: function (resp) {
                    //alert('Here is a single-use token: ' + resp.token_value);
                    var tokenfield = document.getElementById("token_value")
                    tokenfield.value = resp.token_value
                    var form = document.getElementById("payment_form")
                    form.submit()
                },
                // Callback when an error is received from the service
                onTokenError: function (resp) {
                    alert('There was an error: ' + resp.error.message);
                },
                // Callback when an event is fired within an iFrame
                onEvent: function (ev) {
                    //console.log(ev);
                }
            });

            // Attach a handler to interrupt the form submission
            Heartland.Events.addHandler(document.getElementById('payment_form'), 'submit', function (e) {
                // Prevent the form from continuing to the `action` address
                e.preventDefault();
                // Tell the iframes to tokenize the data
                hps.Messages.post(
                  {
                      accumulateData: true,
                      action: 'tokenize',
                      message: 'pkapi_cert_jKc1FtuyAydZhZfbB3'
                  },
                  'cardNumber'
                );
            });
        }(document, Heartland));

    </script>
</body>
</html>