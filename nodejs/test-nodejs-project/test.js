var HpsCreditService = require('portico-sdk').HpsCreditService;

var cardHolder = {
    address: { zip: "47130" }    // Zip is the only required address field.
};
var card = { // Valid Visa
  cvv: '123',
  expMonth: '12',
  expYear: '2016',
  number: '4012002000060016'
};
var config = {
  secretApiKey: 'skapi_cert_MfqdAABFdRgACIyoNBRhMvZtYdDxFS1FAVKT0wpRwQ',
  versionNumber: '0000',
  developerId: '000000'
};
var serviceUri = 'https://posgateway.cert.secureexchange.net/Hps.Exchange.PosGateway/PosGatewayService.asmx';

var creditService = new HpsCreditService(config, serviceUri);
creditService.authorizeWithCard(10, "usd", card, cardHolder, false, null, function (err, response) {
  if (err) {
    console.log(err);
    // handle error
    return;
  }
  // Do something with response
  console.log(['transactionId:', response.transactionId].join(''));
});
