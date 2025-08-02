import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppButton, AppText } from '@/components/atom'
import Ionicons from '@expo/vector-icons/Ionicons'
import AddScanIcon from '@/components/atom/Icons/WhatsAppIcon'
import { Colors } from '@/theme'

export default function ShipmentButtons({onFilterPress, onScanPress}: { onFilterPress: () => void; onScanPress: () => void }) {
    return (
        <View style={styles.container}>
            <AppButton buttonColor='neutral200' onPress={onFilterPress} style={styles.filterButton}>
                <View style={styles.buttonContent}>
                    <Ionicons name="filter" size={24} color={Colors.neutral900} />
                    <AppText type='bodyLarge' color='neutral900' style={styles.buttonText}>Filters</AppText>
                </View>
            </AppButton>

            <AppButton onPress={onScanPress} style={styles.scanButton}>
                <View style={styles.buttonContent}>
                    <Image
                        style={styles.image}
                        source={require('../../../../assets/images/scan.png')}
                        resizeMode='contain'
                    />
                    <AppText type='bodyLarge' 
                    color='white' 
                    style={styles.buttonText}>Add Scan</AppText>
                </View>
            </AppButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        columnGap: 14,
    },
    filterButton: {
        borderRadius: 10,
        width: '48%',
    },
    scanButton: {
        borderRadius: 10,
        width: '48%',
    },
    buttonContent: {
        flexDirection: 'row',
        columnGap: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        width: 24,
        height: 24,
    },
    buttonText: {},
})