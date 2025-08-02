import { View, ViewProps, StyleSheet } from 'react-native'
import React from 'react'
import { ColorKey, Colors } from '@/theme';


type AppViewProps = ViewProps & {
    backgroundColor?: ColorKey;
}

const AppView = ({ style, backgroundColor="transparent", ...rest }: AppViewProps) => {
    const color = Colors[backgroundColor]

    return (
        <View
            style={[
                { backgroundColor: color, width: '100%' },
                style]}
            {...rest}
        />
    )
}

export default AppView