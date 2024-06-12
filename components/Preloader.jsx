import { ActivityIndicator, Text, View } from "react-native";
import { useSelector } from "react-redux";

export const Preloader = () => {
  const { preloader } = useSelector((state) => state.requestSlice);
  if (preloader) {
    return (
      <View
        style={{
          backgroundColor: "#f5f5f5",
          width: "100%",
          minHeight: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <ActivityIndicator size="large" style={{ margin: "auto" }} />
        <Text>Загрузка...</Text>
      </View>
    );
  }
};
