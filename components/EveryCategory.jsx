import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";

const ParentDiv = styled.TouchableOpacity`
  min-width: 47%;
  height: 180px;
  border-radius: 8px;
  position: relative;
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 2;
  margin: 5px;
`;

const TextTitle = styled.Text`
  margin: 0;
  padding: 0;
  font-size: 19px;
  font-weight: 600;
  padding: 5px 10px;
  background-color: rgba(199, 210, 254, 0.25);
  color: #222;
  width: 100%;
  text-align: center;
  border-radius: 0 0 8px 8px;
`;

const BackgroundImage = styled.Image`
  width: 100%;
  height: 140px;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 8px;
`;

export const EveryCategory = ({ obj, navigation }) => {
  const clickCateg = () => {
    navigation.navigate(`${obj.link}`, {
      id: obj?.codeid,
      name: obj?.name,
      pathApi: obj?.pathApi,
    });
  };

  return (
    <ParentDiv onPress={clickCateg}>
      <View style={styles.shadow}></View>
      <BackgroundImage source={{ uri: obj.img }} />
      <View style={styles.main}>
        <TextTitle>{obj?.name}</TextTitle>
      </View>
    </ParentDiv>
  );
};

const styles = StyleSheet.create({
  shadow: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(15, 15, 16, 0.064)",
    zIndex: 10,
    borderRadius: 8,
  },
  main: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    // backgroundColor: "red",
    zIndex: 11,
    borderRadius: 8,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
