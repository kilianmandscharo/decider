import React from "react";
import { useState } from "react";
import { Instance } from "./Instance";
import { InstanceAdder } from "./InstanceAdder";
import { Wheel } from "./Wheel";
import {
    StyleSheet,
    View,
    Button,
    Text,
    TouchableHighlight,
    ScrollView,
    Dimensions,
} from "react-native";

export const Entscheider = () => {
    const [names, setNames] = useState<string[]>([]);
    const [inputActive, setInputActive] = useState(false);
    const [decisionActive, setDecisionActive] = useState(false);
    const [winner, setWinner] = useState("");
    const [input, setInput] = useState("");
    const [state, setState] = useState("table");

    //console.log("deciderWinner: ", winner);

    const clickHandler = (name: string) => {
        if (name === "") {
            return;
        } else {
            setNames([...names, name]);
            setDecisionActive(false);
            setInputActive(false);
            setInput("");
        }
    };

    const updateState = (value: string) => {
        setWinner(value);
        setDecisionActive(true);
    };

    const handleChange = (text: string) => {
        setInput(text);
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
        <View>
            <TouchableHighlight style={styles.wheelButton}>
                <Button
                    title=""
                    color="#BB86FC"
                    onPress={() => {
                        if (names.length === 0) {
                            return;
                        }
                        setDecisionActive(false);
                        setState("wheel");
                    }}
                />
            </TouchableHighlight>
            <TouchableHighlight style={styles.tableButton}>
                <Button
                    title=""
                    color="#BB86FC"
                    onPress={() => {
                        if (names.length === 0) {
                            return;
                        }
                        setDecisionActive(false);
                        setState("table");
                    }}
                />
            </TouchableHighlight>
            <View style={styles.circle2}></View>
            <View style={styles.circle1}></View>
            <View style={styles.headerSection}>
                {!decisionActive && (
                    <Text style={styles.header}>Entscheider</Text>
                )}
                {decisionActive && <Text style={styles.header}>{winner}</Text>}
            </View>
            {state === "table" && (
                <View style={styles.instanceSection}>
                    <ScrollView>
                        {names.map((name, index) => {
                            return (
                                <Instance
                                    deleteName={() => deleteName(name)}
                                    key={index}
                                    name={name}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            )}
            {state === "wheel" && (
                <Wheel
                    numberOfSegments={names.length}
                    data={names}
                    updater={updateState}
                />
            )}
            {inputActive && (
                <View style={styles.instanceAdderSection}>
                    <InstanceAdder
                        handler={handleChange}
                        clicker={clickHandler}
                        input={input}
                    />
                </View>
            )}
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
                        <Button color="#1c1c1c" onPress={clear} title="Clear" />
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
    );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    header: {
        color: "white",
        fontSize: 35,
        fontWeight: "bold",
        textShadowColor: "#BB86FC",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        fontFamily: "monospace",
    },
    headerSection: {
        marginTop: 10,
        marginBottom: 50,
        alignItems: "center",
    },
    instanceSection: {
        height: 290,
        width: 260,
        backgroundColor: "#1c1c1c",
        paddingLeft: 20,
        paddingRight: 15,
        paddingTop: 10,
        borderRadius: 15,
    },
    instanceAdderSection: {
        height: 290,
        width: 260,
        position: "absolute",
        top: 106.5,
        backgroundColor: "#262626",
        borderRadius: 15,
    },
    buttonSection: {
        height: 140,
        marginTop: 45,
    },
    button: {
        marginBottom: 15,
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#BB86FC",
    },
    circle1: {
        position: "absolute",
        width: 310,
        height: 310,
        borderRadius: 155,
        backgroundColor: "#121212",
        borderWidth: 2,
        borderColor: "#03DAC5",
        top: 97,
        left: -25,
    },
    circle2: {
        position: "absolute",
        width: 350,
        height: 350,
        borderRadius: 175,
        backgroundColor: "#121212",
        borderWidth: 2,
        borderColor: "#03DAC5",
        top: 77,
        left: -45,
    },
    wheelButton: {
        borderRadius: 100,
        position: "absolute",
        height: 35,
        width: 35,
        top: 18,
        left: -30,
        overflow: "hidden",
    },
    tableButton: {
        borderRadius: 5,
        position: "absolute",
        height: 35,
        width: 35,
        top: 18,
        left: 257,
        overflow: "hidden",
    },
    spinText: {
        color: "white",
        textAlign: "center",
        fontSize: 50,
        paddingTop: 20,
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
        borderBottomWidth: 15,
        borderBottomColor: "transparent",
        borderRightWidth: 40,
        borderRightColor: "#BB86FC",
        borderTopWidth: 15,
        borderTopColor: "transparent",
        bottom: 70,
        right: 0,
    },
    pin2: {
        position: "absolute",
        width: 0,
        height: 0,
        borderLeftWidth: 40,
        borderLeftColor: "#BB86FC",
        borderBottomWidth: 15,
        borderBottomColor: "transparent",
        borderTopWidth: 15,
        borderTopColor: "transparent",
        bottom: 70,
    },
});
