import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";
import {
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

function TrackScreen(props) {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [err, setErr] = useState(null);

  const getLocation = () => {
    requestForegroundPermissionsAsync().then((permission) => {
      if (permission.granted) {
        getCurrentPositionAsync()
          .catch((err) => setErr(err))
          .then((loc) => {
            setLocation(loc.coords);
            console.log(location);
          });
      } else {
        setErr(
          "Permission Not Granted! Kindly Grant the App Location Permissions"
        );
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <SafeAreaView style={styles.maincontainer}>
      <StatusBar />
      <View style={styles.mapView}>
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            image={require("../assets/home.png")}
          />
        </MapView>
        <View
          style={{
            backgroundColor: "white",
            elevation: 1,
            borderRadius: 25,
            width: 35,
            height: 35,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-end",
            right: 25,
            bottom: "20%",
          }}
        >
          <TouchableNativeFeedback
            style={{ backgroundColor: "white", width: 35, height: 35 }}
            onPress={() => getLocation()}
          >
            <MaterialIcons name="my-location" size={25} color="black" />
          </TouchableNativeFeedback>
        </View>
      </View>
      {err ? (
        <View style={styles.errView}>
          <Text>{err}</Text>
          <Button
            style={{ backgroundColor: "dodgerblue", width: "50%" }}
            mode="contained"
            onPress={() => getLocation()}
          >
            Get Permission
          </Button>
        </View>
      ) : null}
      <View style={styles.DataView}>
        <Button
          style={{ backgroundColor: "dodgerblue", width: "50%" }}
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Record
        </Button>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  maincontainer: { flex: 1, backgroundColor: "white" },
  mapView: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.5,
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    overflow: "hidden",
    borderBottomRightRadius: 20,
  },
  map: { width: "100%", height: "100%" },
  DataView: {
    width: Dimensions.get("screen").width,
    height: "50%",
    justifyContent: "space-around",
    backgroundColor: "white",
    alignItems: "center",
  },
  errView: {
    backgroundColor: "white",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
export default TrackScreen;
