import React, {Component, PropTypes} from 'react';
import {
  AsyncStorage,
  Image,
  ListView,
  ScrollView,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles, {colors} from '../styles/general';
import {STORAGE} from '../helpers/constants';

const LIST = [
  {
    label: 'Afmelden',
    icon: 'md-log-out',
    action: 'logout'
  }/*, {
    label: 'Instellingen',
    icon: 'md-settings',
    action: 'settings'
  }, {
    label: 'help',
    icon: 'md-help-circle',
    action: 'help'
  }*/
];

class Drawer extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    };
  }

  componentWillMount() {
    AsyncStorage.getItem(STORAGE.username).then(username => this.setState({username}));
  }

  renderRow = (item) => {
    return (
      <TouchableNativeFeedback key={item.label} onPress={() => this.itemClick(item.action)}>
        <View style={{padding: 15, borderBottomWidth: 0, borderBottomColor: '#E3E3E3', flexDirection: 'row'}}>
            <Text style={{width: 50}}>
              <Icon name={item.icon} size={22} color='#888888'/>
            </Text>
            <Text style={{fontSize: 16, color: colors.text, alignSelf: 'stretch'}}>{item.label}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  itemClick = (action) => {
    const {navigator} = this.props;
    switch(action) {
      case 'settings':
        break;
      case 'logout':
        AsyncStorage.multiRemove([STORAGE.userId, STORAGE.username]);
        navigator.resetTo({
          id: 'login'
        });
        break;
      case 'help':
        break;
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', flexDirection: 'column'}}>
        <_Header username={this.state.username} />
        {LIST.map((item) => {return this.renderRow(item);})}
      </View>
    );
  }
}

const _Header = ({username}) => {
  return (
    <View style={{backgroundColor: colors.main, alignSelf: 'stretch', height: 150}}>
      <Image source={require('../images/back.png')}
             style={{alignItems: 'flex-start', justifyContent: 'flex-end', width: 300, height: 150, flex: 1}}
             resizeMode='cover'>
        <View style={{padding: 20}}>
          <Text style={{marginBottom: 10}}>
            <Icon name='md-contact' size={65} color='#FFF'/>
          </Text>
          <Text style={{fontSize: 20, color: '#FFF'}}>{username}</Text>
        </View>
      </Image>
    </View>
  );
};
export default Drawer;