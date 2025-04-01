import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { colors } from '@/styles/Colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const backgroundColor = colors.gray[950];

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor },
      }}
    >
    </Stack>
  );
}
