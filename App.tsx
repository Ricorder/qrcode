import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Navbar } from './src/Navbar.jsx'

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Ещё не отсканировано')

  const askForCameraPermission = (): void  => {
    (async (): Promise<void>  => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }

  // Request Camera Permission
  useEffect((): void  => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({type, data}): void => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data);
  }

  // Check permissions and return the screens
  if (hasPermission === false) {
    return(
      <View style={styles.container}>
        <Text>Запрос на использование камеры</Text>
      </View>
    )
  }

  if(hasPermission === null) {
    return(
      <View style={styles.container}>
        <Text style={{margin: 10}}>Нет доступа к камере</Text>
        <Button title={'Разрешить камеру'} onPress={() => askForCameraPermission()}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{height: 400, width: 400}} />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      {scanned && <Button title={'Сканировать ещё'} onPress={() => setScanned(false)} color='tomato' />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 100
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
    barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  }
});
