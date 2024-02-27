import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({
  button_card: {
    minHeight: 70,
    backgroundColor: 'whitesmoke',
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  btn_card_in: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn_in_in: {
    justifyContent: 'center',
    gap: 5,
  },
  heading: {
    textAlign: 'left',
    fontWeight: 700,
    fontSize: 16,
    color: '#006600',
    marginVertical: 10,
  },
  view_all_text: {
    color: '#006600',
    marginVertical: 20,
    fontSize: 14,
  },
  container: {
    // padding: 10,
    // marginBottom: 20,
  },
  card: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    margin: 8,
  },
  cardText: {
    fontSize: 16,
  },
  card_hor: {
    width: 180,
    height: 300,
    margin: 8,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'lightgray',
    overflow: 'hidden',
  },
  cardText_hor: {
    fontSize: 16,
  },
  view_all: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  image: {
    height: 120,
    aspectRatio: 0.8,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  image_pro: {
    height: 120,
    aspectRatio: 1,
    borderRadius: 8,
    // top: 5,
    // position: 'absolute',
  },
  image_big: {
    height: 180,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  cardText_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
