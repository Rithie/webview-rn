import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import Url from 'url-parse';

const PolicyHTML = require('./resources/index.html');

export default class App extends Component {
  state = {
    canGoBack: null,
    canGoForward: null,
    loading: null,
    target: null,
    title: '',
    showWebView: true,
    token: null,
    scheme: null,
    hostname: null,
    url:
      'https://login.escolaemmovimento.com.br/External/Challenge?provider=Google&returnUrl=br.com.eteg:eemagendadigital',
  };
  _onMessage = message => {
    console.log(message);
  };

  _onNavigationStateChange = webViewState => {
    const {protocol, query, pathname} = Url(webViewState.url);
    if (protocol === 'br.com.eteg:') {
      const result = pathname.split('//');
      this.setState({
        showWebView: false,
        token: query,
        scheme: result[0],
        hostname: result[1],
      });
    }
    // if (webViewState.url) {
    //   // const myRegexp = /(\?|\&)([^=]+)\=([^&]+)/g;
    //   // const match = myRegexp.exec(webViewState.url);
    //   // console.log(match.input !== null); // abc
    //   console.log(webViewState.url);

    //   var regex = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/g,
    //     params = {},
    //     match;
    //   while ((match = regex.exec(webViewState.url))) {
    //     params[match[1]] = match[2];
    //   }

    //   //console.log('oi mundo', params);
    // }
  };

  render() {
    const runFirst = `

      true; // note: this is required, or you'll sometimes get silent failures
    `;

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, paddingVertical: 90}}>
          {this.state.showWebView ? (
            <WebView
              userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X)
          AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14F89 Safari/602.1"
              originWhitelist={['*']}
              ref="webview"
              source={{uri: this.state.url}}
              onNavigationStateChange={this._onNavigationStateChange}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={false}
            />
          ) : (
            <View>
              <Text>Token recovered</Text>
              <Text>{this.state.token}</Text>
              <Text>{this.state.hostname}</Text>
              <Text>{this.state.scheme}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}
