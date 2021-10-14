import React from 'react';
import {View} from 'react-native';
import UText from '../common/UText';

const SingleUserScreen = ({route}) => {
    const { first_name, last_name, email, address, role } = route.params.item;
    return (
    <View>
      <UText>{first_name}</UText>
      <UText>{last_name}</UText>
      <UText>{email}</UText>
      <UText>{address}</UText>
      <UText>{role}</UText>
    </View>
  );
};

export default SingleUserScreen;
