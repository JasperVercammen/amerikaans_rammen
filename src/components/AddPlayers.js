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
import {some} from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import styles, {colors} from '../styles/general';

class AddPlayers extends Component {
  startGame = (action) => {
    if (some(this.props.players, ['name', ''])) {
      return Alert.alert('Foutje', 'U moet eerst alle namen invullen voor u kan verdergaan.');
    }
    // Normally check on action number (should be equal to 0), but we only have one action, so just go for it!
    this.props.navigator.replace({
      id: 'gameboard'
    });
  };

  render() {
    const {players, removeFnc, updateFnc, addFnc} = this.props;
    return (
      <View style={styles.wrapper}>
        <Icon.ToolbarAndroid
          title='Start nieuw spel'
          titleColor='white'
          style={styles.toolbar}
          navIconName='md-arrow-back'
          onIconClicked={this.props.navigator.pop}
          actions={[{ title: 'start', iconName: 'md-checkmark', iconSize: 25, show: 'always' }]}
          onActionSelected={this.startGame}/>
        <ScrollView style={styles.container}>
          <Text style={styles.subheader}>Voeg de spelers toe</Text>
          {players.map((player, index) => {
            return (
              <View key={index}
                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 70}}>
                <Text style={{width: 50}}><Icon name='md-person' size={16} color={colors.main}/> #{index + 1}</Text>
                <TextInput
                  onChangeText={(text)=>{updateFnc(index, 'name', text)}}
                  underlineColorAndroid={colors.main}
                  style={{flex: 1, alignSelf: 'stretch', height: 60, fontSize: 18}}
                  placeholder={`Naam speler ${index + 1}`}
                  value={player.name}/>
                {players.length > 2 ?
                  <Icon.Button name='md-close' style={{width: 40}} backgroundColor='transparent' color={colors.text}
                               onPress={() => removeFnc(index)}/> :
                  <View style={{width: 40}}/>
                }
              </View>
            );
          })}
          {players.length < 8 &&
          <View style={{marginTop: 15, marginBottom: 20, alignItems: 'center'}}>
            <TouchableNativeFeedback onPress={addFnc}>
              <View style={{padding: 10, marginRight: 10}}>
                <Text style={{color: colors.main, fontWeight: 'bold'}}>
                  <Icon name='md-person-add' size={16} color={colors.main}/>&nbsp;&nbsp;&nbsp;Nieuwe Speler
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>}
        </ScrollView>
      </View>
    );
  };
}

AddPlayers.propTypes = {
  players: PropTypes.array.isRequired,
  addFnc: PropTypes.func.isRequired,
  updateFnc: PropTypes.func.isRequired,
  removeFnc: PropTypes.func.isRequired
};

export default AddPlayers;