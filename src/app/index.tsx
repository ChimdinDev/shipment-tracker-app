import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import WalletIcon from '../components/atom/Icons/WalletIcon'
import { AppTextInput } from '@/components/atom'
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';

export default function index() {
  const animation = useRef<LottieView>(null);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: '#fff',
        }}
        loop={false}
        onAnimationFinish={async () => { router.push('/welcome'); }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/splash.json')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});