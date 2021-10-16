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
import {routes} from '../../navigation/types';
import {FETCH_USERS_LIMIT} from '../../../api/apiTypes';
import {GStyles} from '../utilities/globalStyles';
import strings from '../../../assets/strings.json';
import backActionHandler from '../utilities/backActionHandler';
import {clearUsers, searchUsers} from '../../../redux/actions/usersActions';
import {useApi} from '../../../api/api';
import SearchInput from '../common/SearchInput';
import NoResults from '../common/NoResults';
import UText from '../common/UText';

const UsersScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const users = useSelector(({usersReducer}) => usersReducer.users);
  const searchTerm = useSelector(({usersReducer}) => usersReducer.searchTerm);
  const [fetchFromIndex, setFetchFromIndex] = useState(0);
  const indexIncrement = fetchFromIndex + FETCH_USERS_LIMIT;
  const DEFAULT_IMG = require('../../../assets/images/default-person.png');
  const isIos = Platform.OS === 'ios';

  const {loading, fetchUsersLimit} = useApi();

  useEffect(() => {
    if (searchTerm.length !== 1 && !loading) {
      setFetchFromIndex(FETCH_USERS_LIMIT);
      dispatch(clearUsers());
      fetchUsersLimit(0, FETCH_USERS_LIMIT, searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    backActionHandler();
  }, []);

  const onEndScroll = () => {

    if (users.length === fetchFromIndex) {
      fetchUsersLimit(fetchFromIndex, indexIncrement, searchTerm);
      setFetchFromIndex(indexIncrement);
    }
  };

  const UserCard = ({item}) => {
    const {first_name, last_name, image, role} = item;
    return (
      <View style={styles.userCard}>
        <TouchableOpacity
          style={styles.userCardButton}
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate(routes.SINGLE_USERS_SCREEN, {item});
          }}>
          <Image
            style={styles.userImage}
            source={image ? {uri: image} : DEFAULT_IMG}
            defaultSource={DEFAULT_IMG}
          />
          <View>
            <UText
              style={styles.userName}>{`${first_name} ${last_name}`}</UText>
            <UText style={styles.role}>{role}</UText>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  /* onEndReached - Loading new data faster (before the bounce effect is done),
     But sometimes fire twice instead of once, when the user scroll very fast - known bug in iOS. */
  return (
    <View>
      <Image
        source={require('../../../assets/images/BGImage.jpeg')}
        style={styles.BgImage}
      />
      <SearchInput
        onChangeText={text => dispatch(searchUsers(text))}
        value={searchTerm}
        placeholder={strings.search_user}
        autoCapitalize="none"
        autoComplete="off"
        spellCheck={false}
        autoCorrect={false}
      />
      <FlatList
        contentContainerStyle={styles.listContainer}
        keyExtractor={({id}) => id}
        data={users}
        renderItem={UserCard}
        onEndReached={() => !isIos && onEndScroll()}
        onMomentumScrollEnd={() => isIos && onEndScroll()}
        ListFooterComponent={loading && <ActivityIndicator size={'large'} />}
        ListFooterComponentStyle={{padding: 30}}
        ListEmptyComponent={!loading && <NoResults style={{marginTop: 40}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  userCard: {
    flex: 1,
    marginBottom: 20,
    ...GStyles.shadow,
  },
  userCardButton: {
    flexDirection: 'row',
    padding: 20,
  },
  BgImage: {
    ...StyleSheet.absoluteFillObject,
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginRight: 10,
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
