import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { changePreloader } from "../../store/reducers/requestSlice";
import { useState } from "react";
import { clearLogin } from "../../store/reducers/stateSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfirmationModal from "../../common/ConfirmationModal";
import { clearLocalData } from "../../store/reducers/saveDataSlice";

export const LogOut = ({ navigation }) => {
  const [modal, setMoodal] = useState(false);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(changePreloader(true));
    setTimeout(() => {
      navigation.navigate("Login");
      dispatch(changePreloader(false));
    }, 500);
    dispatch(clearLogin());
    clearAsyncStorage();
  };

  const clearAsyncStorage = async () => {
    dispatch(clearLocalData());
    ///// очищаю AsyncStorage
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Ошибка при очистке AsyncStorage:", error);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setMoodal(true)}
        style={styles.logoutParent}
      >
        <View style={styles.logoutInner}>
          <View style={styles.line}>
            <View style={styles.lineInner}></View>
          </View>
        </View>
      </TouchableOpacity>

      <ConfirmationModal
        visible={modal}
        message="Выйти c приложения ?"
        onYes={() => logOut()}
        onNo={() => setMoodal(false)}
        onClose={() => setMoodal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  logoutParent: {
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutInner: {
    position: "relative",
    width: "70%",
    height: "70%",
    borderWidth: 4,
    borderRadius: 20,
    borderColor: "#43b7f2",
    display: "flex",
    alignItems: "center",
  },

  line: {
    backgroundColor: "#fff",
    padding: 3,
    paddingLeft: 4,
    paddingRight: 4,
    position: "absolute",
    top: -9,
  },
  lineInner: {
    width: 5,
    height: 17,
    backgroundColor: "#43b7f2",
    borderRadius: 5,
  },
});
