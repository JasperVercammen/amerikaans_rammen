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
import ScoreTable, {getWinnerName} from '../helpers/scores';
import dateformat from 'dateformat';
import {saveGame} from '../helpers/api';

class Stats extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    if (this.props.save) {
      saveGame('Jasper', players, scores, startTime).then((result) => {
        ToastAndroid.show('Uw spel werd succesvol opgeslagen.', ToastAndroid.LONG)
      });
    }
  }

  render() {
    const {players, scores, gameStart, gameEnd} = this.props,
          start = new Date(gameStart),
          end = new Date(gameEnd);

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
            <Text style={StyleSheet.flatten([styles.subheader, {marginTop: 25, marginBottom: 15}])}>Scores</Text>
            <ScoreTable scores={scores} players={players}/>
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
          <Icon name='md-trophy' color='#FFF' size={35}/>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#FFF'}}>{getWinnerName(scores, players)}</Text>
        </View>
      </Image>
    </View>
  );
};


Stats.propTypes = {
  players: PropTypes.array.isRequired,
  scores: PropTypes.object.isRequired,
  gameStart: PropTypes.number.isRequired,
  gameEnd: PropTypes.number.isRequired,
  save: PropTypes.bool
};

Stats.defaultProps = {
  save: false
};

export default Stats;