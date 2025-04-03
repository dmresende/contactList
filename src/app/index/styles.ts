import { colors } from "@/styles/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  containerHeader: {
    marginBottom: 20,
    backgroundColor: "#1E1E1E",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    paddingTop: 20
  },
  containerHeaderTitle: {
    color: "#FFF",
    margin: 20,
    fontSize: 25
  },
  containerHeaderOptions: {
    display: "flex",
    flexDirection: "row",
    gap: 10
  },
  contactImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50,
  },
  contactItem: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    color: "#FFF",
    fontSize: 16,
  },
  modal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.lightOlli["gray-900"],
    borderTopWidth: 1,
    // paddingBottom: '50%',
    padding: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  modalCategory: {
    flex: 1,
    fontWeight: "500",
    color: colors.gray[100],
    fontSize: 20,
  },
  modalFooter: {
    flexDirection: "row",
    marginTop: 32,
    width: "100%",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.lightOlli["indigo-600"],
    paddingVertical: 14,
  },
  emptyList:{
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFF",
  },
  modalActive:{
    backgroundColor: colors.lightOlli["gray-900"],
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
     borderWidth: 2,
     borderColor: colors.lightOlli["gray-800"],
  },
  active: {
    fontSize: 10,
    color: "#FFF",
  },
  infcads:{
    alignItems: "center",
    marginBottom: 10,
    color: "#FFF",
  },
  modalHeaderOptions:{
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    
  }
});
