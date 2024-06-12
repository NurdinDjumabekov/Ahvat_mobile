import { TouchableWithoutFeedback } from "react-native";
import { Text } from "react-native";

export const ViewButton = ({ children, styles, onclick }) => {
  return (
    <TouchableWithoutFeedback onPress={onclick}>
      <Text
        style={[
          {
            textAlign: "center",
            paddingBottom: 12,
            paddingTop: 12,
            margin: "auto",
            marginTop: 10,
            borderRadius: 10,
            fontSize: 20,
            backgroundColor: styles?.backgroundColor || "#000",
            fontWeight: 700,
          },
          styles,
        ]}
      >
        {children}
      </Text>
    </TouchableWithoutFeedback>
  );
};
