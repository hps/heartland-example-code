import React from 'react';

export var CreditCardForm = React.createClass({
  render: function () {
    return (
      <div className="credit-card">
        <div id="iframesCardNumber"></div>
        <div id="iframesCardExpiration"></div>
        <div id="iframesCardCvv"></div>
        <div id="iframesSubmit"></div>
      </div>
    );
  },

  getInitialState: function () {
    return { hps: null };
  },

  componentDidMount: function () {
    var that = this;
    (function (document, Heartland) {
      that.state.hps = new Heartland.HPS({
        publicKey: 'pkapi_cert_jKc1FtuyAydZhZfbB3',
        type:      'iframe',
        fields: {
          cardNumber: {
            target:      'iframesCardNumber',
            placeholder: '•••• •••• •••• ••••'
          },
          cardExpiration: {
            target:      'iframesCardExpiration',
            placeholder: 'MM / YYYY'
          },
          cardCvv: {
            target:      'iframesCardCvv',
            placeholder: 'CVV'
          },
          submit: {
            target:       'iframesSubmit'
          }
        },
        onTokenSuccess: function (resp) {
          alert('Here is a single-use token: ' + resp.token_value);
        },
        onTokenError: function (resp) {
          alert('There was an error: ' + resp.error.message);
        }
      });
    }(window.document, window.Heartland));
  },

  componentWillUnmount: function () {
    this.state.hps.dispose();
  }
});
