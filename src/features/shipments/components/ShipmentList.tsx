import { FlatList, StyleSheet, View, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { AppText, AppView, AppButton } from '@/components/atom'
import { moderateScale, horizontalScale, verticalScale } from '@/utils/dimensions'
import { AdvancedCheckbox } from 'react-native-advanced-checkbox'
import { Colors, Spacing } from '@/theme'
import { Feather } from '@expo/vector-icons'
import ShipmentListItem from './ShipmentListItem'
import { shipmentList } from '@/data/shipmentList'

// Empty State Component
const EmptyShipmentList = () => {
    return (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyContent}>
                {/* Empty State Icon/Illustration */}
                <View style={styles.emptyIconContainer}>
                    <Feather
                        name="package"
                        size={moderateScale(64)}
                        color={Colors.neutral400}
                    />
                </View>

                {/* Empty State Text */}
                <AppText
                    type='heading3'
                    color='neutral800'
                    style={styles.emptyTitle}
                >
                    No Shipments Found
                </AppText>

                <AppText
                    type='bodyRegular'
                    color='blue500'
                    style={styles.emptyDescription}
                >
                    You don't have any shipments yet. Create your first shipment to get started with tracking and management.
                </AppText>

                {/* Optional Action Button */}
                <AppButton
                    buttonColor='blue500'
                    style={styles.emptyActionButton}
                    onPress={() => {
                        // Handle create shipment action
                        console.log('Create new shipment');
                    }}
                >
                    <Feather name="plus" size={moderateScale(20)} color={Colors.white} />
                    <AppText color='white' type='heading2'>Create Shipment</AppText>
                </AppButton>
            </View>
        </View>
    );
};

export default function ShipmentList() {
    const [checked, setChecked] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState(false);
    const [shipments, setShipments] = useState(shipmentList);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // Simulate data fetching
        setTimeout(() => {
            setShipments(shipmentList);
            setRefreshing(false);
        }, 1000);
    }, []);

    // You can modify this condition based on your data loading state
    const isEmpty = !shipments || shipments.length === 0;

    return (
        <View style={{ flex: 1, paddingTop: 36 }}>
            <AppView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <AppText type='heading2' color='black'>Shipments</AppText>
                {!isEmpty && (
                    <AdvancedCheckbox
                        value={checked}
                        onValueChange={(value) => setChecked(value as boolean)}
                        label='Mark All'
                        labelStyle={{ color: Colors.blue500 }}
                        checkedColor={Colors.blue100}
                        checkMarkContent={<Feather name="check" size={moderateScale(20)} color={Colors.blue500} />}
                        animationType='bounce'
                        uncheckedColor={Colors.neutral400}
                        size={moderateScale(24)}
                    />
                )}
            </AppView>

            <FlatList
                data={shipments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ShipmentListItem checkAll={checked} {...item} />
                )}
                ListEmptyComponent={EmptyShipmentList}
                scrollEventThrottle={16}
                ItemSeparatorComponent={() => <View style={{ height: moderateScale(8) }} />}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingVertical: isEmpty ? 0 : moderateScale(20)
                }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={Colors.blue500}
                        colors={[Colors.blue500]}
                        progressBackgroundColor={Colors.white}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.xl,
    },
    emptyContent: {
        alignItems: 'center',
        maxWidth: horizontalScale(300),
    },
    emptyIconContainer: {
        width: horizontalScale(120),
        height: verticalScale(120),
        borderRadius: moderateScale(60),
        backgroundColor: Colors.neutral100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    emptyTitle: {
        textAlign: 'center',
        marginBottom: Spacing.md,
    },
    emptyDescription: {
        textAlign: 'center',
        lineHeight: moderateScale(22),
        marginBottom: Spacing.xl,
    },
    emptyActionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: Spacing.sm,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        minWidth: horizontalScale(160),
    },
})