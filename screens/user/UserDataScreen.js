// import React, { useEffect } from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import { useDispatch } from 'react-redux';
// import Colors from '../../constants/Colors';
// import * as userAction from '../../store/actions/user';
// import Card from '../../UI/Card';
// import constants from '../../constants/Constants';
// import UserAvatarItem from '../../components/UserComponents/UserAvatarItem';

// const UserDataScreen = ({ route }) => {
//   const dispatch = useDispatch();
//   const { userMail, userPhoneNumber, userId, avatar, role } = route.params;

//   useEffect(() => {
//     dispatch(userAction.loadUserData());
//   }, []);

//   return (
//     <View style={styles.screen}>
//       <Card style={styles.patientDataCard}>
//         <UserAvatarItem avatar={avatar} role={role} />
//         <View style={styles.details}>
//           <Text style={styles.label}>E-mail:</Text>
//           <Text style={styles.label}>{userMail}</Text>
//         </View>
//         <View style={styles.details}>
//           <Text style={styles.label}>ID:</Text>
//           <Text style={styles.label}>{userId}</Text>
//         </View>
//         <View style={styles.details}>
//           <Text style={styles.label}>Numer telefonu:</Text>
//           <Text style={styles.label}>
//             {userPhoneNumber && userPhoneNumber.length > 0
//               ? userPhoneNumber
//               : 'Brak dancyh'}
//           </Text>
//         </View>
//       </Card>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     backgroundColor: Colors.secondary,
//   },
//   patientDataCard: {
//     borderRadius: 10,
//     width: constants.screenWidth - 40,
//     height: constants.screenHeight / 2 - 90,
//     justifyContent: 'space-around',
//   },
//   details: {
//     flexDirection: 'row',
//     paddingLeft: 10,
//     flexWrap: 'wrap',
//   },
//   avatar: {
//     height: 100,
//     width: 100,
//     borderRadius: 20,
//     backgroundColor: Colors.secondary,
//   },
//   label: {
//     color: Colors.details,
//     fontFamily: 'open-sans-bold',
//     fontSize: 14,
//     textAlign: 'center',
//     paddingLeft: 10,
//   },

//   data: {
//     flexDirection: 'column',
//     justifyContent: 'space-evenly',
//   },

//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });

// export const screenOptions = (navData) => {
//   const patientName = navData.route.params.patientName;
//   return {
//     title: patientName,
//     headerTintColor: Colors.primary,
//     headerStyle: { backgroundColor: Colors.secondary },
//   };
// };

// export default UserDataScreen;
