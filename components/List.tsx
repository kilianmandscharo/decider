import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { lightBlack, mediumBlack } from "../functional/Constants";
import { Instance } from "./Instance";
import { InstanceAdder } from "./InstanceAdder";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    list: {
        height: height / 2.3,
        width: width / 1.5,
        backgroundColor: lightBlack,
        paddingLeft: width / 20,
        paddingRight: width / 20,
        paddingTop: width / 20,
        borderRadius: width / 20,
    },
    addingContainer: {
        position: "absolute",
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },
});

interface ListProps {
    names: string[];
    deleteName: (name: string) => void;
    active: boolean;
    clickHandler: (name: string) => void;
}

const List = ({ names, deleteName, active, clickHandler }: ListProps) => {
    const [input, setInput] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const animationValue = useRef(new Animated.Value(0)).current;
    const rotation = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });
    const backRotation = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["-180deg", "0deg"],
    });
    const frontOpacity = animationValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.1, 0],
    });
    const backOpacity = animationValue.interpolate({
        inputRange: [0, 0.4, 1],
        outputRange: [0, 0.1, 1],
    });

    useEffect(() => {
        if (active) {
            Animated.timing(animationValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                setSubmitted(false);
            });
        } else {
            Animated.timing(animationValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [active]);

    const handleChange = (text: string) => {
        setInput(text);
    };

    const handleClick = (name: string) => {
        clickHandler(name);
        setSubmitted(true);
    };

    return (
        <View style={styles.list}>
            <Animated.View
                style={{
                    transform: [{ rotateY: rotation }],
                    opacity: frontOpacity,
                }}
                pointerEvents={active ? "none" : "box-none"}
            >
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
            </Animated.View>
            <Animated.View
                style={[
                    styles.addingContainer,
                    {
                        opacity: backOpacity,
                        transform: [{ rotateY: backRotation }],
                    },
                ]}
                pointerEvents={active ? "box-none" : "none"}
            >
                <InstanceAdder
                    handleChange={handleChange}
                    handleClick={handleClick}
                    input={input}
                    submitted={submitted}
                />
            </Animated.View>
        </View>
    );
};

export default List;
