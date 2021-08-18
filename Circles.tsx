import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Animated, Dimensions, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const strokeWidth = width / 150;

const radiusC1 = Math.round(width / 2.1);
const halfcircleC1 = radiusC1 + strokeWidth;
const circumferenceC1 = 2 * Math.PI * radiusC1;

const radiusC2 = Math.round(width / 2.4);
const circumferenceC2 = 2 * Math.PI * radiusC1;

const Circles = () => {
    const fillValueC1 = useRef(new Animated.Value(circumferenceC1)).current;
    const fillValueC2 = useRef(new Animated.Value(circumferenceC1)).current;

    useEffect(() => {
        Animated.timing(fillValueC1, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        Animated.timing(fillValueC2, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={{ position: "absolute", top: 0 }}>
            <Svg
                style={{
                    height: radiusC1 * 2,
                    width: radiusC1 * 2,
                }}
                viewBox={`0 0 ${halfcircleC1 * 2} ${halfcircleC1 * 2}`}
            >
                <AnimatedCircle
                    cx="50%"
                    cy="50%"
                    stroke="#03DAC5"
                    strokeWidth={strokeWidth}
                    r={radiusC1}
                    fill="transparent"
                    strokeDasharray={circumferenceC1}
                    strokeDashoffset={fillValueC1}
                    strokeLinecap="round"
                />
                <G rotation="-90" origin={`${halfcircleC1}, ${halfcircleC1}`}>
                    <AnimatedCircle
                        cx="50%"
                        cy="50%"
                        stroke="#03DAC5"
                        strokeWidth={strokeWidth}
                        r={radiusC2}
                        fill="transparent"
                        strokeDasharray={circumferenceC2}
                        strokeDashoffset={fillValueC2}
                        strokeLinecap="round"
                    />
                </G>
            </Svg>
        </View>
    );
};

export default Circles;
