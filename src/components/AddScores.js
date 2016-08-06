import React, {Component, PropTypes} from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableNativeFeedback,
  ToolbarAndroid,
  View
} from 'react-native';
import {clone, map, some} from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import styles, {colors} from '../styles/general';

class AddScores extends Component {
  constructor() {
    super();
    this.state = {
      scores: []
    };
  }

  insertScores = (action) => {
    if (this.state.scores.length !== this.props.players.length) {
      return Alert.alert('Foutje', 'U moet eerst alle scores invullen voor u kan verdergaan.');
    }
    // Convert all scores to real numbers before adding them to the store
    const scores = this.state.scores.map((score) => parseInt(score));
    if (!scores.includes(0)) {
      return Alert.alert('Opgepast', 'In de ingegeven scores heeft er niemand 0 behaald. Zeker dat u wil doorgaan?', [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'OK', onPress: () => this.props.navigator.pop()}
      ]);
    }
    this.props.addScores(this.props.currentGame, scores);
    // Normally check on action number (should be equal to 0), but we only have one action, so just go for it!
    this.props.navigator.pop();
  };

  closeNoSave = (action) => {
    if (this.state.scores.length) {
      return Alert.alert('Opgepast', 'Als u nu sluit worden uw ingegeven scores niet opgeslagen.', [
        {text: 'Cancel', onPress: () => {}},
        {text: 'OK', onPress: () => this.props.navigator.pop()}
      ]);
    }
    // Normally check on action number (should be equal to 0), but we only have one action, so just go for it!
    this.props.navigator.pop();
  };

  updateScore = (player, score) => {
    const scores = clone(this.state.scores);
    scores[player] = score;
    this.setState({scores});
  };

  render() {
    const {players, currentGame} = this.props;
    return (
      <View style={styles.wrapper}>
        <Icon.ToolbarAndroid
          title='Voeg scores in'
          titleColor='white'
          style={styles.toolbar}
          navIconName='md-close'
          onIconClicked={this.closeNoSave}
          actions={[{ title: 'start', iconName: 'md-checkmark', iconSize: 25, show: 'always' }]}
          onActionSelected={this.insertScores}/>
        <ScrollView style={styles.container}>
          <Text style={styles.subheader}>Voeg score per speler in: </Text>
          <Text style={{marginBottom: 20}}>Scores voor de ronde <Text
            style={{fontWeight: 'bold'}}>{currentGame}</Text></Text>
          {players.map((player, index) => {
            return (
              <View key={index}
                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 70}}>
                <Text style={{width: 100, textAlign: 'right', marginRight: 10, fontSize: 16}}>
                  <Icon name='md-person' size={16} color={colors.text}/> {player.name}
                </Text>
                <TextInput
                  onChangeText={(value) => this.updateScore(index, value)}
                  underlineColorAndroid={colors.main}
                  keyboardType='numeric'
                  style={{width: 100, height: 60, fontSize: 18}}
                  placeholder={`score`}
                  value={this.state.scores[index]}/>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };
}

AddScores.propTypes = {
  players: PropTypes.array.isRequired,
  addScores: PropTypes.func.isRequired,
  currentGame: PropTypes.string.isRequired
};

export default AddScores;