import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Vibration } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
import { useDispatch, useSelector } from "react-redux";
import { addProdQrCode } from "../store/reducers/requestSlice";

export const ScannerProdScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { guid } = route.params; /// guid накладной

  const [permission, requestPermission] = Camera.useCameraPermissions();
  //// разрешение для камеры
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { data } = useSelector((state) => state.saveDataSlice);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const showResultModal = async ({ data }) => {
    const { seller_guid } = data;
    if (data && !scanned) {
      setScanned(true);
      dispatch(addProdQrCode({ data, navigation, seller_guid, guid }));
      Vibration.vibrate(); // Простая вибрация
      // Вызов вибрации при обнаружении QR-кода
    }
  };

  if (!permission) {
    /// Разрешения камеры все еще загружаются
    return <View />;
  }

  if (!permission.granted || hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Разрешите доступ к камере в настройках вашего устройства!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scanned ? undefined : showResultModal}
        style={StyleSheet.absoluteFillObject}
      >
        <BarcodeMask
          type={BarCodeScanner.Constants.BarCodeType.qr}
          edgeColor={"rgba(12, 169, 70, 0.9)"}
          edgeRadius={10}
          width={280}
          height={280}
          animatedLineColor={"#f32a2a"}
          animatedLineHeight={2}
          animatedLineWidth={"97%"}
          showAnimatedLine={true}
          outerMaskOpacity={0.7}
          useNativeDriver={false}
          edgeBorderWidth={5}
        />
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    position: "relative",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ScannerProdScreen;
