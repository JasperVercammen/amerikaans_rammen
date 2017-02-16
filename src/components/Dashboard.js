import React, {Component, PropTypes} from 'react';
import {
  Alert,
  ActivityIndicator,
  AsyncStorage,
  DrawerLayoutAndroid,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  ToolbarAndroid,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles, {colors} from '../styles/general';
import Drawer from './Drawer';
import Separator from '../helpers/Separator';
import {map, sortBy} from 'lodash';

import {getWinnerName} from '../helpers/scores';
import {getGames} from '../helpers/api';
import {STORAGE} from '../helpers/constants';

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      games: [],
      noGames: false,
      isRefreshing: true
    };
  }

  newGame = () => {
    this.props.navigator.push({
      id: 'addplayers'
    });
  };

  grabGames = () => {
    AsyncStorage.getItem(STORAGE.username)
      .then((username) => {
        return getGames(username);
      })
      .then((games) => {
        if (games.val()) {
          const orderedGames = sortBy(games.val(), (game) => -game.gameStart);
          return this.setState({
            games: orderedGames,
            noGames: false,
            isRefreshing: false
          });
        }
        return this.setState({
          noGames: true,
          isRefreshing: false
        });
      })
      .catch((err) => {
        Alert.alert('ERROR', err.message);
      });
  };

  componentDidMount() {
    this.grabGames();
  }

  viewStats = (game) => {
    this.props.navigator.push({
      id: 'stats',
      ...game
    });
  };

  onRefresh = () => {
    this.setState({isRefreshing: true});
    this.grabGames();
  };

  render() {
    return (
      <DrawerLayoutAndroid drawerWidth={300}
                           drawerPosition={DrawerLayoutAndroid.positions.Left}
                           renderNavigationView={() => <Drawer navigator={this.props.navigator}/>}
                           ref='drawer'>
        <View style={styles.wrapper}>
          <Icon.ToolbarAndroid
            title='Amerikaans Rammen'
            titleColor='white'
            style={styles.toolbar}
            navIconName='md-menu'
            onIconClicked={() => this.refs.drawer.openDrawer()}/>
          <ScrollView refreshControl={
                      <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh}
                        colors={[colors.main, colors.cta]}
                        progressBackgroundColor="#FFF"
                      />
                    }>
            <View style={styles.container}>
              {/*<Text style={styles.subheader}>Niet afgewerkte spelen</Text>
               <_Separator/>*/}
              <Text style={styles.subheader}>Vorige spelen</Text>
              {this.state.noGames ?
                <View style={{marginTop: 15}}>
                  <Text style={{fontStyle: 'italic', textAlign: 'center'}}>Nog geen opgeslagen spelen</Text>
                </View> :
                <View style={{marginTop: 15}}>
                  {map(this.state.games, (game, index) => {
                    const date   = new Date(game.gameStart),
                          winner = getWinnerName(game.scores, game.players);
                    return (
                      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', marginBottom: 20}}
                            key={index}>
                        <View style={{
                              width: 40,
                              height: 40,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 20,
                              borderColor: colors.cta,
                              borderWidth: 2,
                              marginRight: 15
                            }}>
                          <Text style={{color: colors.text, fontSize: 14}}>{date.getDate()}-{date.getMonth()}</Text>
                          <Text style={{color: colors.text, fontSize: 8}}>{date.getFullYear()}</Text>
                        </View>
                        <View
                          style={{borderBottomWidth: 1, justifyContent: 'center', flex: 1, borderBottomColor: '#E3E3E3', height: 60}}>
                          <Text style={{color: colors.text, fontSize: 16, marginBottom: 5}}>
                            <Icon name='md-trophy' size={16}/> {winner}
                          </Text>
                          <Text style={{color: colors.text, fontSize: 14}}><Icon name='md-people'
                                                                                 size={14}/> {game.players.length}</Text>
                        </View>
                        <View style={{borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center', width: 70, borderBottomColor: '#E3E3E3', height: 60}}>
                          <TouchableNativeFeedback onPress={() => this.viewStats(game)}>
                            <View style={{padding: 2, width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
                              <Text>
                                <Icon name='md-stats' size={20} color={colors.main}/>
                              </Text>
                            </View>
                          </TouchableNativeFeedback>
                        </View>
                      </View>
                    );
                  })}
                </View>
              }
            </View>
          </ScrollView>
          <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
                                   onPress={this.newGame}>
            <View style={styles.fab}>
              <Text style={styles.fabText}>+</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </DrawerLayoutAndroid>
    );
  };
}

Dashboard.propTypes = {
  getGames: PropTypes.func.isRequired
};

export default Dashboard;