import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "./LoginScreen";
import { MainScreen } from "./MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { LogOut } from "../components/Header/LogOut";
import { LeftoversScreen } from "./LeftoversScreen";
import { PayMoneyScreen } from "./PayMoneyScreen";
import UserInfo from "../components/Header/UserInfo";
import { getLocalDataUser } from "../helpers/returnDataUser";
import { changeLocalData } from "../store/reducers/saveDataSlice";
import { Preloader } from "../components/Preloader";
import { HistoryBalance } from "./HistoryBalance";
import { AddProdSoputkaSrceen } from "./AddProdSoputkaSrceen";
import { SoputkaScreen } from "./SoputkaScreen";
import { SoputkaProdHistoryScreen } from "./SoputkaProdHistoryScreen";
import ScannerScreen from "./ScannerScreen";
import ScannerProdScreen from "./ScannerProdScreen";
import { SearchScreen } from "./SearchScreen";
import ConfirmAnalizScreen from "./Confirm/ConfirmAnalizScreen";
import { ListAcceptAnalizScreen } from "./ListAcceptAnalizScreen/ListAcceptAnalizScreen";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.saveDataSlice);

  useEffect(() => {
    getLocalDataUser({ changeLocalData, dispatch });
  }, []);

  const checkLogin = !data?.seller_guid;

  return (
    <NavigationContainer>
      <Preloader />
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "#fff" } }}
      >
        {checkLogin ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={({ navigation }) => ({
                title: "",
                headerLeft: () => <UserInfo />,
                headerRight: () => <LogOut navigation={navigation} />,
              })}
            />

            {/* /////////////////////// cameraQRCode ///////////////////////*/}
            <Stack.Screen
              name="ScannerScreen"
              component={ScannerScreen}
              options={{ title: "Сканер" }}
              ////// сканер для докторов c анализами
            />

            <Stack.Screen
              name="ConfirmAnalizScreen"
              component={ConfirmAnalizScreen}
              options={{ title: "Результаты" }}
              ////// подтверждение анализа
            />

            <Stack.Screen
              name="ListAcceptAnalizScreen"
              component={ListAcceptAnalizScreen}
              options={{ title: "Список принятых анализов" }}
            />

            {/* ///////////////////////////////////// то что ниже не отобрадется в приложении //////////////////////////////////////////////// */}
            {/* ///////////////////////////////////// то что ниже не отобрадется в приложении //////////////////////////////////////////////// */}
            {/* ///////////////////////////////////// то что ниже не отобрадется в приложении //////////////////////////////////////////////// */}
            {/* ///////////////////////////////////// то что ниже не отобрадется в приложении //////////////////////////////////////////////// */}
            {/* ///////////////////////////////////// то что ниже не отобрадется в приложении //////////////////////////////////////////////// */}
            {/* ///////////////////////////////////// то что ниже не отобрадется в приложении //////////////////////////////////////////////// */}
            {/* ///////////////////////////////////// то что ниже не отобрадется в приложении //////////////////////////////////////////////// */}
            {/* ///////////////////////////////////// то что ниже не отобрадется в приложении //////////////////////////////////////////////// */}
            {/* ///////////////////////////////////// то что ниже не отобрадется в приложении //////////////////////////////////////////////// */}
            {/* ///////////////////////////////////// то что ниже не отобрадется в приложении //////////////////////////////////////////////// */}
            {/* ///////////////////////////////////// то что ниже не отобрадется в приложении //////////////////////////////////////////////// */}
            {/* ///////////////////////////////////// то что ниже не отобрадется в приложении //////////////////////////////////////////////// */}
            {/* ///////////////////////////////////// то что ниже не отобрадется в приложении //////////////////////////////////////////////// */}
            {/* ///////////////////////////////////// то что ниже не отобрадется в приложении //////////////////////////////////////////////// */}
            {/* ///////////////////////////////////// то что ниже не отобрадется в приложении //////////////////////////////////////////////// */}

            {/* /////////////////////// cameraQRCode for prod ///////////////////////*/}
            <Stack.Screen
              name="ScannerProdScreen"
              component={ScannerProdScreen}
              options={{ title: "Сканер для продажи товаров" }}
              ////// сканер для продажи товаров
            />

            {/* /////////////////////// Бонусы ///////////////////////*/}
            <Stack.Screen
              name="Leftovers"
              component={LeftoversScreen}
              options={{ title: "Проданные товары и бонусы " }}
            />

            {/* /////////////////////// HistoryBalance ///////////////////////*/}
            <Stack.Screen
              name="HistoryBalance"
              component={HistoryBalance}
              options={{ title: "История" }}
            />

            {/* /////////////////////// Сопутка => продажи ///////////////////////*/}
            <Stack.Screen
              name="Soputka"
              component={SoputkaScreen}
              options={{ title: "Проданные товары и бонусы" }}
            />

            <Stack.Screen
              name="AddProdSoputkaSrceen"
              component={AddProdSoputkaSrceen}
              options={{ title: "" }}
              ///// страница продаж
            />

            <Stack.Screen
              name="SoputkaProdHistoryScreen"
              component={SoputkaProdHistoryScreen}
              ///// детальный просмотр каждой истории продаж
            />
            {/* /////////////////////// SearchScreen ///////////////////////*/}

            <Stack.Screen
              name="SearchScreen"
              component={SearchScreen}
              options={{ title: "" }}
            />

            {/* /////////////////////// 0плата ТТ /////////////////////// */}
            <Stack.Screen
              name="PayMoney"
              component={PayMoneyScreen}
              options={{ title: "Оплата" }}
            />
          </>
        )}
      </Stack.Navigator>
      <StatusBar theme="auto" />
    </NavigationContainer>
  );
};
