//// checkcheck
// import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { useDispatch } from "react-redux";
// import { getProductEveryInvoice } from "../../store/reducers/requestSlice";

// export const EveryInvoiceTT = ({ obj, navigation }) => {
//   //// каждая загрузка(накладная) типо истории
//   const dispatch = useDispatch();

//   const lookInvoice = () => {
//     dispatch(getProductEveryInvoice(obj.guid));
//     navigation.navigate("everyInvoiceHistoryScreen", {
//       obj,
//       title: `Накладная №${obj.codeid}`,
//     });
//     // Alert.alert(obj.codeid?.toString())
//     // console.log(navigation,"navigation");
//   };

//   // console.log(obj, "asdasd");
//   //   console.log(listInvoiceEveryTA, "listInvoiceEveryTA");
//   //   console.log(listProductEveryInvoiceTA, "listProductEveryInvoiceTA");

//   const status = {
//     0: "Касса открыта",
//     1: "Касса закрыта",
//   };

//   return (
//     <>
//       <TouchableOpacity style={styles.container} onPress={lookInvoice}>
//         <View style={styles.innerBlock}>
//           {/* <Text
//             style={[
//               styles.titleDate,
//               { color: obj?.status === 0 ? "green" : "red" },
//             ]}
//           >
//             {status?.[obj?.status]}
//           </Text> */}
//           <View style={styles.mainData}>
//             <Text style={styles.titleNum}>{obj.codeid} </Text>
//             <View>
//               {/* <Text style={[styles.titleDate, styles.role]}>
//                 {obj?.seller} {obj?.point ? `(${obj.point})` : ""}
//               </Text> */}
//               <Text
//                 style={[
//                   styles.titleDate,
//                   { color: obj?.status === 0 ? "green" : "red" },
//                 ]}
//               >
//                 {status?.[obj?.status]}
//               </Text>
//               <Text style={styles.titleDate}>{obj?.date_system}</Text>
//             </View>
//           </View>
//           {obj.comment?.length !== 0 && (
//             <Text
//               style={styles.comments}
//               numberOfLines={4}
//               ellipsizeMode="tail"
//             >
//               {obj.comment}
//             </Text>
//           )}
//         </View>
//         <View style={styles.mainDataArrow}>
//           <View>
//             <Text style={styles.status}>Выручка</Text>
//             <Text style={styles.totalPrice}>{obj?.total_price} сомони</Text>
//           </View>
//           <View style={styles.arrow}></View>
//         </View>
//       </TouchableOpacity>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "rgba(162, 178, 238, 0.102)",
//     minWidth: "100%",
//     padding: 8,
//     paddingTop: 15,
//     paddingBottom: 15,
//     borderBottomWidth: 1,
//     borderColor: "rgba(47, 71, 190, 0.287)",
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   innerBlock: {
//     display: "flex",
//     width: "60%",
//     gap: 5,
//   },

//   titleNum: {
//     fontSize: 19,
//     fontWeight: "700",
//     color: "rgba(47, 71, 190, 0.672)",
//     borderColor: "rgba(47, 71, 190, 0.672)",
//     borderWidth: 1,
//     backgroundColor: "#d4dfee",
//     padding: 3,
//     paddingLeft: 7,
//     paddingRight: 0,
//     borderRadius: 5,
//   },

//   titleDate: {
//     fontSize: 14,
//     fontWeight: "500",
//     // color: "#2fce8e53",
//     // backgroundColor: "rgba(12, 169, 70, 0.1)",
//     borderRadius: 5,
//     // padding: 5,
//     lineHeight: 17,
//   },

//   status: {
//     color: "rgba(12, 169, 70, 0.9)",
//   },

//   role: {
//     fontSize: 14,
//     fontWeight: "500",
//     borderRadius: 5,
//     lineHeight: 17,
//     color: "rgba(47, 71, 190, 0.672)",
//     width: "85%",
//     // backgroundColor: "red",
//     overflow: "hidden",
//     height: 18,
//   },

//   totalPrice: {
//     fontSize: 16,
//     fontWeight: "400",
//   },

//   comments: {
//     maxWidth: 230,
//     fontSize: 12,
//   },

//   mainData: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },

//   mainDataArrow: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingRight: 15,
//     width: "35%",
//   },

//   arrow: {
//     borderTopWidth: 3,
//     borderRightWidth: 3,
//     borderColor: "rgba(162, 178, 238, 0.439)",
//     height: 16,
//     width: 16,
//     borderRadius: 3,
//     transform: [{ rotate: "45deg" }],
//   },
// });
