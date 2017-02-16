import React, {Component, PropTypes} from 'react';
import {
  Alert,
  Picker,
  Switch,
  Text,
  TextInput,
  TouchableNativeFeedback,
  ToolbarAndroid,
  View
} from 'react-native';
import {some} from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Separator from '../helpers/Separator';
import styles, {colors} from '../styles/general';

class AddPlayers extends Component {
  constructor() {
    super();
    this.state = {
      trackDealer: false,
      dealer: 0
    };
  }

  onChangeDealer = (dealer) => {
    this.setState({dealer});
    this.props.changeDealer(dealer);
  };

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

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
    const {players, removeFnc, updateFnc, addFnc, changeDealer} = this.props;
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
        <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps={true}>
          <Text style={styles.subheader}>Voeg de spelers toe</Text>
          {players.map((player, index) => {
            const last = index === players.length - 1;
            return (
              <View key={index}
                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 70}}>
                <Text style={{width: 50}}><Icon name='md-person' size={16} color={colors.main}/> #{index + 1}</Text>
                <TextInput
                  onChangeText={(text)=>{updateFnc(index, 'name', text)}}
                  underlineColorAndroid={colors.main}
                  autoCapitalize='words'
                  ref={`player-${index}`}
                  style={{flex: 1, alignSelf: 'stretch', height: 60, fontSize: 18}}
                  placeholder={`Naam speler ${index + 1}`}
                  onSubmitEditing={() => {
                    if(!last) {
                      this.focusNextField(`player-${index + 1}`);
                    }
                  }}
                  returnKeyType={last ? 'done' : 'next'}
                  value={player.name}/>
                {players.length > 2 ?
                  <Icon.Button name='md-close' style={{width: 40}} backgroundColor='transparent' underlayColor='transparent' color={colors.text}
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
          <Separator />
          <Text style={styles.subheader}>Deler aanduiden</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingRowText}>Wilt u de deelvolgorde bijhouden?</Text>
            <Switch
              onValueChange={(value) => {
                this.setState({trackDealer: value});
                if (value) {
                  changeDealer(-1);
                } else {
                  changeDealer(this.state.dealer);
                }
              }}
              value={this.state.trackDealer}/>
          </View>
          {this.state.trackDealer && <View style={{marginBottom: 15}}>
            <Text style={styles.extraInfo}>
              Duid hieronder de speler aan die start met delen. Daarna zal de volgorde gevolgd worden waarin de spelers zijn ingegeven.
              Geef de spelers dus in in de volgorde dat ze aam de tafel zitten.
            </Text>
            <Picker
              selectedValue={this.state.dealer}
              mode='dropdown'
              onValueChange={this.onChangeDealer}>
              {players.map((player, index) => {
                return <Picker.Item key={index} label={player.name || `Speler ${index + 1}`} value={index}/>
              })}
            </Picker>
          </View>}
        </KeyboardAwareScrollView>
      </View>
    );
  };
}

AddPlayers.propTypes = {
  players: PropTypes.array.isRequired,
  addFnc: PropTypes.func.isRequired,
  updateFnc: PropTypes.func.isRequired,
  removeFnc: PropTypes.func.isRequired,
  changeDealer: PropTypes.func.isRequired
};

export default AddPlayers;