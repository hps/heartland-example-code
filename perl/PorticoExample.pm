use LWP::UserAgent; # Mozilla::CA
use HTTP::Request;
use XML::Simple;

# Create new request
#
# NOTE: Simply post the XML to our gateway server.
#       Certification URL is https://cert.api2.heartlandportico.com/Hps.Exchange.PosGateway/PosGatewayService.asmx
#       Production URL is https://api2.heartlandportico.com/Hps.Exchange.PosGateway/PosGatewayService.asmx
my $request = HTTP::Request->new(POST => 'https://cert.api2.heartlandportico.com/Hps.Exchange.PosGateway/PosGatewayService.asmx');

# Create XML request
#
# This is where your transaction data goes.
# Feel free to abstract this away to aid your development.
#
# NOTE: Basic example of a CreditSale SOAP request.
#       Notice the Header section has your authentication information in it.
#       SecretApiKeys for our certification environment are prefixed with skapi_cert_.
#       You will need to change your keys when moving to production skapi_prod_.
my $request_body = <<'XML_REQUEST';
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:hps="http://Hps.Exchange.PosGateway">
  <soapenv:Header/>
  <soapenv:Body>
    <hps:PosRequest clientType="" clientVer="">
      <hps:Ver1.0>
        <hps:Header>
          <hps:DeveloperID>123456</hps:DeveloperID>
          <hps:VersionNbr>1234</hps:VersionNbr>
          <hps:SecretAPIKey>skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A</hps:SecretAPIKey>
        </hps:Header>
        <hps:Transaction>
          <hps:CreditSale>
            <hps:Block1>
              <hps:CardData>
                <hps:ManualEntry>
                  <hps:CardNbr>4242424242424242</hps:CardNbr>
                  <hps:ExpMonth>06</hps:ExpMonth>
                  <hps:ExpYear>2021</hps:ExpYear>
                </hps:ManualEntry>
                <hps:TokenRequest>Y</hps:TokenRequest>
              </hps:CardData>
              <hps:Amt>13.01</hps:Amt>
              <hps:CardHolderData>
                <hps:CardHolderZip>47130</hps:CardHolderZip>
              </hps:CardHolderData>
              <hps:AllowDup>Y</hps:AllowDup>
            </hps:Block1>
          </hps:CreditSale>
        </hps:Transaction>
      </hps:Ver1.0>
    </hps:PosRequest>
  </soapenv:Body>
</soapenv:Envelope>
XML_REQUEST

# Set request headers
$request->header('SOAPAction' => '""');
$request->header('Accept' => 'text/xml');
$request->header('Content-type' => 'text/xml;charset="utf-8"');
$request->header('Content-length' => length($request_body));

# Set request body
$request->content($request_body);

# Send request to server and obtain response
my $ua = LWP::UserAgent->new;
my $response = $ua->request($request);

# Parse response body as XML
my $xml = XMLin($response->decoded_content);

if ($response->is_success) {
  # Received a successful response

  # Grab main node
  my $version10 = $xml->{'soap:Body'}->{'PosResponse'}->{'Ver1.0'};

  # Do something with the data we want
  print 'Transaction ID : ' . $version10->{'Header'}->{'GatewayTxnId'} . "\n";
  print 'Response Code  : ' . $version10->{'Transaction'}->{'CreditSale'}->{'RspCode'} . "\n";
  print 'Response Text  : ' . $version10->{'Transaction'}->{'CreditSale'}->{'RspText'} . "\n";
} else {
  # Received a failure response

  # Grab main node
  my $fault = $xml->{'soap:Body'}->{'soap:Fault'};

  # Do something with the data we want
  print 'Fault String : ' . $fault->{'faultstring'} . "\n";
}
