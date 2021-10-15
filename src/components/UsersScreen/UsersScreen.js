import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearUsers, searchUsers} from '../../../redux/actions/usersActions';
import {useApi} from '../../../api/api';
import {FETCH_USERS_LIMIT} from '../../../api/apiProperties';
import SearchInput from '../common/SearchInput';
import NoResults from '../common/NoResults';
import {GStyles} from '../utilities/globalStyles';
import UText from '../common/UText';

const UsersScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const users = useSelector(({usersReducer}) => usersReducer.users);
  const searchTerm = useSelector(({usersReducer}) => usersReducer.searchTerm);
  const [fetchFromIndex, setFetchFromIndex] = useState(0);
  const indexIncrement = fetchFromIndex + FETCH_USERS_LIMIT;
  // For UserCard
  const SPACING = 20;
  const AVATAR_SIZE = 70;
  const DEFAULT_IMG = require('../../../assets/images/defaultPerson.png');

  const {loading, fetchUsersLimit} = useApi();

  useEffect(() => {
    if (searchTerm.length !== 1) {
      setFetchFromIndex(FETCH_USERS_LIMIT);
      dispatch(clearUsers());
      fetchUsersLimit(0, FETCH_USERS_LIMIT, searchTerm);
    }
  }, [searchTerm]);

  const onEndScroll = () => {
    setFetchFromIndex(indexIncrement);
    if (users.length === fetchFromIndex) {
      fetchUsersLimit(fetchFromIndex, indexIncrement, searchTerm);
    }
  };

  const UserCard = ({item}) => {
    const {first_name, last_name, image, role} = item;
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.userCard}
        onPress={() => {
          navigation.navigate('SingleUserScreen', {item});
        }}>
        <Image
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: AVATAR_SIZE,
            marginRight: SPACING / 2,
          }}
          source={image ? {uri: image} : DEFAULT_IMG}
          defaultSource={DEFAULT_IMG}
        />
        <View>
          <UText style={styles.userName}>{`${first_name} ${last_name}`}</UText>
          <UText style={styles.role}>{role}</UText>
        </View>
      </TouchableOpacity>
    );
  };

  /* onEndReached - Loading new data faster (before the bounce effect is done),
     But sometimes fire twice instead of once, when the user scroll very fast - known bug in iOS. */
  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../../../assets/images/BGImage.jpeg')}
        style={styles.BgImage}
      />
      <SearchInput
        onChangeText={text => dispatch(searchUsers(text))}
        value={searchTerm}
        placeholder="Search User"
        autoCapitalize="none"
      />
      <FlatList
        contentContainerStyle={{padding: SPACING}}
        keyExtractor={({id}) => id}
        data={users}
        renderItem={UserCard}
        onEndReached={() => Platform.OS !== 'ios' && onEndScroll()}
        onMomentumScrollEnd={() => Platform.OS === 'ios' && onEndScroll()}
        ListFooterComponent={loading && <ActivityIndicator size={'large'} />}
        ListFooterComponentStyle={{padding: 30}}
        ListEmptyComponent={!loading && <NoResults style={{marginTop: 20}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userCard: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    marginBottom: 20,
    ...GStyles.shadow,
  },
  BgImage: {
    ...StyleSheet.absoluteFillObject,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
  },
  role: {
    marginTop: 10,
    fontSize: 15,
    opacity: 0.7,
  },
});

export default UsersScreen;
