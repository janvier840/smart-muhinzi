import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import database from '@react-native-firebase/database';

export default function FarmGuardApp() {
  const [data, setData] = useState({ temp: "", humidity: "", soil: "", npk: "" });

  useEffect(() => {
    const ref = database().ref('/FarmGuard');
    ref.on('value', snapshot => {
      setData(snapshot.val());
    });
  }, []);

  const controlDevice = (device, status) => {
    database().ref(`/FarmGuard/${device}`).set(status);
  };

  return (
    <View>
      <Text>Temperature: {data.temp} °C</Text>
      <Text>Humidity: {data.humidity} %</Text>
      <Text>Soil Moisture: {data.soil} %</Text>
      <Text>NPK Level: {data.npk} ppm</Text>

      <Button title="Turn ON Siren" onPress={() => controlDevice("Siren", "ON")} />
      <Button title="Turn OFF Siren" onPress={() => controlDevice("Siren", "OFF")} />
    </View>
  );
}
