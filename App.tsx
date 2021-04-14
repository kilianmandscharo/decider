import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Entscheider } from "./Entscheider";

export default function App() {
    return (
        <View style={styles.container}>
            <Entscheider />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        alignItems: "center",
        justifyContent: "center",
    },
});
