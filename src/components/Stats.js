import React, {Component, PropTypes} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableNativeFeedback,
  ToolbarAndroid,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles, {colors} from '../styles/general';
import ScoreTable, {getWinnerName, getOrderWithScores} from '../helpers/scores';
import dateformat from 'dateformat';
import {saveGame} from '../helpers/api';
import {makeTimer} from '../helpers/time';

class Stats extends Component {
  constructor() {
    super();
    this.state = {
      showScores: false
    };
  }

  componentWillMount() {
    const props = this.props;
    if (props.save) {
      saveGame('Jasper', props.players, props.scores, props.gameStart).then((result) => {
        ToastAndroid.show('Uw spel werd succesvol opgeslagen.', ToastAndroid.LONG)
      });
      props.resetGame();
    }
  }

  toggleScores = () => {
    this.setState({
      showScores: !this.state.showScores
    });
  };

  render() {
    const {showScores} = this.state,
          {players, scores, gameStart, gameEnd} = this.props,
          start        = new Date(gameStart),
          playTime = gameEnd - gameStart,
          finalRanking = getOrderWithScores(players, scores);

    return (
      <View style={styles.wrapper}>
        <Icon.ToolbarAndroid
          title={dateformat(start, 'dd-mm-yyyy hh:MM')}
          titleColor='white'
          style={styles.toolbar}
          navIconName='md-arrow-back'
          onIconClicked={this.props.navigator.popToTop}/>
        <ScrollView style={{flex: 1}}>
          <_Header scores={scores} players={players}/>

          <View style={StyleSheet.flatten([styles.container, {alignSelf: 'stretch'}])}>
            <View style={styles.statRow}>
              <Text style={StyleSheet.flatten([styles.subheader, {marginTop: 15, marginBottom: 15}])}>Speeltijd</Text>
              <Text style={{alignSelf: 'stretch', textAlign: 'center', fontSize: 35, color: colors.text}}>
                {makeTimer(playTime, false)}
              </Text>
            </View>
            <View style={StyleSheet.flatten([styles.statRow, {borderBottomWidth: 0}])}>
              <Text style={StyleSheet.flatten([styles.subheader, {marginBottom: 15}])}>Eindstand</Text>
              <_FinalRank players={players} finalRanking={finalRanking}/>
              <View style={{marginTop: 15, marginBottom: 20, alignItems: 'center'}}>
                <TouchableNativeFeedback onPress={this.toggleScores}>
                  <View style={{padding: 10, marginRight: 10}}>
                    <Text style={{color: colors.main}}>
                      {showScores ? 'Verberg scores' : 'Bekijk scores'} &nbsp;&nbsp;&nbsp;<Icon name={showScores ? 'md-arrow-dropup' : 'md-arrow-dropdown'} size={16} color={colors.main}/>
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              {showScores && <ScoreTable scores={scores} players={players}/>}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };
}

const _Header = ({scores, players}) => {
  return (
    <View style={{backgroundColor: colors.main, alignItems: 'center', justifyContent: 'center', height: 250}}>
      <Image source={require('../images/back.png')}
             style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
             resizeMode='cover'>
        <View style={{
                width: 160,
                height: 160,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 6,
                borderRadius: 80,
                borderColor: colors.mainDark
              }}>
          <Icon name='md-trophy' color='#FFF' size={35}/>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#FFF'}}>{getWinnerName(scores, players)}</Text>
        </View>
      </Image>
    </View>
  );
};

const _FinalRank = ({players, finalRanking}) => {
  const POSITION_WIDTH = 30,
        NAME_WIDTH     = 100,
        TOTAL_WIDTH    = 80;

  return (
    <View>
      <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomColor: '#E3E3E3', borderBottomWidth: 2}}>
        <Text style={{
                    color: colors.text,
                    width: POSITION_WIDTH,
                    marginRight: 10,
                    textAlign: 'center'
                  }}>
          <Icon name='md-medal' size={16} color={colors.text}/>
        </Text>
        <Text style={{
                    color: colors.text,
                    width: NAME_WIDTH,
                    marginRight: 10,
                    textAlign: 'right'
                  }}>
          <Icon name='md-person' size={16} color={colors.text}/> Speler
        </Text>
        <Text style={{
                    color: colors.main,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: TOTAL_WIDTH
                  }}>
          Totaal
        </Text>
      </View>
      {finalRanking.map((rank, index) => {
        return (
          <View key={index}
                style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomColor: '#E3E3E3', borderBottomWidth: 1}}>
            <Text style={{
                    color: colors.text,
                    width: POSITION_WIDTH,
                    marginRight: 10,
                    textAlign: 'center',
                    fontWeight: index === 0 ? 'bold' : 'normal'
                  }}>
              {index + 1}
            </Text>
            <Text style={{
                      color: colors.text,
                      width: NAME_WIDTH,
                      marginRight: 10,
                      textAlign: 'right',
                      fontWeight: index === 0 ? 'bold' : 'normal'
                    }}>
              {players[rank.player].name}
            </Text>
            <Text style={{
                      color: colors.main,
                      textAlign: 'center',
                      width: TOTAL_WIDTH,
                      fontWeight: index === 0 ? 'bold' : 'normal'
                    }}>
              {rank.score}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

Stats.propTypes = {
  players: PropTypes.array.isRequired,
  scores: PropTypes.object.isRequired,
  gameStart: PropTypes.number.isRequired,
  gameEnd: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
  save: PropTypes.bool
};

Stats.defaultProps = {
  save: false
};

export default Stats;