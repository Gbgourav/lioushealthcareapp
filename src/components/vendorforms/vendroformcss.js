import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({
  label: {
    color: '#0C4E5F',
    fontWeight: 600,
    marginTop: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 75,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'lightgray',
  },
  circleImage: {
    width: '100%',
    height: '100%',
  },
  // pencle: {
  //   position: 'absolute',
  //   bottom: 5,
  //   right: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 50,
  // },
});
