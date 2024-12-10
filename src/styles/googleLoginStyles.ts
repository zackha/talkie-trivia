import { StyleSheet } from "react-native"
import { colors, responsive } from "./global"

export const googleLoginStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: responsive.scale(10),
    justifyContent: "center",
    alignItems: "center",
    height: responsive.scale(40),
    width: "100%",
    maxWidth: responsive.scale(280),
  },
  buttonText: {
    color: colors.secondary,
    fontFamily: "Arvo-Bold",
    textAlign: "center",
    fontSize: responsive.responsiveFontSize(16),
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: responsive.isLargeScreen() ? "60%" : "90%",
    maxWidth: responsive.scale(400),
    alignSelf: "center",
    paddingVertical: responsive.scale(20),
  },
  errorText: {
    color: "red",
    fontFamily: "Arvo-Regular",
    marginTop: responsive.scale(8),
    textAlign: "center",
    fontSize: responsive.responsiveFontSize(16),
  },
})
