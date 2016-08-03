import React, {PropTypes, Component} from 'react';
import {StyleSheet, Navigator} from 'react-native'
import {connect} from 'react-redux'

import {Dashboard, AddPlayers} from './../../components/index';

import * as actions from './actions'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class App extends Component{
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{id: 'dashboard'}}
        renderScene={this.navigatorRenderScene}
        configureScene={this.navigatorConfigureScene}/>
    );
  }

  navigatorConfigureScene = (route, routeStack) =>{
    return Navigator.SceneConfigs.FloatFromBottomAndroid
  };
  navigatorRenderScene = (route, navigator) => {
    switch (route.id) {
      case 'dashboard':
        return (<Dashboard title='Dashboard' navigator={navigator}/>);
      case 'addplayers':
        return (<AddPlayers navigator={navigator} title='Add Players' />);
    }
  };
}

App.displayName = 'App';

//it is a good practice to always indicate what type of props does your component
//receive. This is really good for documenting and prevent you from a lot of bug during
//development mode. Remember, all of these will be ignored once you set it to production.
App.propTypes = {

};

//Here's the most complex part of our app. connect is a function which selects,
//which part of our state tree you need to pass to your component. also, since
//my App component is pure function, i am injecting addNewCounter, increment and
//decrement functions wrapped with dispatch. I think this is the best and cleanest
//way to seperate your connect and your pure function.
export default connect(
  (state) => ({
    counters: state.app.counters
  })
)(App)