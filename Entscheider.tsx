import React from "react";
import { useState } from "react";
import { Wheel } from "./Wheel";
import {
    StyleSheet,
    View,
    Button,
    Text,
    TouchableHighlight,
    Dimensions,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import Circles from "./Circles";
import List from "./List";

export const Entscheider = () => {
    const [names, setNames] = useState<string[]>([]);
    const [inputActive, setInputActive] = useState(false);
    const [decisionActive, setDecisionActive] = useState(false);
    const [winner, setWinner] = useState("");
    const [state, setState] = useState("table");

    const clickHandler = (name: string) => {
        if (name === "") {
            return;
        } else {
            setNames([...names, name]);
            setDecisionActive(false);
            setInputActive(false);
        }
    };

    const updateState = (value: string) => {
        setWinner(value);
        setDecisionActive(true);
    };

    const decide = () => {
        if (names.length < 1) {
            return;
        } else {
            setDecisionActive(true);
            let randomNumber = Math.floor(Math.random() * names.length);
            setWinner(names[randomNumber]);
            setInputActive(false);
        }
    };

    const clear = () => {
        setNames([]);
        setInputActive(false);
        setDecisionActive(false);
        setWinner("");
    };

    const deleteName = (name: string) => {
        const i = names.indexOf(name);
        let tempArr = names
            .slice(0, i)
            .concat(names.slice(i + 1, names.length));
        setNames(tempArr);
    };

    const decideColor = names.length > 0 ? "#BB86FC" : "#1c1c1c";

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <StatusBar backgroundColor="#434343" />

            {/* ============== Header Section ============== */}
            <View style={styles.headerSection}>
                <TouchableOpacity
                    style={styles.tableButton}
                    onPress={() => {
                        if (names.length === 0) {
                            return;
                        }
                        setDecisionActive(false);
                        setState("table");
                    }}
                    activeOpacity={0.6}
                />
                {!decisionActive && (
                    <Text style={styles.header}>Entscheider</Text>
                )}
                {decisionActive && <Text style={styles.header}>{winner}</Text>}
                <TouchableOpacity
                    style={styles.wheelButton}
                    onPress={() => {
                        if (names.length === 0) {
                            return;
                        }
                        setDecisionActive(false);
                        setState("wheel");
                    }}
                    activeOpacity={0.6}
                />
            </View>

            {/* ============== Middle Section ============== */}
            <View style={styles.middleSection}>
                <Circles />
                {state === "table" && (
                    <List
                        names={names}
                        deleteName={deleteName}
                        active={inputActive}
                        clickHandler={clickHandler}
                    />
                )}
                {state === "wheel" && (
                    <Wheel
                        numberOfSegments={names.length}
                        data={names}
                        updater={updateState}
                    />
                )}
            </View>

            {/* ============== Bottom Section ============== */}
            <View style={styles.bottomSection}>
                {state === "table" && (
                    <View style={styles.buttonSection}>
                        <TouchableHighlight style={styles.button}>
                            <Button
                                color={decideColor}
                                onPress={decide}
                                title="Decide"
                            />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button}>
                            <Button
                                color="#1c1c1c"
                                onPress={clear}
                                title="Clear"
                            />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button}>
                            <Button
                                onPress={() => {
                                    setInputActive(() => {
                                        return inputActive ? false : true;
                                    });
                                    setDecisionActive(false);
                                }}
                                title="New Element"
                                color="#1c1c1c"
                            />
                        </TouchableHighlight>
                    </View>
                )}
                {state === "wheel" && (
                    <View style={styles.buttonSection}>
                        <View style={styles.pin1}></View>
                        <View style={styles.pin2}></View>
                        <Text style={styles.spinText}>Spin it!</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    headerSection: {
        flex: 2,
        alignItems: "center",
        flexDirection: "row",
    },
    header: {
        color: "white",
        fontSize: width / 10,
        width: width / 1.4,
        fontWeight: "bold",
        textShadowColor: "#BB86FC",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        fontFamily: "Cabin-Regular",
        textAlign: "center",
    },
    wheelButton: {
        borderRadius: 100,
        height: height / 20,
        width: height / 20,
        backgroundColor: "#BB86FC",
    },
    tableButton: {
        borderRadius: 5,
        height: height / 20,
        width: height / 20,
        backgroundColor: "#BB86FC",
    },
    middleSection: {
        flex: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    instanceAdderSection: {
        height: height / 2.3,
        width: width / 1.5,
        position: "absolute",
        top: height / 5.19,
        backgroundColor: "#262626",
        borderRadius: width / 20,
    },
    bottomSection: {
        flex: 4,
        justifyContent: "center",
    },
    buttonSection: {
        height: height / 4.5,
        marginTop: height / 12,
        width: width / 1.5,
    },
    button: {
        marginBottom: height / 40,
        borderRadius: width / 30,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#BB86FC",
    },
    spinText: {
        color: "white",
        textAlign: "center",
        fontSize: width / 10,
        paddingTop: height / 16,
        fontFamily: "sans-serif",
        fontWeight: "bold",
        textShadowColor: "#BB86FC",
        textShadowRadius: 1,
        textShadowOffset: { width: 2, height: 2 },
    },
    pin1: {
        position: "absolute",
        width: 0,
        height: 0,
        borderBottomWidth: width / 30,
        borderBottomColor: "transparent",
        borderRightWidth: width / 10,
        borderRightColor: "#BB86FC",
        borderTopWidth: width / 30,
        borderTopColor: "transparent",
        bottom: 70,
        right: 0,
    },
    pin2: {
        position: "absolute",
        width: 0,
        height: 0,
        borderLeftWidth: width / 10,
        borderLeftColor: "#BB86FC",
        borderBottomWidth: width / 30,
        borderBottomColor: "transparent",
        borderTopWidth: width / 30,
        borderTopColor: "transparent",
        bottom: 70,
    },
});
