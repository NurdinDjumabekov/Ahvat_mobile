import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-native";
import { TouchableOpacity } from "react-native";
import { ViewButton } from "../../customsTags/ViewButton";
import { useState } from "react";
import { createInvoiceSoputkaTT } from "../../store/reducers/requestSlice";
import { ScrollView } from "react-native";
import { Alert } from "react-native";
import { ChoiceAgents } from "../ChoiceAgents";

export const ModalCreateSoputka = (props) => {
  //// модалка для созданя с0путки
  ////// еще понадобится

  const { modalState, setModalState, navigation } = props;

  const dispatch = useDispatch();

  const [obj, setObj] = useState({ comment: "", qrcode: "" });

  const closeModal = () => {
    setModalState(false);
    setObj({ comment: "", qrcode: "" });
  };

  const { data } = useSelector((state) => state.saveDataSlice);

  const { listAgents } = useSelector((state) => state.requestSlice);

  const create = () => {
    if (!obj?.qrcode) {
      Alert.alert("Выберите доктора");
    } else {
      const dataObj = { ...obj, seller_guid: data?.seller_guid };
      dispatch(createInvoiceSoputkaTT({ navigation, dataObj }));
      closeModal();
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
          <Text style={styles.titleSelect}>Выберите доктора</Text>
          <ScrollView style={styles.selectBlock}>
            {listAgents?.map((item) => (
              <ChoiceAgents
                item={item}
                setState={setObj}
                prev={obj}
                keyGuid={"qrcode"}
                keyText={"fio"}
              />
            ))}
          </ScrollView>
          <ViewButton styles={styles.sendBtn} onclick={create}>
            Подтвердить
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

  titleSelect: {
    fontSize: 17,
    fontWeight: "500",
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

  selectBlock: {
    marginTop: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    minHeight: 40,
    maxHeight: 180,
  },
});
