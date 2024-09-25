import './global.css';
import './shim';
import * as React from 'react';
import {useEffect} from 'react';
import {enableScreens} from 'react-native-screens';
import {LogBox, StatusBar, StyleSheet} from 'react-native';
import {useInternetConnection} from '@magic-sdk/react-native-bare';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import '@src/config/localization/i18n';
import ThemeProvider from '@src/themes/ThemeProvider';
import AppNavigator from '@src/navigation/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {useTranslation} from 'react-i18next'; // Import useTranslation hook
LogBox.ignoreAllLogs(true);
enableScreens();
LogBox.ignoreLogs([
  'Possible Unhandled Promise Rejection',
  /Non-serializable values were found in the navigation state\. Check:/,
  /ReactImageView:/,
]);
import '@src/config/reactotron/ReactotronConfig';
import {logMessage} from '@src/services/utils/log/log';
import {useSnapshot} from 'valtio';
import CommonAlert from '@components/common/CommonAlert';
import SplashScreen from '@screens/auth/SplashScreen';
import WalletConnectModal from '@components/wc/WalletConnectModal';
import crypto from 'react-native-quick-crypto';
import {ethers} from 'ethers';
import {wcStore} from '@src/stores/wcStore';
import {checkUserStatus, userStore} from '@src/stores/userStore';
import CommonSpinner from '@components/common/CommonSpinner';
import currencyStore from '@src/stores/currencyStore';
import themeStore from '@src/stores/themeStore';
import languageStore from '@src/stores/languageStore';
import {SheetProvider} from 'react-native-actions-sheet';
import '@components/sheet/sheets';
import {OneSignal} from 'react-native-onesignal';
import {clearAll} from "@src/services/utils/storage/mmkvService";

ethers.randomBytes.register(length => {
  return new Uint8Array(crypto.randomBytes(length));
});

ethers.computeHmac.register((algo, key, data) => {
  return crypto.createHmac(algo, key).update(data).digest();
});

ethers.pbkdf2.register((passwd, salt, iter, keylen, algo) => {
  return crypto.pbkdf2Sync(passwd, salt, iter, keylen, algo);
});

ethers.sha256.register(data => {
  return crypto.createHash('sha256').update(data).digest();
});

ethers.sha512.register(data => {
  return crypto.createHash('sha512').update(data).digest();
});
//
// // OneSignal Initialization
// OneSignal.initialize('a4223982-d066-4125-aabb-e7e259cadce9');
//
// // requestPermission will show the native iOS or Android notification permission prompt.
// // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
// OneSignal.Notifications.requestPermission(true).then(r => {});
//
// // Method for listening for notification clicks
// OneSignal.Notifications.addEventListener('click', event => {
//   console.log('OneSignal: notification clicked:', event);
// });
// OneSignal.Notifications.addEventListener('foregroundWillDisplay', event => {
//   event.preventDefault();
//   // some async work
//
//   // Use display() to display the notification after some async work
//   event.getNotification().display();
// });
// OneSignal.InAppMessages.addEventListener('willDisplay', event => {
//   console.log('OneSignal: will display IAM: ', event);
// });
//
// OneSignal.InAppMessages.addEventListener('didDisplay', event => {
//   console.log('OneSignal: did display IAM: ', event);
// });
//
// OneSignal.InAppMessages.addEventListener('willDismiss', event => {
//   console.log('OneSignal: will dismiss IAM: ', event);
// });
//
// OneSignal.InAppMessages.addEventListener('didDismiss', event => {
//   console.log('OneSignal: did dismiss IAM: ', event);
// });
export default function App() {
  const connected = useInternetConnection();
  const {loading} = useSnapshot(userStore);
  const {theme} = useSnapshot(themeStore);
  const {t} = useTranslation(); // Initialize the translation function

  useEffect(() => {
    (async () => {
      //clearAll();
      await checkUserStatus();
      themeStore.loadTheme(); // Load the theme on component mount
      wcStore.initializeWalletConnect();
      languageStore.loadLanguage();
      currencyStore.loadCurrency();
      currencyStore.fetchExchangeRates();
    })();

    if (!connected) {
      logMessage(t('internet.lost'), 'warn'); // Use translated message
      // Implement offline screen or UI change here if desired
    }
  }, [connected]);

  return (
    <SafeAreaProvider className={'bg-black'}>
      <NavigationContainer theme={styles.theme}>
        <ThemeProvider name={theme}>
          <SheetProvider>
            {loading ? <SplashScreen /> : <AppNavigator />}
          </SheetProvider>
          <CommonAlert />
          <CommonSpinner />
          <WalletConnectModal />
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  theme: {
    colors: {background: 'black'},
  },
  bg: {
    backgroundColor: '#1d0635',
  },
});
