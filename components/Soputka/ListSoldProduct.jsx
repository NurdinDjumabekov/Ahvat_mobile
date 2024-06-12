import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View, TouchableOpacity, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmSoputka,
  deleteSoputkaProd,
  getListSoputkaProd,
} from "../../store/reducers/requestSlice";
import ConfirmationModal from "../../common/ConfirmationModal";
import { ViewButton } from "../../customsTags/ViewButton";

export const ListSoldProduct = ({ guidInvoice, navigation }) => {
  //// список проданных продуктов
  const dispatch = useDispatch();
  const [modalItemGuid, setModalItemGuid] = useState(null); // Состояние для идентификатора элемента, для которого открывается модальное окно
  const [modalConfirm, setModalConfirm] = useState(false);

  const { preloader, listProdSoputka } = useSelector(
    (state) => state.requestSlice
  );

  const list = listProdSoputka?.[0]?.list;

  useEffect(() => {
    getData();
  }, [guidInvoice]);

  const getData = () => {
    dispatch(getListSoputkaProd(guidInvoice));
  };

  const del = (product_guid) => {
    dispatch(deleteSoputkaProd({ product_guid, getData }));
    setModalItemGuid(null);
    ////// удаление продуктов сопутки
  };

  const confirmBtn = () => {
    const products = listProdSoputka?.[0]?.list?.map((item) => ({
      guid: item?.guid,
    }));
    const sendData = { products, invoice_guid: guidInvoice };
    dispatch(confirmSoputka({ sendData, navigation }));
    ///// подтверждение накладной сопутки
  };

  //////// беру в списке товаров guid для отправки для подтверждения

  const none = listProdSoputka?.length === 0;
  const moreOne = list?.length > 0;

  return (
    <>
      {none ? (
        <Text style={styles.noneData}>Список пустой</Text>
      ) : (
        <View style={{ paddingBottom: 50 }}>
          <View
            style={styles.flatList}
            refreshControl={
              <RefreshControl refreshing={preloader} onRefresh={getData} />
            }
          >
            {list?.map((item, index) => (
              <TouchableOpacity style={styles.container} key={item?.guid}>
                <View style={styles.parentBlock}>
                  <View style={styles.mainData}>
                    <Text style={styles.titleNum}>{list?.length - index} </Text>
                    <View>
                      <Text style={styles.titleDate}>
                        {item?.date || "..."}
                      </Text>
                      <Text style={styles.totalPrice}>
                        {item?.product_price} х {item?.count} = {item?.total}{" "}
                        сомони
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.krest}
                    onPress={() => setModalItemGuid(item?.guid)}
                  >
                    <View style={[styles.line, styles.deg]} />
                    <View style={[styles.line, styles.degMinus]} />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.title}>{item?.product_name}</Text>
                </View>

                <ConfirmationModal
                  visible={modalItemGuid === item.guid}
                  message="Отменить ?"
                  onYes={() => del(item.guid)}
                  onNo={() => setModalItemGuid(null)}
                  onClose={() => setModalItemGuid(null)}
                />
              </TouchableOpacity>
            ))}
          </View>
          {moreOne && (
            <ViewButton
              styles={styles.sendBtn}
              onclick={() => setModalConfirm(true)}
            >
              Подтвердить
            </ViewButton>
          )}
        </View>
      )}
      <ConfirmationModal
        visible={modalConfirm}
        message="Подтвердить ?"
        onYes={confirmBtn}
        onNo={() => setModalConfirm(false)}
        onClose={() => setModalConfirm(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(162, 178, 238, 0.102)",
    minWidth: "100%",
    padding: 8,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.287)",
  },

  parentBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
    paddingRight: 0,
    borderRadius: 5,
  },

  titleDate: {
    fontSize: 14,
    fontWeight: "500",
    borderRadius: 5,
    lineHeight: 16,
    color: "rgba(47, 71, 190, 0.672)",
  },

  // status: {
  //   color: "rgba(12, 169, 70, 0.9)",
  // },

  title: {
    fontSize: 15,
    fontWeight: "500",
    borderRadius: 5,
    lineHeight: 17,
    color: "#222",
    marginTop: 10,
  },

  price: {
    fontSize: 15,
    fontWeight: "400",
  },

  totalPrice: {
    fontSize: 14,
    fontWeight: "500",
    // marginTop: 15,
    color: "rgba(12, 169, 70, 0.9)",
  },

  mainData: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
  },

  noneData: {
    paddingTop: 250,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "#222",
    height: "100%",
  },

  flatList: { width: "100%", paddingTop: 2 },

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

  sendBtn: {
    backgroundColor: "#fff",
    color: "#fff",
    minWidth: "95%",
    paddingTop: 10,
    borderRadius: 10,
    fontWeight: 600,
    backgroundColor: "rgba(12, 169, 70, 0.9)",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    marginTop: 20,
    alignSelf: "center",
  },
});
