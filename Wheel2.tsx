import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { withAnchorPoint } from "react-native-anchor-point";

interface Props {
    height: number;
    names: string[];
}

export const Wheel = (props: Props) => {
    const sectionDegree = 360 / props.names.length;
    const degreeArray = props.names.map((name, index) => index * sectionDegree);
    const getTransform = () => {
        let transform = {
            transform: [{ perspective: 400 }, { rotateX: "0deg" }],
        };
        return withAnchorPoint(
            transform,
            { x: 0, y: 1 },
            { width: 250, height: 250 }
        );
    };

    return (
        <View style={styles.circle}>
            <View
                style={{
                    //overflow: "hidden",
                    top: 0,
                    right: 0,
                    width: "50%",
                    height: "50%",
                }}
            >
                {props.names.map((name, index) => (
                    <Text
                        key={index}
                        style={{
                            position: "absolute",
                            transform: [
                                { rotate: `${degreeArray[index]}deg` },
                                { skewY: "-60deg" },
                            ],
                            borderColor: "white",
                            borderWidth: 1,
                            color: "white",
                            left: "-100%",
                            width: "200%",
                            height: "200%",
                            textAlign: "center",
                        }}
                    >
                        {name}
                    </Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 250,
        width: 250,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        //overflow: "hidden",
        borderColor: "white",
        borderWidth: 1,
        position: "relative",
        padding: 0,
    },
});
