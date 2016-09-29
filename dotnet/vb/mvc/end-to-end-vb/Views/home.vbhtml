@Code
    ViewData("Title") = "home"
End Code

<h2>home</h2>



<form id="payment_form" method="post" action="/process">
    <!-- Your payment fields go here -->
    <dt><label for="iframesCardNumber">Card Number:</label></dt>
    <dd><div id="iframesCardNumber"></div></dd>

    <dt><label for="iframesCardExpiration">Card Expiration:</label></dt>
    <dd><div id="iframesCardExpiration"></div></dd>

    <dt><label for="iframesCardCvv">Card CVV:</label></dt>
    <dd><div id="iframesCardCvv"></div></dd>

    <br />
    <div id="iframesSubmit"></div>

    <!-- Regular input fields are ok, too -->
    <input type="hidden" name="payment_token" />
</form>