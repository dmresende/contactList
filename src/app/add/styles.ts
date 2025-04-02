import { colors } from "@/styles/Colors";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 62,
  },
  avatarContainer: {
   alignItems: "center", 
  },
  avatar:{
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 24,
  },
  contentBody: {
    flex: 1,
    backgroundColor: colors.gray[900],
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  title: {
    color: colors.gray[200],
    fontSize: 24,
    fontWeight: "600",
  },
  label: {
    color: colors.gray[400],
    fontSize: 14,
    paddingHorizontal: 24,
  },
  form: {
    padding: 24,
    gap: 16,
  },
});
