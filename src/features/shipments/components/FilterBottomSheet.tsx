import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { AppText } from '@/components/atom';
import { Colors } from '@/theme';
import { moderateScale } from '@/utils/dimensions';

const shipmentStatuses = [
    'Received',
    'Delivered',
    'Canceled',
    'Rejected',
    'Lost',
    'On Hold',
];

interface FilterBottomSheetProps {
    onFiltersChange?: (selectedFilters: string[]) => void;
}

export interface BottomSheetHandles {
    expand: () => void;
}

const FilterBottomSheet = forwardRef<BottomSheetHandles, FilterBottomSheetProps>(({ onFiltersChange }, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

    useImperativeHandle(ref, () => ({
        expand: () => bottomSheetRef.current?.expand(),
    }));

    const toggleStatus = (status: string) => {
        setSelectedStatuses(prev =>
            prev.includes(status)
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    };

    const handleDone = () => {
        onFiltersChange?.(selectedStatuses);
        bottomSheetRef.current?.close();
    };

    const handleCancel = () => {
        setSelectedStatuses([]);
        bottomSheetRef.current?.close();
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[316]}
            enablePanDownToClose
            index={-1}
        >
            <BottomSheetView style={styles.contentContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleCancel}>
                        <AppText type='bodyLarge' color="blue500">Cancel</AppText>
                    </TouchableOpacity>
                    <AppText type="heading3" color='black'>Filters</AppText>
                    <TouchableOpacity onPress={handleDone}>
                        <AppText type='bodyLarge' color="blue500">Done</AppText>
                    </TouchableOpacity>
                </View>

                {/* Filter Section */}
                <View style={styles.section}>
                    <AppText type="subtitle" style={styles.sectionTitle}>
                        SHIPMENT STATUS
                    </AppText>
                    <View style={styles.statusGrid}>
                        {shipmentStatuses.map((status) => {
                            const isSelected = selectedStatuses.includes(status);
                            return (
                                <TouchableOpacity
                                    key={status}
                                    style={[
                                        styles.statusButton,
                                        isSelected && styles.selectedButton
                                    ]}
                                    onPress={() => toggleStatus(status)}
                                >
                                    <AppText
                                        type='bodyLarge'
                                        color={isSelected ? "blue500" : "neutral900"}
                                    >
                                        {status}
                                    </AppText>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheet>
    );
});

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.neutral200,
    },
    section: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: moderateScale(13),
        lineHeight: moderateScale(20),
        marginBottom: 16,
    },
    statusGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    statusButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: Colors.neutral100,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    selectedButton: {
        borderColor: Colors.blue500,
    }
});

export default FilterBottomSheet;