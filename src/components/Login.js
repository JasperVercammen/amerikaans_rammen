import React, {Component, PropTypes} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles, {colors} from '../styles/general';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      register: false
    };
  }

  switchRegister = () => {
    this.setState({
      register: !this.state.register
    })
  };

  login = () => {
    if (this.state.register) {
      this.props.register()
    }
  };

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

  render() {
    const {register} = this.state;
    return (
      <View style={StyleSheet.flatten([styles.container, {alignItems: 'center', justifyContent: 'flex-start', backgroundColor: colors.main}])}>
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
          style={{alignSelf: 'stretch', height: 60, fontSize: 18}}
          placeholder={`Wachtwoord`}
          secureTextEntry={true}
          returnKeyType='done'
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
        <View style={{marginTop: 15, marginBottom: 20, alignItems: 'center'}}>
          <TouchableNativeFeedback onPress={this.login}>
            <View style={{padding: 10, marginRight: 10}}>
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
      </View>
    );
  };
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

export default Login;