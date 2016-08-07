import React, {Component, PropTypes} from 'react';
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
import {map} from 'lodash';

import {getWinnerName} from '../helpers/scores';
import {getGames} from '../helpers/api';

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      games: {}
    };
  }

  newGame = () => {
    this.props.navigator.push({
      id: 'addplayers'
    });
  };

  componentWillMount() {
    getGames().then((games) => {
      if (games.val()) {
        this.setState({
          games: games.val()
        });
      }
    });
  }

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
          <View style={{marginTop: 15}}>
            {map(this.state.games, (game, index) => {
              const date = new Date(game.gameStart),
                    winner = getWinnerName(game.scores, game.players);
              return (
                <View style={{flexDirection: 'row', alignSelf: 'stretch', marginBottom: 20}} key={index}>
                  <View style={{
                          width: 50,
                          height: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 25,
                          borderColor: colors.cta,
                          borderWidth: 3,
                          marginRight: 15
                        }}>
                    <Text style={{color: colors.text, fontSize: 16}}>{date.getDate()}-{date.getMonth()}</Text>
                    <Text style={{color: colors.text, fontSize: 10}}>{date.getFullYear()}</Text>
                  </View>
                  <View style={{borderBottomWidth: 1, borderBottomColor: '#E3E3E3'}}>
                    <Text style={{color: colors.text, fontSize: 16, marginBottom: 5}}>
                      <Icon name='md-trophy' size={16}/> {winner}
                    </Text>
                    <Text>Aantal spelers: {game.players.length}</Text>
                  </View>
                </View>
              );
            })}
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

Dashboard.propTypes = {
  getGames: PropTypes.func.isRequired
};

export default Dashboard;