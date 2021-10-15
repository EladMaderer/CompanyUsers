import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import UText from '../common/UText';
import {GStyles} from '../utilities/globalStyles';
import strings from '../../../assets/strings.json';

const SingleUserScreen = ({route}) => {
  const DEFAULT_IMG = require('../../../assets/images/defaultPerson.png');
  const {first_name, last_name, email, address, role, image} =
    route.params.item;
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={image ? {uri: image} : DEFAULT_IMG}
          defaultSource={DEFAULT_IMG}
        />
      </View>
      <>
        {first_name && (
          <UText style={styles.textStyle}>
            {`${strings.name} ${first_name} ${last_name}`}
          </UText>
        )}
        {email && (
          <UText style={styles.textStyle}>{`${strings.email} ${email}`}</UText>
        )}
        {address && (
          <UText
            style={styles.textStyle}>{`${strings.address} ${address}`}</UText>
        )}
        {role && (
          <UText style={styles.textStyle}>{`${strings.role} ${role}`}</UText>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(237, 235, 245, 0.5)',
  },
  imageView: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    marginVertical: 30,
    ...GStyles.shadow,
  },
  image: {
    width: 144,
    height: 144,
    borderRadius: 144 / 2,
  },
  textStyle: {
    fontSize: 21,
    fontWeight: '700',
    marginTop: 20,
  },
});

export default SingleUserScreen;
