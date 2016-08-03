import React, {Component, PropTypes} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableNativeFeedback,
  ToolbarAndroid,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Card } from 'react-native-material-design';
import styles, {colors} from '../styles/general';

class AddPlayers extends Component {
  startGame = () => {
    console.log('Let\'s start');
  };

  onActionSelect = () => {
    console.log('Actions');
  };

  render() {
    const {players, removeFnc, updateFnc, addFnc} = this.props;
    return (
      <View style={styles.wrapper}>
        <Icon.ToolbarAndroid
          title="Start nieuw spel"
          titleColor="white"
          style={styles.toolbar}
          navIconName="md-arrow-back"
          actions={[{ title: 'start', iconName: 'md-checkmark', iconSize: 25, show: 'always' }]}
          onIconClicked={this.props.navigator.pop}/>
        <ScrollView style={styles.container}>
          <Text style={styles.subheader}>Voeg de spelers toe</Text>
          {players.map((player, index) => {
            return (
              <View key={index} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 70}}>
                <Text style={{width: 50}}><Icon name='md-person' size={16} color={colors.main}/> #{index + 1}</Text>
                <TextInput
                  onChangeText={(text)=>{updateFnc(index, 'name', text)}}
                  underlineColorAndroid={colors.main}
                  style={{flex: 1, alignSelf: 'stretch', height: 60, fontSize: 18}}
                  placeholder={`Naam speler ${index + 1}`}
                  value={player.name}/>
                {players.length > 2 ?
                  <Icon.Button name="md-close" style={{width: 40}} backgroundColor="transparent" color={colors.text} onPress={() => removeFnc(index)}/> :
                  <View style={{width: 40}}/>
                }
              </View>
            );
          })}
          <View style={{marginTop: 15, alignItems: 'center'}}>
            <TouchableNativeFeedback onPress={addFnc}>
              <View style={{padding: 10, marginRight: 10}}>
                <Text style={{color: colors.main, fontWeight: 'bold'}}>
                  <Icon name='md-person-add' size={16} color={colors.main}/>&nbsp;&nbsp;&nbsp;Nieuwe Speler
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
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