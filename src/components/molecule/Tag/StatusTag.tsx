import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AppText, AppView } from '@/components/atom'
import { Colors, ColorKey } from '@/theme'

export type StatusType = 'received' | 'error' | 'delivered' | 'canceled' | 'on-hold'

interface StatusTagProps {
  status: StatusType,
  ischecked?: boolean
}

const getStatusConfig = (status: StatusType): { label: string; color: ColorKey; backgroundColor: ColorKey } => {
  switch (status) {
    case 'received':
      return { label: 'RECEIVED', color: 'blue500', backgroundColor: 'blue100' }
    case 'error':
      return { label: 'ERROR', color: 'red700', backgroundColor: 'red100' }
    case 'delivered':
      return { label: 'DELIVERED', color: 'green700', backgroundColor: 'green100' }
    case 'canceled':
      return { label: 'CANCELED', color: 'neutral900', backgroundColor: 'neutral100' }
    case 'on-hold':
      return { label: 'ON HOLD', color: 'orange500', backgroundColor: 'orange100' }
    default:
      return { label: '', color: 'neutral800', backgroundColor: 'neutral200' }
  }
}

export default function StatusTag({ status, ischecked }: StatusTagProps) {
  const { label, color, backgroundColor } = getStatusConfig(status)

  return (
    <AppView backgroundColor={ischecked ? backgroundColor : 'transparent'} style={[styles.container]}>
      <AppText
        type="label"
        color={color}
        style={[styles.text]}
      >
        {label}
      </AppText>
    </AppView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.white,
    maxWidth: 84

  },
  text: {
    textTransform: 'uppercase',
    textAlign: 'center'
  }
})