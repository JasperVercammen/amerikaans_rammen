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

class GameBoard extends Component {
  addScores = () => {
    this.props.navigator.push({
      id: 'addscores'
    });
  };

  render() {
    const {players, scores, currentGame, finished} = this.props;
    return (
      <View style={styles.wrapper}>
        <ScrollView style={{flex: 1}}>
          <_Header scores={scores} players={players} finished={finished} currentGame={currentGame}/>

          <View style={StyleSheet.flatten([styles.container, {alignSelf: 'stretch'}])}>
            {finished || <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
                                                  onPress={this.addScores}>
              <View style={StyleSheet.flatten([styles.fab, {top: -28}])}>
                <Text style={styles.fabText}><Icon name='md-checkmark' size={25}/></Text>
              </View>
            </TouchableNativeFeedback>}
            <Text style={StyleSheet.flatten([styles.subheader, {marginTop: 25, marginBottom: 15}])}>Scores</Text>
            <ScoreTable scores={scores} players={players}/>
          </View>
        </ScrollView>
      </View>
    );
  };
}

const _Header = ({scores, players, finished, currentGame}) => {
  const topText = finished ?
          <Icon name='md-trophy' color='#FFF' size={35}/> :
          <Text style={{fontSize: 14 , color: '#FFF'}}>We spelen</Text>,
        bottomText = finished ?
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#FFF'}}>{getWinnerName(scores, players)}</Text> :
          <Text style={{fontSize: 44, fontWeight: 'bold', color: '#FFF'}}>{currentGame}</Text>;
  return (
    <View style={{backgroundColor: colors.main, alignItems: 'center', justifyContent: 'center', height: 250}}>
      <Image source={require('../images/back.png')}
             style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
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
  finished: PropTypes.bool.isRequired
};

export default GameBoard;