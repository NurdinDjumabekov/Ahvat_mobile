import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

export const ChoiceAgents = ({ item, setState, prev, keyGuid, keyText }) => {
  const changeSelect = (value) => {
    setState({ ...prev, [keyGuid]: value });
  };

  return (
    <TouchableOpacity
      style={[
        styles.selectBlockInner,
        prev?.[keyGuid] === item?.[keyGuid] && styles.activeSelect,
      ]}
      onPress={() => changeSelect(item?.[keyGuid])}
    >
      <Text
        style={[
          styles.selectText,
          prev?.[keyGuid] === item?.[keyGuid] && styles.activeSelectText,
        ]}
      >
        {item?.[keyText]}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectBlockInner: {
    minWidth: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 5,
  },

  activeSelect: {
    backgroundColor: "rgba(47, 71, 190, 0.672)",
  },

  selectText: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(47, 71, 190, 0.672)",
  },

  activeSelectText: {
    color: "#fff",
  },
});
