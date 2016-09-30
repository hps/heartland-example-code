/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  NativeModules,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

class CreditCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNumber: '4111111111111111',
      cardExpiration: '12 / 2025',
      cardCvv: '123'
    };
  }
  render() {
    return (
      <View>
        <TextInput
          ref="CardNumber"
          placeholder="•••• •••• •••• ••••"
          keyboardType="phone-pad"
          returnKeyType="next"
          style={styles.textInput}

          value={this.state.cardNumber}
          onChangeText={cardNumber => this.setState({cardNumber})}
          />
        <TextInput
          ref="CardExpiration"
          placeholder="MM / YYYY"
          keyboardType="phone-pad"
          returnKeyType="next"
          style={styles.textInput}

          value={this.state.cardExpiration}
          onChangeText={cardExpiration => this.setState({cardExpiration})}
          />
        <TextInput
          ref="CardCvv"
          placeholder="CVV"
          keyboardType="phone-pad"
          style={styles.textInput}

          value={this.state.cardCvv}
          onChangeText={cardCvv => this.setState({cardCvv})}
          onSubmitEditing={this._submit}
          />
        <TouchableHighlight onPress={this._submit.bind(this)}>
          <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _submit() {
    const { cardNumber, cardExpiration, cardCvv } = this.state;
    NativeModules.HeartlandTokenizer.tokenize(
      cardNumber,
      cardExpiration,
      cardCvv,
      function (err, response) {
        if (err) {
          console.log(err);
        }
        console.log(response);
      }
    );
  }
}


class HeartlandRNExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React hola!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <CreditCardForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
});

AppRegistry.registerComponent('HeartlandRNExample', () => HeartlandRNExample);
