import React from "react";
import { useState } from "react";
import { Wheel } from "./Wheel";
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Animated,
} from "react-native";
import Circles from "./Circles";
import List from "./List";
import { useRef } from "react";
import StandardButton from "./Button";
import { height, purple, width } from "../functional/Constants";
import { ListIcon, WheelIcon } from "./Icons";

export const Entscheider = () => {
    const [names, setNames] = useState<string[]>([]);
    const [inputActive, setInputActive] = useState(false);
    const [decisionActive, setDecisionActive] = useState(false);
    const [winner, setWinner] = useState("");
    const [state, setState] = useState("table");
    // const [reanimate, setRenimate] = useState(false);

    const animationValue = useRef(new Animated.Value(0)).current;
    const rotation = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });
    const frontOpacity = animationValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.9, 0],
    });
    const backRotation = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["-180deg", "0deg"],
    });
    const backOpacity = animationValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.1, 1],
    });
    const bottomOpacity = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });

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

    const onPressWheelButton = () => {
        if (names.length === 0) {
            return;
        }
        setDecisionActive(false);
        // setRenimate(true);
        setState("wheel");
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const onPressListButton = () => {
        if (names.length === 0) {
            return;
        }
        setDecisionActive(false);
        // setRenimate(false);
        setState("list");
        Animated.timing(animationValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const newElement = () => {
        setInputActive(() => {
            return inputActive ? false : true;
        });
        setDecisionActive(false);
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
                    onPress={onPressListButton}
                    activeOpacity={0.6}
                >
                    <ListIcon />
                </TouchableOpacity>
                {!decisionActive && (
                    <Text style={styles.header}>Entscheider</Text>
                )}
                {decisionActive && <Text style={styles.header}>{winner}</Text>}
                <TouchableOpacity
                    onPress={onPressWheelButton}
                    activeOpacity={0.6}
                >
                    <WheelIcon />
                </TouchableOpacity>
            </View>

            {/* ============== Middle Section ============== */}
            <View style={styles.middleSection}>
                <Circles state={state} />
                {state === "wheel" && (
                    <Animated.View
                        style={{
                            position: "absolute",
                            opacity: backOpacity,
                            transform: [{ rotateY: backRotation }],
                            zIndex: state === "wheel" ? 10 : -1,
                            elevation: state === "wheel" ? 10 : 0,
                        }}
                    >
                        <Wheel
                            numberOfSegments={names.length}
                            data={names}
                            updater={updateState}
                        />
                    </Animated.View>
                )}
                <Animated.View
                    style={{
                        opacity: frontOpacity,
                        transform: [{ rotateY: rotation }],
                    }}
                >
                    <List
                        names={names}
                        deleteName={deleteName}
                        active={inputActive}
                        clickHandler={clickHandler}
                    />
                </Animated.View>
            </View>

            {/* ============== Bottom Section ============== */}
            <View style={styles.bottomSection}>
                <Animated.View style={[{ opacity: bottomOpacity }]}>
                    <StandardButton
                        handlePress={decide}
                        text="DECIDE"
                        color={decideColor}
                    />
                    <StandardButton
                        handlePress={clear}
                        text="CLEAR"
                        color={purple}
                    />
                    <StandardButton
                        handlePress={newElement}
                        text="NEW ELEMENT"
                        color={purple}
                    />
                </Animated.View>
                <Animated.View
                    style={{
                        opacity: animationValue,
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        flex: 1,
                        justifyContent: "space-around",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View style={styles.pin2}></View>
                    <Text style={styles.spinText}>Spin it!</Text>
                    <View style={styles.pin1}></View>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    //============== Header Section ==============//
    headerSection: {
        flex: 2,
        alignItems: "center",
        flexDirection: "row",
    },
    header: {
        color: "white",
        fontSize: width / 10,
        fontFamily: "Orbitron-Regular",
        width: width / 1.4,
        textShadowColor: purple,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textAlign: "center",
    },
    wheelButton: {
        borderRadius: 100,
        height: height / 20,
        width: height / 20,
        backgroundColor: purple,
    },
    tableButton: {
        borderRadius: 5,
        height: height / 20,
        width: height / 20,
        backgroundColor: purple,
    },

    //============== Middle Section ==============//
    middleSection: {
        flex: 6,
        justifyContent: "center",
        alignItems: "center",
    },

    //============== Bottom Section ==============//
    bottomSection: {
        flex: 3,
        justifyContent: "center",
        width: width / 1.3,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: width / 20,
        fontFamily: "Orbitron-Regular",
    },
    wheelTextSection: {
        height: height / 4.5,
        marginTop: height / 12,
        width: width / 1.5,
    },
    spinText: {
        color: "white",
        textAlign: "center",
        fontSize: width / 10,
        fontFamily: "Orbitron-Regular",
        textShadowColor: purple,
        textShadowRadius: 1,
        textShadowOffset: { width: 2, height: 2 },
    },
    pin1: {
        width: 0,
        height: 0,
        borderBottomWidth: width / 30,
        borderBottomColor: "transparent",
        borderRightWidth: width / 10,
        borderRightColor: purple,
        borderTopWidth: width / 30,
        borderTopColor: "transparent",
    },
    pin2: {
        width: 0,
        height: 0,
        borderLeftWidth: width / 10,
        borderLeftColor: purple,
        borderBottomWidth: width / 30,
        borderBottomColor: "transparent",
        borderTopWidth: width / 30,
        borderTopColor: "transparent",
    },
});
