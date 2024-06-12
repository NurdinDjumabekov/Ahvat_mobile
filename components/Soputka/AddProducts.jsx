import { Alert, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ViewButton } from "../../customsTags/ViewButton";
import {
  changeTemporaryData,
  clearTemporaryData,
} from "../../store/reducers/stateSlice";
import {
  addProductSoputkaTT,
  getListSoputkaProd,
} from "../../store/reducers/requestSlice";
import { Modal } from "react-native";
import { Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

export const AddProducts = ({ guid }) => {
  ////guid созданной накладной
  //// для добавления продуктов в список
  const dispatch = useDispatch();

  const { temporaryData } = useSelector((state) => state.stateSlice);

  const onChange = (name, text) => {
    if (/^\d*\.?\d*$/.test(text)) {
      dispatch(changeTemporaryData({ ...temporaryData, [name]: text }));
    }
  };

  const addInInvoice = () => {
    if (
      temporaryData?.product_price === "" ||
      temporaryData?.ves === "" ||
      temporaryData?.product_price == 0 ||
      temporaryData?.ves == 0
    ) {
      Alert.alert("Введите цену и вес (кол-во)!");
    } else {
      const data = {
        invoice_guid: guid,
        count: temporaryData?.ves,
        price: temporaryData?.product_price,
        guid: temporaryData?.guid,
      };
      dispatch(addProductSoputkaTT({ data, getData }));
    }
  };

  const getData = async () => {
    dispatch(getListSoputkaProd(guid));
  }; /// для отображения всех проданных товаров

  const onClose = () => dispatch(clearTemporaryData());

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!temporaryData?.guid}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.parent}>
          <View style={styles.child}>
            <Text style={styles.title}>{temporaryData?.product_name}</Text>
            <TouchableOpacity style={styles.krest} onPress={() => onClose()}>
              <View style={[styles.line, styles.deg]} />
              <View style={[styles.line, styles.degMinus]} />
            </TouchableOpacity>
            <View style={styles.addDataBlock}>
              <View style={styles.blockInput}>
                <Text style={styles.titleInner}>Цена (сомони)</Text>
                <TextInput
                  style={styles.input}
                  value={temporaryData?.product_price?.toString()}
                  onChangeText={(text) => onChange("product_price", text)}
                  keyboardType="numeric"
                  placeholder="Цена"
                  maxLength={15}
                />
              </View>
              <View style={styles.blockInput}>
                <Text style={styles.titleInner}>Вес (кол-во, шт)</Text>
                <TextInput
                  style={styles.input}
                  value={temporaryData?.ves?.toString()}
                  onChangeText={(text) => onChange("ves", text)}
                  keyboardType="numeric"
                  maxLength={8}
                />
              </View>
            </View>
            <ViewButton styles={styles.btnAdd} onclick={addInInvoice}>
              Добавить
            </ViewButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    width: "",
  },

  leftovers: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(47, 71, 190, 0.591)",
    marginVertical: 5,
  },

  child: {
    padding: 15,
    paddingTop: 20,
    paddingBottom: 25,
    borderRadius: 5,
    backgroundColor: "#ebeef2",
    position: "relative",
    width: "90%",
  },

  title: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 10,
    maxWidth: "85%",
  },

  titleInner: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    paddingLeft: 2,
  },

  addDataBlock: {
    width: "100%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  blockInput: {
    width: "48%",
  },

  input: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    minWidth: "100%",
    borderRadius: 5,
    borderColor: "rgb(217 223 232)",
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  btnAdd: {
    color: "#fff",
    paddingTop: 11,
    paddingBottom: 11,
    borderRadius: 8,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    fontSize: 18,
    marginTop: 10,
    // backgroundColor: "rgba(97 ,100, 239,0.7)",
    backgroundColor: "rgba(12, 169, 70, 0.886)",
  },

  //////////////////// krestik
  krest: {
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    position: "absolute",
    right: 0,
    top: 18,
  },

  line: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "red",
  },

  deg: { transform: [{ rotate: "45deg" }] },
  degMinus: { transform: [{ rotate: "-45deg" }] },
});
