import { StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import { AppText } from '@/components/atom'
import { SearchTextInput } from '@/components/molecule'
import ShiptmentButtons from '@/features/shipments/components/ShiptmentButtons'
import FilterBottomSheet, { BottomSheetHandles } from '@/features/shipments/components/FilterBottomSheet'
import { Spacing } from '@/theme'
import ShipmentListItem from '@/features/shipments/components/ShipmentListItem'
import ShipmentList from '@/features/shipments/components/ShipmentList'

export default function ScanScreen() {
  const bottomSheetRef = useRef<BottomSheetHandles>(null);

  const handleFilterPress = () => {
    bottomSheetRef.current?.expand()
  }

  return (
    <View style={styles.container}>
      <View >
        <AppText >Hello,</AppText>
        <AppText type='heading2' style={styles.userName}>Ibrahim Shaker</AppText>
      </View>

      <View >
        <SearchTextInput style={styles.searchInput} />
        <ShiptmentButtons onFilterPress={handleFilterPress} onScanPress={() => { }} />
      </View>

      <ShipmentList />

      <FilterBottomSheet ref={bottomSheetRef} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.base,
  },

  userName: {
    fontSize: 28,
  },

  searchInput: {
    marginVertical: Spacing.xl
  },

})