import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Main from './container/main'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import firebase from 'firebase'

class App extends Component {
  componentWillMount () {
    var config = {
      apiKey: 'AIzaSyAGkUJGR1OH9hoP1rELEV6UzGyuUSJPBRI',
      authDomain: 'mytodo-2d629.firebaseapp.com',
      databaseURL: 'https://mytodo-2d629.firebaseio.com',
      projectId: 'mytodo-2d629',
      storageBucket: 'mytodo-2d629.appspot.com',
      messagingSenderId: '929436220401'
    }
    firebase.initializeApp(config)
  }

  render () {
    const store = configureStore()
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}
export default App
