import React, {Component, PropTypes} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  ToolbarAndroid,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles, {colors} from '../styles/general';
import ScoreTable, {getWinnerName} from '../helpers/scores';
import {padStart} from 'lodash';

class GameBoard extends Component {
  constructor() {
    super();
    this.interval = null;
  }

  addScores = () => {
    this.props.navigator.push({
      id: 'addscores'
    });
  };

  componentWillMount() {
    this.setState({
      startTime: new Date().getTime(),
      time: 0
    });
    this.interval = setInterval(() => {
      const time = new Date().getTime() - this.state.startTime;

      this.setState({
        time
      })
    }, 450);
  }

  getTimer = () => {
    const {time} = this.state;
    let delta = time / 1000;
    // calculate (and subtract) whole hours
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    const seconds = Math.floor(delta % 60);  // in theory the modulus is not required

    return `${padStart(hours.toString(), 2, '0')}:${padStart(minutes.toString(), 2, '0')}:${padStart(seconds.toString(), 2, '0')}`;
  };

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.saved === true && nextProps.saved !== this.props.saved) {
      Alert.alert('Succesfull save', 'Uw data is succesvol opgeslagen. Terug naar startscherm?', [
        {
          text: 'Cancel', onPress: () => {
        }
        },
        {text: 'OK', onPress: () => this.props.navigator.popToTop()}
      ]);
    }
    if (nextProps.finished === true && nextProps.finished !== this.props.finished) {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
  };

  saveGame = () => {
    const {players, scores} = this.props;
    this.props.saveGame(players, scores, this.state.startTime);
  };

  render() {
    const {players, scores, currentGame, finished} = this.props,
          onPress = finished ? this.saveGame : this.addScores,
          icon    = finished ? 'md-done-all' : 'md-checkmark';
    return (
      <View style={styles.wrapper}>
        <ScrollView style={{flex: 1}}>
          <_Header scores={scores} players={players} finished={finished} currentGame={currentGame}
                   time={this.getTimer()}/>

          <View style={StyleSheet.flatten([styles.container, {alignSelf: 'stretch'}])}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
                                     onPress={onPress}>
              <View style={StyleSheet.flatten([styles.fab, {top: -28}])}>
                <Text style={styles.fabText}><Icon name={icon} size={25}/></Text>
              </View>
            </TouchableNativeFeedback>
            <Text style={StyleSheet.flatten([styles.subheader, {marginTop: 25, marginBottom: 15}])}>Scores</Text>
            <ScoreTable scores={scores} players={players}/>
          </View>
        </ScrollView>
      </View>
    );
  };
}

const _Header = ({scores, players, finished, currentGame, time}) => {
  const topText    = finished ?
          <Icon name='md-trophy' color='#FFF' size={35}/> :
          <Text style={{fontSize: 14 , color: '#FFF'}}>We spelen</Text>,
        bottomText = finished ?
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#FFF'}}>{getWinnerName(scores, players)}</Text> :
          <Text style={{fontSize: 44, fontWeight: 'bold', color: '#FFF'}}>{currentGame}</Text>;
  return (
    <View style={{backgroundColor: colors.main, alignItems: 'center', justifyContent: 'center', height: 250}}>
      <Image source={require('../images/back.png')}
             style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{
          position: 'absolute',
          top: 10,
          left: 10,
          fontSize: 14,
          fontWeight: 'bold',
          color: '#FFF'
        }}><Icon name='md-alarm' color='#FFF' size={14}/>&nbsp;{time}</Text>
        <View style={{
                width: 160,
                height: 160,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 6,
                borderRadius: 80,
                borderColor: '#006064'
              }}>
          {topText}
          {bottomText}
        </View>
      </Image>
    </View>
  );
};


GameBoard.propTypes = {
  players: PropTypes.array.isRequired,
  currentGame: PropTypes.string.isRequired,
  scores: PropTypes.object.isRequired,
  finished: PropTypes.bool.isRequired,
  saveGame: PropTypes.func.isRequired
};

export default GameBoard;