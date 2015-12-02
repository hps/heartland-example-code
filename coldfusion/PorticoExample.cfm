i<!--- NOTE: Basic example of a CreditSale SOAP request
    Notice the Header section has your authentication information in it
    SecretApiKeys for our certification environment are prefixed with skapi_cert_
    You will need to change your keys when moving to production skapi_prod_ --->
<cfxml variable="gatewayRequest">
  <?xml version="1.0" encoding="UTF-8"?>
  <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
                     xmlns:ns1="http://Hps.Exchange.PosGateway">
      <SOAP-ENV:Body>
          <ns1:PosRequest>
              <ns1:Ver1.0>
                  <ns1:Header>
                      <!--- NOTE: This information will need to be change for certification and productionv --->
                      <ns1:DeveloperID>123456</ns1:DeveloperID>
                      <ns1:VersionNbr>1234</ns1:VersionNbr>
                      <ns1:SecretAPIKey>skapi_cert_MYl2AQAowiQAbLp5JesGKh7QFkcizOP2jcX9BrEMqQ</ns1:SecretAPIKey>
                  </ns1:Header>
                  <ns1:Transaction>
                      <ns1:CreditSale>
                          <ns1:Block1>
                              <ns1:CardData>
                                  <ns1:ManualEntry>
                                      <ns1:CardNbr>4242424242424242</ns1:CardNbr>
                                      <ns1:ExpMonth>6</ns1:ExpMonth>
                                      <ns1:ExpYear>2021</ns1:ExpYear>
                                  </ns1:ManualEntry>
                                  <!--- NOTE: Flag indicates you would like to receive a multi-use token for this card
                                      and requires the account to be set up for multi-use tokenization. Please contact
                                      us to assist with this process. --->
                                  <ns1:TokenRequest>Y</ns1:TokenRequest>
                              </ns1:CardData>
                              <ns1:Amt>13.01</ns1:Amt>
                              <ns1:CardHolderData>
                                  <ns1:CardHolderFirstName>John Doe</ns1:CardHolderFirstName>
                              </ns1:CardHolderData>
                              <ns1:AllowDup>Y</ns1:AllowDup>
                          </ns1:Block1>
                      </ns1:CreditSale>
                  </ns1:Transaction>
              </ns1:Ver1.0>
          </ns1:PosRequest>
      </SOAP-ENV:Body>
  </SOAP-ENV:Envelope>
</cfxml>

<!--- NOTE: Simply post the XML to our gateway server
    Certification URL is https://posgateway.cert.secureexchange.net/Hps.Exchange.PosGateway/PosGatewayService.asmx
    Production URL is https://api2.heartlandportico.com/Hps.Exchange.PosGateway/PosGatewayService.asmx--->
<cfhttp
  url="https://cert.api2.heartlandportico.com/Hps.Exchange.PosGateway/PosGatewayService.asmx"
  method="POST"
  result="gatewayResponse">
  <cfhttpparam type="XML" value="#gatewayRequest#" />
</cfhttp>

<!--- NOTE: Here I dump the authorization respnse in the form of a Struct
    to the screen so you can view each item returned --->
<cfdump var="#ConvertXmlToStruct(gatewayResponse.Filecontent, StructNew())#">








<!--- NOTE: In true lazy developer fashion, I ripped this function from http://www.anujgakhar.com/wp-content/uploads/2008/02/xml2struct.cfc.txt
    which easily converts XML to a ColdFusion Struct.  This is not required, I just dropped it in for demonstration purposes to easily dig into the
    authorization response --->
<cffunction name="ConvertXmlToStruct" access="public" returntype="struct" output="false"
        hint="Parse raw XML response body into ColdFusion structs and arrays and return it.">
  <cfargument name="xmlNode" type="string" required="true" />
  <cfargument name="str" type="struct" required="true" />
  <!---Setup local variables for recurse: --->
  <cfset var i = 0 />
  <cfset var axml = arguments.xmlNode />
  <cfset var astr = arguments.str />
  <cfset var n = "" />
  <cfset var tmpContainer = "" />

  <cfset axml = XmlSearch(XmlParse(arguments.xmlNode),"/node()")>
  <cfset axml = axml[1] />
  <!--- For each children of context node: --->
  <cfloop from="1" to="#arrayLen(axml.XmlChildren)#" index="i">
    <!--- Read XML node name without namespace: --->
    <cfset n = replace(axml.XmlChildren[i].XmlName, axml.XmlChildren[i].XmlNsPrefix&":", "") />
    <!--- If key with that name exists within output struct ... --->
    <cfif structKeyExists(astr, n)>
      <!--- ... and is not an array... --->
      <cfif not isArray(astr[n])>
        <!--- ... get this item into temp variable, ... --->
        <cfset tmpContainer = astr[n] />
        <!--- ... setup array for this item beacuse we have multiple items with same name, ... --->
        <cfset astr[n] = arrayNew(1) />
        <!--- ... and reassing temp item as a first element of new array: --->
        <cfset astr[n][1] = tmpContainer />
      <cfelse>
        <!--- Item is already an array: --->

      </cfif>
      <cfif arrayLen(axml.XmlChildren[i].XmlChildren) gt 0>
          <!--- recurse call: get complex item: --->
          <cfset astr[n][arrayLen(astr[n])+1] = ConvertXmlToStruct(axml.XmlChildren[i], structNew()) />
        <cfelse>
          <!--- else: assign node value as last element of array: --->
          <cfset astr[n][arrayLen(astr[n])+1] = axml.XmlChildren[i].XmlText />
      </cfif>
    <cfelse>
      <!---
        This is not a struct. This may be first tag with some name.
        This may also be one and only tag with this name.
      --->
      <!---
          If context child node has child nodes (which means it will be complex type): --->
      <cfif arrayLen(axml.XmlChildren[i].XmlChildren) gt 0>
        <!--- recurse call: get complex item: --->
        <cfset astr[n] = ConvertXmlToStruct(axml.XmlChildren[i], structNew()) />
      <cfelse>
        <!--- else: assign node value as last element of array: --->
        <!--- if there are any attributes on this element--->
        <cfif IsStruct(aXml.XmlChildren[i].XmlAttributes) AND StructCount(aXml.XmlChildren[i].XmlAttributes) GT 0>
          <!--- assign the text --->
          <cfset astr[n] = axml.XmlChildren[i].XmlText />
            <!--- check if there are no attributes with xmlns: , we dont want namespaces to be in the response--->
           <cfset attrib_list = StructKeylist(axml.XmlChildren[i].XmlAttributes) />
           <cfloop from="1" to="#listLen(attrib_list)#" index="attrib">
             <cfif ListgetAt(attrib_list,attrib) CONTAINS "xmlns:">
               <!--- remove any namespace attributes--->
              <cfset Structdelete(axml.XmlChildren[i].XmlAttributes, listgetAt(attrib_list,attrib))>
             </cfif>
           </cfloop>
           <!--- if there are any atributes left, append them to the response--->
           <cfif StructCount(axml.XmlChildren[i].XmlAttributes) GT 0>
             <cfset astr[n&'_attributes'] = axml.XmlChildren[i].XmlAttributes />
          </cfif>
        <cfelse>
           <cfset astr[n] = axml.XmlChildren[i].XmlText />
        </cfif>
      </cfif>
    </cfif>
  </cfloop>
  <!--- return struct: --->
  <cfreturn astr />
</cffunction>
