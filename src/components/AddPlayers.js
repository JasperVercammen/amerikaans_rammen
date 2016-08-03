import React, {Component} from 'react';
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

class Dashboard extends Component {
  startGame = () => {
    console.log('Let\'s start');
  };

  onActionSelect = () => {
    console.log('Actions');
  };

  render() {
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
          <View>
            <TextInput
              onChangeText={()=>{}}
              underlineColorAndroid={colors.main}
              placeholder='Naam'/>
          </View>
        </ScrollView>
      </View>
    );
  };
}


export default Dashboard;