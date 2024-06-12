import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import styles from "./style";
import { ViewButton } from "../../customsTags/ViewButton";
import logo from "../../assets/images/ahvatLogo.png";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { confirmInvoiceQRResult } from "../../store/reducers/requestSlice";

const ConfirmAnalizScreen = ({ navigation, route }) => {
  const { analyze_type, date, doctor, qrcode } = route.params?.data;

  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.saveDataSlice);

  const [confirm, setConfirm] = useState(false); // Состояние для идентификатора элемента, для которого открывается модальное окно

  const confirmBtn = () => {
    const dataObj = { qrcode, seller_guid: data?.seller_guid };
    dispatch(confirmInvoiceQRResult({ dataObj, navigation }));
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.dateText}>Дата: {date}</Text>
      <Text style={styles.doctor}>Доктор: {doctor}</Text>
      <Text style={styles.analyzeType}>Анализ: "{analyze_type}"</Text>
      <ViewButton onclick={() => setConfirm(true)} styles={styles.btnAction}>
        Подтвердить
      </ViewButton>
      <ConfirmationModal
        visible={confirm}
        message="Подтвердить ?"
        onYes={confirmBtn}
        onNo={() => setConfirm(false)}
        onClose={() => setConfirm(false)}
      />
    </View>
  );
};

export default ConfirmAnalizScreen;
