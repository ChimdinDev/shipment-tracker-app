import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { AppButton, AppContainer } from '@/components/atom'
import { Colors } from '@/theme'
import { router } from 'expo-router'

export default function Welcome() {
    return (
        <AppContainer style={styles.container}  >
            <Image
                resizeMode='contain'
                source={require('../../assets/images/brand.png')}
                style={styles.image}
            />
            <AppButton title='Login' 
            onPress={() => router.push('/auth/login')}
            inverted 
            style={{ top: "38%" }} />
        </AppContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blue500,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 207,
        height: 36,
    },
})