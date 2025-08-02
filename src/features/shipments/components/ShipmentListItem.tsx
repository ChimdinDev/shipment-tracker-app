import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated'
import { AppButton, AppText, AppView } from '@/components/atom'
import { AdvancedCheckbox } from 'react-native-advanced-checkbox'
import { StatusTag } from '@/components/molecule'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors, Spacing } from '@/theme'
import { WhatsAppIcon } from '@/components/atom/Icons'
import { horizontalScale, moderateScale, verticalScale } from '@/utils/dimensions'
import { StatusType } from '@/components/molecule/Tag/StatusTag'

const EXPANDED_HEIGHT = 200;
const ANIMATION_DURATION = 400;

interface ShipmentListItemProps {
  id?: string;
  trackingNumber?: string;
  awb?: string;
  status?: StatusType;
  origin?: {
    city: string;
    address: string;
  };
  destination?: {
    city: string;
    address: string;
  };
  checkAll?: boolean;
  onPress?: () => void;
}

export default function ShipmentListItem({
  id = '1',
  trackingNumber = '41785691423',
  awb = 'AWB',
  status = 'received',
  origin = {
    city: 'Cairo',
    address: 'Dokki, 22 Nile St.'
  },
  destination = {
    city: 'Alexandria',
    address: 'Smoha, 22 max St.'
  },
  checkAll = false,
  onPress
}: ShipmentListItemProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [expanded, setExpanded] = useState(false);

  // Animation values
  const expandProgress = useSharedValue(0);
  const rotationProgress = useSharedValue(0);

  const isAllChecked = checkAll || checked;

  const getBackgrounColor = (status: StatusType): string => {
    switch (status) {
      case 'received':
        return Colors.blue100
      case 'error':
        return Colors.red100
      case 'delivered':
        return Colors.green100
      case 'canceled':
        return Colors.neutral100
      case 'on-hold':
        return Colors.orange100
      default:
        return Colors.neutral200
    }
  }

  const toggleExpanded = () => {
    const newExpandedState = !expanded;

    // Animate expansion
    expandProgress.value = withTiming(newExpandedState ? 1 : 0, {
      duration: ANIMATION_DURATION,
    });

    // Animate button rotation
    rotationProgress.value = withTiming(newExpandedState ? 1 : 0, {
      duration: ANIMATION_DURATION,
    });

    // Update state after animation starts
    runOnJS(setExpanded)(newExpandedState);
  };

  // Animated styles for the expanded content
  const expandedAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      expandProgress.value,
      [0, 1],
      [0, EXPANDED_HEIGHT],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      expandProgress.value,
      [0, 0.3, 1],
      [0, 0, 1],
      Extrapolate.CLAMP
    );

    return {
      height,
      opacity,
      overflow: 'hidden',
    };
  });

  // Animated styles for the expand button rotation
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      rotationProgress.value,
      [0, 1],
      [0, 180],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  // Animated styles for the card border radius
  const cardAnimatedStyle = useAnimatedStyle(() => {
    const borderBottomLeftRadius = interpolate(
      expandProgress.value,
      [0, 1],
      [10, 0],
      Extrapolate.CLAMP
    );

    const borderBottomRightRadius = interpolate(
      expandProgress.value,
      [0, 1],
      [10, 0],
      Extrapolate.CLAMP
    );

    return {
      borderBottomLeftRadius,
      borderBottomRightRadius,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={cardAnimatedStyle}>
        <AppButton
          buttonColor='neutral200'
          style={[
            styles.shipmentCard,
            isAllChecked && styles.shipmentCardSelected,
            expanded && styles.shipmentCardExpanded
          ]}
        >
          <AdvancedCheckbox
            value={isAllChecked}
            onValueChange={(value) => setChecked(value as boolean)}
            checkedColor={getBackgrounColor(status)}
            checkMarkContent={<Feather name="check" size={moderateScale(20)} color={Colors.blue500} />}
            containerStyle={styles.checkboxContainer}
            animationType='fade'
            uncheckedColor={Colors.neutral400}
            size={moderateScale(24)}
          />
          <Image
            style={styles.shipmentImage}
            resizeMode='contain'
            source={require("../../../../assets/images/delivery-box.png")}
          />
          <View>
            <AppText color='neutral800'>{awb}</AppText>
            <AppText color='black' type='subtitle'>{trackingNumber}</AppText>
            <View style={styles.routeRow}>
              <AppText ellipsizeMode='tail' numberOfLines={1} style={styles.label}>{origin.city}</AppText>
              <AntDesign name="arrowright" size={moderateScale(16)} color={Colors.blue500} />
              <AppText ellipsizeMode='tail' numberOfLines={1} style={styles.label}>{destination.city}</AppText>
            </View>
          </View>
          <StatusTag status={status} ischecked={isAllChecked} />
          <TouchableOpacity
            onPress={toggleExpanded}
            style={[styles.expandButton, expanded && styles.expandButtonActive]}
          >
            <Animated.View style={buttonAnimatedStyle}>
              <AntDesign
                name="arrowsalt"
                size={moderateScale(10)}
                color={expanded ? Colors.white : Colors.blue500}
              />
            </Animated.View>
          </TouchableOpacity>
        </AppButton>
      </Animated.View>

      <Animated.View
        style={[
          styles.expandedDetails,
          isAllChecked && styles.expandedDetailsSelected,
          expandedAnimatedStyle
        ]}
      >
        <View style={styles.dashedDivider} />
        <AppView style={styles.routeInfo}>
          <View>
            <AppText type='bodySmall' color='blue500'>Origin</AppText>
            <AppText style={styles.content} type='bodyLarge' color='black'>{origin.city}</AppText>
            <AppText style={styles.content}>{origin.address}</AppText>
          </View>
          <AntDesign name="arrowright" size={moderateScale(24)} color={Colors.blue500} />
          <View>
            <AppText type='bodySmall' color='blue500'>Destination</AppText>
            <AppText style={styles.content} type='bodyLarge' color='black'>{destination.city}</AppText>
            <AppText style={styles.content}>{destination.address}</AppText>
          </View>
        </AppView>

        <AppView style={styles.actionButtons}>
          <AppButton buttonColor='blue300' style={styles.callButton}>
            <FontAwesome name="phone" size={24} color={Colors.white} />
            <AppText color='white'>Call</AppText>
          </AppButton>
          <AppButton buttonColor='green500' style={styles.whatsappButton}>
            <View>
              <WhatsAppIcon />
            </View>
            <AppText color='white'>WhatsApp</AppText>
          </AppButton>
        </AppView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  shipmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 3,
    height: undefined,
    padding: 12,
    borderRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  shipmentCardSelected: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.blue500,
  },
  shipmentCardExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  shipmentImage: {
    width: horizontalScale(40),
    height: verticalScale(40),
  },
  label: {
    maxWidth: horizontalScale(80),
  },
  content: {
    maxWidth: horizontalScale(140),
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: moderateScale(6)
  },
  expandButton: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandButtonActive: {
    borderWidth: 2,
    borderColor: Colors.blue100,
    backgroundColor: Colors.blue300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedDetails: {
    paddingTop: 1,
    height: 200,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.neutral300,
  },
  expandedDetailsSelected: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.blue500,
  },
  routeInfo: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    columnGap: 14,
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  checkboxContainer: {
    borderColor: Colors.blue500,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden'
  },
  dashedDivider: {
    borderWidth: 1,
    borderColor: Colors.white,
    borderStyle: 'dashed'
  },
  callButton: {
    width: "30%",
    flexDirection: 'row',
    columnGap: 8,
    maxHeight: 40
  },
  whatsappButton: {
    width: "40%",
    flexDirection: 'row',
    columnGap: 8,
    maxHeight: 40
  },
})