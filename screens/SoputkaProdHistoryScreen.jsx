import { useEffect } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmSoputka,
  deleteSoputkaProd,
  getListSoputkaProd,
} from "../store/reducers/requestSlice";
import { ViewButton } from "../customsTags/ViewButton";
import { formatCount } from "../helpers/amounts";
import ConfirmationModal from "../common/ConfirmationModal";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";

export const SoputkaProdHistoryScreen = ({ navigation, route }) => {
  //// история каждой накладной сапутки
  const dispatch = useDispatch();
  const { guidInvoice } = route.params;

  const [modalItemGuid, setModalItemGuid] = useState(null); // Состояние для идентификатора элемента, для которого открывается модальное окно

  const [confirm, setConfirm] = useState(false); // Состояние для идентификатора элемента, для которого открывается модальное окно

  const { preloader, listProdSoputka } = useSelector(
    (state) => state.requestSlice
  );

  useEffect(() => {
    getData();
    navigation.setOptions({
      title: `${listProdSoputka?.[0]?.doctor}`,
    });

    // listProdSoputka?.length === 0 && navigation?.navigate("Soputka");
    ////// перевожу пользователя на другую страницу, если список пустой
  }, [listProdSoputka?.[0]?.doctor]);

  const getData = () => {
    dispatch(getListSoputkaProd(guidInvoice));
  };

  const confirmBtn = () => {
    const products = listProdSoputka?.[0]?.list?.map((item) => ({
      guid: item?.guid,
    }));
    const sendData = { products, invoice_guid: guidInvoice };

    dispatch(confirmSoputka({ sendData, navigation }));
    /// подтверждение накладной сопутки
  };

  const addProd = () => {
    const forAddTovar = { guid: guidInvoice };
    navigation?.navigate("AddProdSoputkaSrceen", { forAddTovar });
  };

  const del = (product_guid) => {
    dispatch(deleteSoputkaProd({ product_guid, getData }));
    setModalItemGuid(null);
  };

  const status = listProdSoputka?.[0]?.status === 0;
  /// 0 - не подтверждён else подтверждён

  const listData = listProdSoputka?.[0]?.list;

  console.log(listProdSoputka, "listProdSoputka");

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          style={styles.historyParent}
          refreshControl={
            <RefreshControl refreshing={preloader} onRefresh={getData} />
          }
        >
          {listData?.map((item, index) => (
            <>
              <View style={styles.EveryInner}>
                <View style={styles.mainData}>
                  <View style={styles.mainDataInner}>
                    <Text style={styles.titleNum}>{index + 1}</Text>
                    <View>
                      <Text style={styles.date}>{item.date} </Text>
                      <Text style={styles.sum}>
                        {item.product_price} х {item.count} ={" "}
                        {formatCount(item.total)} сомони
                      </Text>
                    </View>
                  </View>
                  {status && (
                    <TouchableOpacity
                      style={styles.krest}
                      onPress={() => setModalItemGuid(item?.guid)}
                    >
                      <View style={[styles.line, styles.deg]} />
                      <View style={[styles.line, styles.degMinus]} />
                    </TouchableOpacity>
                  )}
                </View>
                <Text style={styles.title}>{item.product_name}</Text>
              </View>
              <ConfirmationModal
                visible={modalItemGuid === item?.guid}
                message="Отменить продажу ?"
                onYes={() => del(item.guid)}
                onNo={() => setModalItemGuid(null)}
                onClose={() => setModalItemGuid(null)}
              />
            </>
          ))}
        </ScrollView>
        {status && (
          <View style={styles.actions}>
            <ViewButton
              styles={styles.sendBtn}
              onclick={() => setConfirm(true)}
            >
              Подтвердить
            </ViewButton>
            <ViewButton styles={styles.sendBtn} onclick={addProd}>
              Добавить товар
            </ViewButton>
          </View>
        )}
      </View>
      <ConfirmationModal
        visible={confirm}
        message="Подтвердить ?"
        onYes={() => confirmBtn()}
        onNo={() => setConfirm(false)}
        onClose={() => setConfirm(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },

  historyParent: {
    minWidth: "100%",
    width: "100%",
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.587)",
    minHeight: "80%",
    flex: 1,
  },

  EveryInner: {
    backgroundColor: "rgba(162, 178, 238, 0.102)",
    minWidth: "100%",
    padding: 8,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.287)",
  },

  mainData: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingRight: 10,
  },

  mainDataInner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  titleNum: {
    fontSize: 19,
    fontWeight: "700",
    color: "rgba(47, 71, 190, 0.672)",
    borderColor: "rgba(47, 71, 190, 0.672)",
    borderWidth: 1,
    backgroundColor: "#d4dfee",
    padding: 3,
    paddingLeft: 7,
    paddingRight: 5,
    borderRadius: 5,
  },

  date: {
    fontSize: 15,
    fontWeight: "500",
    borderRadius: 5,
    lineHeight: 16,
    color: "rgba(12, 169, 70, 0.9)",
  },

  sum: {
    fontSize: 14,
    fontWeight: "500",
    borderRadius: 5,
    lineHeight: 16,
    color: "rgba(47, 71, 190, 0.672)",
  },

  title: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 5,
  },

  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },

  sendBtn: {
    backgroundColor: "#fff",
    color: "#fff",
    width: "48%",
    borderRadius: 10,
    fontWeight: 600,
    backgroundColor: "rgba(12, 169, 70, 0.9)",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    alignSelf: "center",
    fontSize: 16,
  },

  //////////////////// krestik
  krest: {
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
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
