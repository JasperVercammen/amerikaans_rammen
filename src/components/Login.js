import React, {Component, PropTypes} from 'react';
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableNativeFeedback,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {noop, without} from 'lodash';
import styles, {colors} from '../styles/general';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {register, login} from '../helpers/api';
import {STORAGE} from '../helpers/constants';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      register: false,
      loading: false
    };
  }

  switchRegister = () => {
    this.setState({
      register: !this.state.register
    })
  };

  saveAndContinue = (userId, username) => {
    const p1 = AsyncStorage.setItem(STORAGE.userId, userId),
          p2 = AsyncStorage.setItem(STORAGE.username, username);
    Promise.all([p1, p2]).then(res => {
      const errors = without(res, null);
      if (without(res, null).length) {
        this.setState({loading: false});
        return Alert.alert('Fout bij het opslaan', errors[0].message);
      }
      this.props.navigator.replace({
        id: 'dashboard'
      });
    });
  };

  loginOrRegister = () => {
    const {username, password} = this.state;
    this.setState({loading: true});
    if (this.state.register) {
      register(username, password).then((result) => {
        if (result.error) {
          this.setState({loading: false});
          return Alert.alert('Fout bij het registreren', result.message.toString());
        }
        return this.saveAndContinue(result.userId, result.username);
      });
    } else {

      login(username, password).then((result) => {
        if (result.error) {
          this.setState({loading: false});
          return Alert.alert('Fout bij het inloggen', result.message.toString());
        }
        // return Alert.alert('Succesvol ingelogd', 'U bent succesvol ingelogd');
        return this.saveAndContinue(result.userId, result.username);
      });
    }
  };

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

  render() {
    const {register, username, password, passwordConfirm, loading} = this.state,
          canContinue = (username && password && (register ? password === passwordConfirm : true));
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps={true}
                               style={StyleSheet.flatten([styles.container, {backgroundColor: colors.main}])}
                               contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={StyleSheet.flatten([styles.subheader, {color: '#FFF', marginTop: 30}])}>Amerikaans Rammen</Text>

        <Image source={require('../images/logo.png')} style={{width: 100, height: 100, marginTop: 10, marginBottom: 40}}/>

        <TextInput
          onChangeText={(text) => this.setState({username: text})}
          underlineColorAndroid={colors.mainDark}
          ref={`username`}
          style={{alignSelf: 'stretch', height: 60, fontSize: 18}}
          placeholder={`Gebruikersnaam`}
          onSubmitEditing={() => this.focusNextField('password')}
          returnKeyType='next'
          value={this.state.username}/>

        <TextInput
          onChangeText={(text) => this.setState({password: text})}
          underlineColorAndroid={colors.mainDark}
          ref={`password`}
          onSubmitEditing={() => {register ? this.refs.passwordConfirm.focus() : noop}}
          style={{alignSelf: 'stretch', height: 60, fontSize: 18}}
          placeholder={`Wachtwoord`}
          secureTextEntry={true}
          returnKeyType={register ? 'next' : 'done'}
          value={this.state.password}/>

        {register &&
          <TextInput
            onChangeText={(text) => this.setState({passwordConfirm: text})}
            underlineColorAndroid={colors.mainDark}
            ref={`passwordConfirm`}
            style={{alignSelf: 'stretch', height: 60, fontSize: 18}}
            placeholder={`Wachtwoord bevestiging`}
            secureTextEntry={true}
            returnKeyType='done'
            value={this.state.passwordConfirm}/>}

        {(register && this.state.password !== this.state.passwordConfirm) &&
          <Text style={{color: '#E53935', fontSize: 11, textAlign: 'left'}}>Uw ingegeven wachtwoorden komen niet overeen.</Text>}

        <View style={{marginTop: 15, marginBottom: 20, alignItems: 'center'}}>
          {loading ?
            <ActivityIndicator
              style={{alignItems: 'center', justifyContent: 'center', padding: 8}}
              color='#FFF'
              size='large'/> :
            <View>
              <TouchableNativeFeedback onPress={canContinue ? this.loginOrRegister : noop}>
                <View style={{padding: 10, marginRight: 10, opacity: canContinue ? 1 : 0.2}}>
                  <Text style={{color: '#FFF', fontWeight: 'normal', fontSize: 18}}>
                    {register ? 'Registreren' : 'Inloggen'}&nbsp;&nbsp;&nbsp;<Icon name='md-log-in' size={16} color='#FFF'/>
                  </Text>
                </View>
              </TouchableNativeFeedback>
              <View style={{height: 25}}/>
              <Text style={{fontSize: 11, color: colors.mainDark}}>- {register ? 'al geregistreerd?' : 'nog niet geregistreerd?'} -</Text>
              <TouchableNativeFeedback onPress={this.switchRegister}>
                <View style={{padding: 10, marginRight: 10}}>
                  <Text style={{color: colors.mainDark, fontWeight: 'normal', fontSize: 16}}>
                    {register ? 'Inloggen' : 'Registreer hier'}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          }
        </View>
      </KeyboardAwareScrollView>
    );
  };
}

Login.propTypes = {
};

export default Login;