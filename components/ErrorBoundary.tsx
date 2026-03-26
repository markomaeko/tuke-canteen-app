import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (__DEV__) console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Niečo sa pokazilo</Text>
          <Text style={styles.message}>
            Aplikácia narazila na neočakávanú chybu.
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => this.setState({ hasError: false })}
          >
            <Text style={styles.buttonText}>Skúsiť znova</Text>
          </Pressable>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#fff",
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8, color: "#1A1A1A" },
  message: { fontSize: 15, color: "#666", textAlign: "center", marginBottom: 24 },
  button: {
    backgroundColor: "#1B3A5C",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
});
