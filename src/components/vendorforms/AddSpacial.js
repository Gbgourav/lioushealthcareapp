import Modal from 'react-native-modal';
import {View, Text, Input, Button} from 'native-base';
import {useState} from 'react';

const AddSpacial = ({open, closeAddMore, handleSp}) => {
  const [inputValue, setInputValue] = useState(null);
  const type = open.sp ? 'spacial' : open.se ? 'service' : 'facility';
  const Title = open.sp
    ? 'Add Specialization'
    : open.se
    ? 'Add Services'
    : 'Add Facilities';

  const handleInputChange = text => {
    setInputValue(text);
  };

  const onSubmit = () => {
    handleSp(inputValue, type);
  };

  return (
    <Modal
      isVisible={true}
      onBackdropPress={() => closeAddMore()}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 40,
          paddingHorizontal: 10,
        }}>
        <Text>{Title}</Text>
        <View style={{marginVertical: 20}}>
          <Input
            value={inputValue}
            onChangeText={handleInputChange}
            placeholder="Enter value"
          />
        </View>
        {inputValue ? (
          <View style={{marginVertical: 20}}>
            <Button onPress={onSubmit}>Add</Button>
          </View>
        ) : null}
      </View>
    </Modal>
  );
};

export default AddSpacial;
