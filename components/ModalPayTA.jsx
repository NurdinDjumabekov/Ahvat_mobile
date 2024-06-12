import { Alert, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { ViewButton } from "../customsTags/ViewButton";
import { acceptMoney } from "../store/reducers/requestSlice";
import { ScrollView } from "react-native";
import { ChoiceAgents } from "./ChoiceAgents";
import { useState } from "react";

export const ModalPayTA = ({ modalState, setModalState, navigation }) => {
  //// модалка для оплаты ТТ
  const dispatch = useDispatch();

  const [obj, setObj] = useState({ comment: "", amount: "", agent_guid: "" });

  const { data } = useSelector((state) => state.saveDataSlice);
  const { listAgents } = useSelector((state) => state.requestSlice);

  const closeModal = () => {
    setModalState(false);
    setObj({ comment: "", amount: "", agent_guid: "" });
  };

  const onChange = (text, type) => {
    if (type === "amount") {
      if (/^-?\d*\.?\d*$/.test(text)) {
        setObj({ ...obj, amount: text });
      }
    } else {
      setObj({ ...obj, comment: text });
    }
  };

  const sendMoney = () => {
    ///// отплачиваю деньги как ТТ ревизору
    if (!obj?.amount) {
      Alert.alert("Введите сумму");
    } else {
      const dataObj = { ...obj, seller_guid: data?.seller_guid };
      dispatch(acceptMoney({ dataObj, closeModal, navigation }));
      // if (temporaryGuidPoint?.debit < temporaryGuidPoint?.amount) {
      //   Alert.alert("Введенная вами сумма больше зарабатка торговой точки!");
      // } else {
      // }
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalState}
      onRequestClose={closeModal}
    >
      <TouchableOpacity
        style={styles.modalOuter}
        activeOpacity={1}
        onPress={closeModal} // Закрыть модальное окно
      >
        <View style={styles.modalInner} onPress={() => setModalState(true)}>
          <ScrollView style={styles.selectBlock}>
            {listAgents?.map((item) => (
              <ChoiceAgents
                item={item}
                setState={setObj}
                prev={obj}
                keyGuid={"agent_guid"}
                keyText={"agent"}
              />
            ))}
          </ScrollView>
          <TextInput
            style={styles.inputNum}
            value={obj?.amount?.toString()}
            onChangeText={(e) => onChange(e, "amount")}
            placeholder="Сумма"
            keyboardType="numeric"
            maxLength={8}
          />
          <TextInput
            style={styles.inputComm}
            value={obj?.comment}
            onChangeText={(e) => onChange(e, "comment")}
            placeholder="Ваш комментарий"
            multiline={true}
            numberOfLines={4}
          />
          <ViewButton styles={styles.sendBtn} onclick={sendMoney}>
            Оплатить
          </ViewButton>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOuter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalInner: {
    backgroundColor: "#ebeef2",
    padding: 15,
    borderRadius: 10,
    width: "95%",
  },

  selectBlock: {
    marginVertical: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    minHeight: 40,
    maxHeight: 250,
  },

  inputNum: {
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    borderRadius: 8,
    padding: 10,
    paddingVertical: 8,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  inputComm: {
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    height: 60,
    borderRadius: 8,
    padding: 10,
    paddingLeft: 15,
    marginTop: 10,
    height: 120,
    fontSize: 16,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },

  sendBtn: {
    backgroundColor: "#fff",
    color: "#fff",
    minWidth: "100%",
    paddingTop: 10,
    borderRadius: 10,
    fontWeight: 600,
    backgroundColor: "rgba(12, 169, 70, 0.9)",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    marginTop: 20,
  },
});
