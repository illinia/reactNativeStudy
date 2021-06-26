import React, {useCallback, useState, useRef, useEffect, useMemo} from 'react';
import type {FC} from 'react';
import {View, Image, Text, Alert, Animated, Easing} from 'react-native';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment-with-locales-es6';
import * as D from '../data';
// prettier-ignore
import { useToggle, useAnimatedValue, useMonitorAnimatedValue, useStyle } from '../hooks';
import {Avatar} from '../components';
import {Text as ThemeText, View as ThemeView} from '../theme/paper';
import {styles} from './Person.style';

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

// prettier-ignore
const PersonToggle: FC<PersonProps> = ({person, deletePressed}) => {
  const animValue = useAnimatedValue(0);
  const realAnimValue = useMonitorAnimatedValue(animValue);
  const [started, toggleStarted] = useToggle(false);

  const avatarPressed = useCallback(() => {
    Animated.timing(animValue, {
      toValue: started ? 0 : 1,
      useNativeDriver: true,
      duration: 1000,
      easing: Easing.bounce
    }).start(toggleStarted)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  const rightViewAnimStyle = useStyle({opacity: animValue});

  return (
    <ThemeView>
      <ThemeText style={[{fontsize: 20}]}>
        realAnimValue: {realAnimValue}
      </ThemeText>
      <ThemeText style={[{fontSize: 20}]}>
        started: {started ? 'true' : 'false'}
      </ThemeText>
      <View style={[styles.view]}>
        <View style={[styles.leftView]}>
          <Avatar imageStyle={[styles.avatar]} uri={person.avatar} size={50}
            onPress={avatarPressed} />
          <Text style={[styles.text]}>Press Me</Text>
        </View>
        <Animated.View style={[styles.rightView, rightViewAnimStyle]}>
          <Text style={[styles.name]}>{person.name}</Text>
          <Text style={[styles.email]}>{person.email}</Text>
          <View style={[styles.dateView]}>
            <Text style={[styles.text]}>
              {moment(person.createdDate).startOf('day').fromNow()}
            </Text>
            <Icon name='trash-can-outline' size={26} color={Colors.lightBlue500}
              onPress={deletePressed} />
          </View>
          <Text numberOfLines={3} ellipsizeMode="tail" style={[styles.text,
            styles.comments]}>{person.comments}</Text>
          <Image style={[styles.image]} source={{uri: person.image}} />
          <View style={[styles.countsView]}>
            <Icon name="comment" size={24} color={Colors.blue500} />
            <Icon name="twitter-retweet" size={24} color={Colors.purple500} />
            <Icon name="heart" size={24} color={Colors.red500} />
          </View>
        </Animated.View>
      </View>
    </ThemeView>
  );
};

export default PersonToggle;
