import { colors } from "@/styles/Colors";
import { StyleSheet, ViewStyle } from "react-native";


export const styles = StyleSheet.create({
  container: {
    height: 52,
    width: "100%",
    color: colors.green[300],
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightOlli["indigo-600"],
  },
  title: {
    color: colors.lightOlli["neutral-primary"],
    fontSize: 16,
    fontWeight: "600",
  },
})

