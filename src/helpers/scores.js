import React, {Component, PropTypes} from 'react';
import {
  ScrollView,
  Text,
  View
} from 'react-native';
import styles, {colors} from '../styles/general';
import {games} from './games';
import {isEmpty, isFinite, min, reduce} from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';

const getScoreForPlayerForGame = (game, player, scores) => {
  const gameScores = scores[game];
  if (isEmpty(gameScores)) {
    return '-';
  }

  return gameScores[player];
};

const getTotalScoreForPlayer = (player, scores) => {
  return reduce(scores, (sum, score) => {
    if (isFinite(score[player])) {
      return sum + score[player];
    }
    return sum;
  }, 0);
};

const getOrderWithScores = (players, scores) => {
  const scoreList = players.map((player, index) => {
    return {
      player: index,
      score: getTotalScoreForPlayer(index, scores)
    };
  });
  return scoreList.sort((p1, p2) => p1.score - p2.score);
};

const getWinner = (scores, players) => {
  const totalScores = players.map((player, index) => {
    return getTotalScoreForPlayer(index, scores);
  });
  return players[totalScores.indexOf(min(totalScores))];
};

const getWinnerName = (scores, players) => {
  const winner = getWinner(scores, players);
  if (!isEmpty(winner)) {
    return winner.name;
  }
  return '';
};

const ScoreTable = ({players, scores, dealer = -1}) => {
  const NAME_WIDTH    = 70,
        TOTAL_WIDTH   = 50,
        SCORE_FACTOR  = 3,
        SCORE_FACTOR2 = 7;
  return (
    <ScrollView style={{flex: 1}} horizontal={true} showsHorizontalScrollIndicator={false}>
      <View>
        <View
          style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomColor: '#E3E3E3', borderBottomWidth: 2}}>
          <_DealerButton show={false}/>
          <Text style={{
                  color: colors.text,
                  width: NAME_WIDTH,
                  marginRight: 10,
                  textAlign: 'right'
                }}>
            <Icon name='md-person' size={16} color={colors.text}/> Speler
          </Text>
          <Text style={{
                  color: colors.main,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: TOTAL_WIDTH
                }}>
            Totaal
          </Text>
          {games.map((game) => {
            return <Text key={game}
                         style={{
                           width: SCORE_FACTOR2 * (String(game).length + SCORE_FACTOR),
                           textAlign: 'center'
                         }}>{game}</Text>
          })}
        </View>
        {players.map((player, index) => {
          const total = getTotalScoreForPlayer(index, scores);
          return (
            <View key={index}
                  style={{
                    flexDirection: 'row',
                    paddingTop: 15,
                    paddingBottom: 15,
                    borderBottomColor: '#E3E3E3',
                    borderBottomWidth: 1
                  }}>
              <_DealerButton show={index===dealer}/>
              <Text numberOfLines={1}
                    ellipsizeMode='tail'
                    style={{
                      color: colors.text,
                      width: NAME_WIDTH,
                      marginRight: 10,
                      fontSize: 15,
                      textAlign: 'right'
                    }}>
                {player.name}
              </Text>
              <Text style={{
                      color: colors.main,
                      fontSize: 15,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      width: TOTAL_WIDTH
                    }}>
                {total}
              </Text>
              {games.map((game) => {
                return (
                  <Text key={game}
                        style={{
                          width: SCORE_FACTOR2 * (String(game).length + SCORE_FACTOR),
                          textAlign: 'center',
                          fontSize: 15
                        }}>
                    {getScoreForPlayerForGame(game, index, scores)}
                  </Text>
                )
              })}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const _DealerButton = ({show}) => {
  if(!show){
    return <View style={{width: 20, height: 20, marginRight: 10}}/>
  }
  return (
    <View style={{
      width: 20,
      height: 20,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.cta,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.cta
    }}>
      <Text style={{color: '#FFF', fontSize: 12, fontWeight: 'bold'}}>D</Text>
    </View>
  );
};

export default ScoreTable;

export {
  getScoreForPlayerForGame,
  getTotalScoreForPlayer,
  getWinner,
  getWinnerName,
  getOrderWithScores
}