import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#011303ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: '#305e4fff',
        },
        headerBackTitle: '',
      }}>
      <Stack.Screen name="index" options={{
        headerTitle: 'Pranayamam'
      }} />
      <Stack.Screen name="details" options={{
        headerTitle: 'Pranayamam',
        headerBackVisible: true,
        headerBackTitle: 'Back',
      }} />
      <Stack.Screen name="exercise" options={{
        headerTitle: 'Exercise',
        headerShown: false,
      }} />
    </Stack>
  );
}
