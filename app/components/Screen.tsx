import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Platform,
    StatusBar,
} from 'react-native';

type Props = {
    isSafeArea?: boolean;
    children?: React.ReactNode;
}

export const Screen = ({ children, isSafeArea = true }: Props) => {
    return isSafeArea ? (
        <SafeAreaView style={[styles.container, styles.androidPadding]}>
            {children}
        </SafeAreaView>
    ) : (
        <View style={[styles.container, styles.androidPadding]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    androidPadding: {
        ...Platform.select({
            android: {
                paddingTop: (StatusBar.currentHeight || 0) + 10, // Add 10px extra padding
            },
        }),
    },
});