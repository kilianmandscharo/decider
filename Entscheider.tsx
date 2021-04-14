import React from "react";
import { useState } from "react";
import { Instance } from "./Instance";
import { InstanceAdder } from "./InstanceAdder";
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
            <View style={styles.circle2}></View>
            <View style={styles.circle1}></View>
            <View style={styles.headerSection}>
                {!decisionActive && (
                    <Text style={styles.header}>Entscheider</Text>
                )}
                {decisionActive && <Text style={styles.header}>{winner}</Text>}
            </View>
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
            {inputActive && (
                <View style={styles.instanceAdderSection}>
                    <InstanceAdder
                        handler={handleChange}
                        clicker={clickHandler}
                        input={input}
                    />
                </View>
            )}
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
        </View>
    );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    header: {
        color: "white",
        fontSize: 45,
        fontWeight: "bold",
        textShadowColor: "#BB86FC",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    headerSection: {
        marginBottom: 40,
        alignItems: "center",
    },
    instanceSection: {
        height: height * 0.45,
        width: 260,
        backgroundColor: "#1c1c1c",
        paddingLeft: 20,
        paddingRight: 15,
        paddingTop: 10,
        borderRadius: 15,
    },
    instanceAdderSection: {
        height: height * 0.45,
        width: 260,
        position: "absolute",
        top: 100,
        backgroundColor: "#262626",
        borderRadius: 15,
    },
    buttonSection: {
        height: height * 0.2,
        marginTop: 55,
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
        borderRadius: 500,
        backgroundColor: "#121212",
        borderWidth: 2,
        borderColor: "#03DAC5",
        top: 90,
        left: -25,
    },
    circle2: {
        position: "absolute",
        width: 350,
        height: 350,
        borderRadius: 500,
        backgroundColor: "#121212",
        borderWidth: 2,
        borderColor: "#03DAC5",
        top: 70,
        left: -45,
    },
});
