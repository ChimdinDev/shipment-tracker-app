import { Platform, StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { AppBackButton, AppButton, AppContainer, AppText, AppTextInput } from '@/components/atom'
import { Spacing } from '@/theme'
import { object, string } from 'yup'
import { useForm, Controller, Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { router } from 'expo-router'

let userSchema = object({
  email: string().min(3, 'must be at least 3 characters long')
    .email('Must be a valid email').required('Email is required'),
  url: string().url('Must be a valid URL').optional(),
  password: string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

interface FormData {
  url: string;
  email: string;
  password: string;
}

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid }
  } = useForm<FormData>({
    resolver: yupResolver(userSchema),
    mode: 'onBlur', // Validate on blur
    reValidateMode: 'onChange',
    defaultValues: {
      url: '',
      email: '',
      password: '',
    }
  })

  const onSubmit = async (data: FormData) => {
    try {
      // Handle login logic here
      console.log('Login data:', data)
      Alert.alert('Success', 'Login form submitted successfully!')
      router.replace('/(tabs)')

      // Example: API call
      // const response = await loginAPI(data)

    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.')
      console.error('Login error:', error)
    }
  }

  const handleLogin = handleSubmit(onSubmit)

  return (
    <AppContainer style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <AppBackButton />
      <View style={styles.header}>
        <AppText type='heading1' color='black' style={styles.title}>Login</AppText>
        <AppText style={styles.subtitle}>Please enter your First, Last name and your phone number in order to register</AppText>
      </View>
      <View style={styles.form}>
        <View>
          <Controller
            control={control}
            name="url"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder='URL'
                isUrl
                style={[styles.input, errors.url && styles.inputError]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={`${value}`}
                autoCapitalize="none"
                keyboardType="url"
                isError={!!errors.url}
                errorText={(errors.url && touchedFields.url) ? errors.url.message : undefined}
              />
            )}
          />
        </View>

        <View>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder='Username / Email'
                style={[styles.input, errors.email && styles.inputError]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                keyboardType="email-address"
                isError={!!errors.email}
                errorText={(errors.email && touchedFields.email) ? errors.email.message : undefined}
              />
            )}
          />
        </View>

        <View>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="Password"
                secureTextEntry
                style={[styles.input, errors.password && styles.inputError]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                isError={!!errors.password}
                errorText={(errors.password && touchedFields.password) ? errors.password.message : undefined}
              />
            )}
          />
        </View>
      </View>

      <AppButton
        style={styles.button}
        titleColor={!isValid ? 'neutral400' : undefined}
        buttonColor={!isValid ? 'neutral200' : undefined}
        title={'Login'}
        onPress={handleLogin}
        disabled={!isValid}
      />
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing['md'],
  },
  header: {
    rowGap: Spacing.sm,
    marginBottom: Spacing['2xl'],
  },
  title: {},
  subtitle: {},
  form: {
    rowGap: Spacing['2xl'],
  },
  input: {},
  inputError: {
    borderColor: '#ff4444',
    borderWidth: 1,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    top: "30%"
  },
})