import { Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changeDataLogin, clearLogin } from "../store/reducers/stateSlice";
import { ViewInput } from "../customsTags/ViewInput";
import { ViewContainer } from "../customsTags/ViewContainer";
import { ViewButton } from "../customsTags/ViewButton";
import { logInAccount } from "../store/reducers/requestSlice";
import { useEffect } from "react";
import logo from "../assets/images/ahvatLogo.png";

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { dataLogin } = useSelector((state) => state.stateSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const onChangeLogin = (text) => {
    dispatch(changeDataLogin({ ...dataLogin, login: text }));
  };

  const onChangePassword = (text) => {
    dispatch(changeDataLogin({ ...dataLogin, password: text }));
  };

  const sendLogin = () => {
    if (dataLogin?.login && dataLogin?.password) {
      dispatch(logInAccount({ dataLogin, navigation, data }));
    } else {
      alert("Введите логин и пароль!");
    }
  };

  useEffect(() => {
    dispatch(clearLogin());
  }, []);

  return (
    <View styles={{ position: "relative" }}>
      <ViewContainer>
        <View style={styles.logoBlock}>
          <Image source={logo} style={styles.logoImg} />
        </View>
        <ViewInput
          text="Введите логин"
          value={dataLogin?.login}
          onChangeText={onChangeLogin}
          placeholder="Ваш логин"
        />
        <ViewInput
          text="Введите пароль"
          value={dataLogin?.password}
          onChangeText={onChangePassword}
          placeholder="Ваш пароль"
          typePassword={true}
        />
      </ViewContainer>
      <ViewButton onclick={sendLogin} styles={styles.loginBtn}>
        Войти
      </ViewButton>
    </View>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    backgroundColor: "#43b7f2",
    position: "absolute",
    bottom: 30,
    left: 10,
    right: 10,
    minWidth: "90%",
    color: "#fff",
    marginTop: 0,
  },
  logoImg: {
    // width: 70,
    // height: 70,
    // borderRadius: 8,
    width: "100%",
    height: 80,
  },

  logoBlock: {
    minWidth: "100%",
    borderRadius: 8,
    // backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    // fontFamily: "Inter, sans-serif",
  },

  logoText: {
    fontSize: 45,
    fontWeight: "700",
    color: "#009900",
    lineHeight: 52,
  },
});
