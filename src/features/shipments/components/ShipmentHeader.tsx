import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/theme'
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ShipmentHeader() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    style={styles.profileImage}
                    source={require('../../../../assets/images/person.png')}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.brandContainer}>
                <Image
                    style={styles.brandImage}
                    source={require('../../../../assets/images/brand-blue.png')}
                    resizeMode='contain'
                />
            </View>
            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.notificationContainer}>
                <Feather name="bell" size={24} color={Colors.blue500} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 12,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileContainer: {
        width: 40,
        height: 40,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    brandContainer: {
        height: 16,
        width: 92,
    },
    brandImage: {
        width: '100%',
        height: '100%',
    },
    notificationContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.neutral200,
        alignItems: 'center',
        justifyContent: 'center',
    },
})