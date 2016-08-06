import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  ToolbarAndroid,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Card } from 'react-native-material-design';
import styles, {colors} from '../styles/general';

class Dashboard extends Component {
  newGame = () => {
    this.props.navigator.push({
      id: 'addplayers'
    })
  };

  onActionSelect = () => {
    console.log('Actions');
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Icon.ToolbarAndroid
          title="Amerikaans Rammen"
          titleColor="white"
          style={styles.toolbar}
          actions={[{ title: 'Settings', iconName: 'md-more', iconSize: 25, show: 'always' }]}
          onActionSelected={this.onActionSelected}/>
        <ScrollView style={styles.container}>
          <Text style={styles.subheader}>Vorige spelen</Text>
          <View>
            <Text>Hier komt een lijst met al gespeelde spelletjes.</Text>
          </View>
        </ScrollView>
        <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
                                 onPress={this.newGame}>
          <View style={styles.fab}>
            <Text style={styles.fabText}>+</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  };
}


export default Dashboard;