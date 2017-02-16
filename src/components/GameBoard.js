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
import {makeTimer} from '../helpers/time';

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

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.finished === true && nextProps.finished !== this.props.finished) {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.props.navigator.replace({
        id: 'stats',
        players: nextProps.players,
        scores: nextProps.scores,
        gameEnd: new Date().getTime(),
        gameStart: this.state.startTime,
        save: true
      });
    }
  };

  render() {
    const {players, scores, currentGame, finished, dealer} = this.props,
          onPress = this.addScores,
          icon    = 'md-checkmark';
    return (
      <View style={styles.wrapper}>
        <ScrollView style={{flex: 1}}>
          <_Header scores={scores} players={players} finished={finished} currentGame={currentGame}
                   time={makeTimer(this.state.time)}/>

          <View style={StyleSheet.flatten([styles.container, {alignSelf: 'stretch'}])}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
                                     onPress={onPress}>
              <View style={StyleSheet.flatten([styles.fab, {top: -28}])}>
                <Text style={styles.fabText}><Icon name={icon} size={25}/></Text>
              </View>
            </TouchableNativeFeedback>
            <Text style={StyleSheet.flatten([styles.subheader, {marginTop: 25, marginBottom: 15}])}>Scores</Text>
            <ScoreTable scores={scores} players={players} dealer={dealer}/>
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
                borderColor: colors.mainDark
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
  dealer: PropTypes.number.isRequired,
  currentGame: PropTypes.string.isRequired,
  scores: PropTypes.object.isRequired,
  finished: PropTypes.bool.isRequired
};

export default GameBoard;