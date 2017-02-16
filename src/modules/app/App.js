import React, {PropTypes, Component} from 'react';
import {AsyncStorage, StyleSheet, Navigator, View, Text, Image} from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import styles, {colors} from '../../styles/general';
import {STORAGE} from '../../helpers/constants';
import {Dashboard, AddPlayers, AddScores, GameBoard, Stats, Login} from './../../components/index';

import * as actions from './actions'

class App extends Component {
  constructor() {
    super();
    this.state = {
      startScreen: ''
    };
  }

  componentWillMount() {
    AsyncStorage.getItem(STORAGE.userId).then((res) => {
      if (res) {
        this.setState({startScreen: 'dashboard'});
      } else {
        this.setState({startScreen: 'login'});
      }
    }).catch((err) => {
      this.setState({startScreen: 'login'});
    });
  }

  render() {
    if (!this.state.startScreen) {
      return <_Placeholder />;
    }
    return (
      <Navigator
        style={styles.wrapper}
        initialRoute={{id: this.state.startScreen}}
        renderScene={this.navigatorRenderScene}
        configureScene={this.navigatorConfigureScene}/>
    );
  }

  navigatorConfigureScene = (route, routeStack) => {
    return Navigator.SceneConfigs.FloatFromBottomAndroid
  };

  navigatorRenderScene = (route, navigator) => {
    const props = this.props;
    switch (route.id) {
      case 'login':
        return (<Login title='Login'
                       navigator={navigator}/>);
      case 'dashboard':
        return (<Dashboard title='Dashboard'
                           navigator={navigator}
                           getGames={props.getGames}/>);
      case 'addplayers':
        return (<AddPlayers navigator={navigator}
                            addFnc={props.addNewPlayer}
                            updateFnc={props.updatePlayer}
                            removeFnc={props.removePlayer}
                            changeDealer={props.changeDealer}
                            players={props.players}
                            title='Add Players'/>);
      case 'gameboard':
        return (<GameBoard navigator={navigator}
                           players={props.players}
                           dealer={props.dealer}
                           scores={props.scores}
                           currentGame={props.currentGame}
                           finished={props.finished}
                           title='Gameboard'/>);
      case 'addscores':
        return (<AddScores navigator={navigator}
                           players={props.players}
                           currentGame={props.currentGame}
                           addScores={props.addScores}
                           title='Add Scores'/>);
      case 'stats':
        return (<Stats navigator={navigator}
                       {...route}
                       resetGame={props.resetGame}
                       title='Statistieken'/>);
    }
  };
}
const _Placeholder = () => {
  return (
    <View style={StyleSheet.flatten([styles.container, {backgroundColor: colors.main, alignItems: 'center', justifyContent: 'center'}])}>
      <Text style={StyleSheet.flatten([styles.subheader, {color: '#FFF', marginTop: 30}])}>Amerikaans Rammen</Text>
      <Image source={require('../../images/logo.png')} style={{width: 100, height: 100, marginTop: 10, marginBottom: 40}}/>
    </View>
  );
};

App.displayName = 'Amerikaans Rammen';

//it is a good practice to always indicate what type of props does your component
//receive. This is really good for documenting and prevent you from a lot of bug during
//development mode. Remember, all of these will be ignored once you set it to production.
App.propTypes = {};

const mapStateToProps = (state) => {
  return {
    players: state.app.players,
    dealer: state.app.dealer,
    currentGame: state.app.currentGame,
    scores: state.app.scores,
    finished: state.app.finished
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewPlayer: () => dispatch(actions.newPlayer()),
    updatePlayer: (id, field, name) => dispatch(actions.updatePlayer(id, field, name)),
    removePlayer: (id) => dispatch(actions.removePlayer(id)),
    addScores: (game, scores) => dispatch(actions.addScores(game, scores)),
    getGames: () => dispatch(actions.getGames()),
    resetGame: () => dispatch(actions.resetGame()),
    changeDealer: (dealer) => dispatch(actions.changeDealer(dealer))
  };
};

//Here's the most complex part of our app. connect is a function which selects,
//which part of our state tree you need to pass to your component. also, since
//my App component is pure function, i am injecting addNewCounter, increment and
//decrement functions wrapped with dispatch. I think this is the best and cleanest
//way to seperate your connect and your pure function.
export default connect(mapStateToProps, mapDispatchToProps)(App);
