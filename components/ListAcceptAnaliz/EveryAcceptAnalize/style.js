import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(162, 178, 238, 0.102)",
    minWidth: "100%",
    padding: 8,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.287)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  innerBlock: {
    display: "flex",
    width: "58%",
    gap: 5,
  },

  titleNum: {
    fontSize: 19,
    fontWeight: "700",
    color: "rgba(47, 71, 190, 0.672)",
    borderColor: "rgba(47, 71, 190, 0.672)",
    borderWidth: 1,
    backgroundColor: "#d4dfee",
    padding: 3,
    paddingLeft: 6,
    paddingRight: 4,
    borderRadius: 5,
  },

  titleDate: {
    fontSize: 14,
    fontWeight: "500",
    borderRadius: 5,
    lineHeight: 17,
  },

  role: {
    fontSize: 14,
    fontWeight: "500",
    borderRadius: 5,
    lineHeight: 17,
    color: "rgba(47, 71, 190, 0.672)",
  },

  status: { color: "rgba(12, 169, 70, 0.9)", fontSize: 13, fontWeight: "500" },

  totalPrice: {
    fontSize: 16,
    fontWeight: "400",
  },

  comments: { maxWidth: 230 },

  mainData: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  mainDataArrow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 15,
    width: "33%",
  },
});

export default styles;
