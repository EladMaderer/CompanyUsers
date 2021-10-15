import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import UText from '../common/UText';
import {GStyles} from '../utilities/globalStyles';
import strings from '../../../assets/strings.json';

const SingleUserScreen = ({route}) => {
  const DEFAULT_IMG = require('../../../assets/images/defaultPerson.png');
  const {first_name, last_name, email, address, role, image} =
    route.params.item;

  const RenderLine = ({title, text}) => (
    <View style={styles.textView}>
      <UText style={styles.textTitle}>{title}: </UText>
      <UText style={styles.text}>{text}</UText>
    </View>
  );

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
          <View style={styles.textView}>
            <UText style={styles.textTitle}>{strings.name}: </UText>
            <UText style={styles.text}>
              {first_name} {last_name}
            </UText>
          </View>
        )}
        {email && <RenderLine title={strings.email} text={email} />}
        {address && <RenderLine title={strings.address} text={address} />}
        {role && <RenderLine title={strings.role} text={role} />}
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
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  textTitle: {
    fontSize: 21,
    fontWeight: '700',
  },
  text: {
    fontSize: 17,
    fontWeight: '700',
  },
});

export default SingleUserScreen;
