import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import {  icons , COLORS } from '../../constants';

const Menu = ({page}) => {

  const navigation = useNavigation();

  var TestIconStyle = styles.InactiveIconStytle;
  var PlaceIconStyle = styles.InactiveIconStytle;


  if( page == "Test"){
    TestIconStyle = styles.ActiveIconStytle;
  }else if(page == "Place"){
    PlaceIconStyle = styles.ActiveIconStytle;
  }

  return (
    <View style={styles.menuContainer}>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
            navigation.navigate("Test");
        } }>
        <Image
          style={TestIconStyle}
          source={icons.edit}
        />
         <Text
           style={styles.textStyle}>
            Test
         </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate("Place");
        } }>
        <Image
          style={PlaceIconStyle}
          source={icons.world}
        />
         <Text
           style={styles.textStyle}>
            Place
         </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textStyle: {
    textTransform: "uppercase",
  },
  ActiveIconStytle: {
    width: "100%",
    tintColor: COLORS.primary,
    height: 50,
    marginTop:10,
    textAlign: "center",
    aspectRatio: 1,
  },
  InactiveIconStytle: {
    width: "100%",
    tintColor: COLORS.darkgray,
    height: 50,
    marginTop:10,
    textAlign: "center",
    aspectRatio: 1,
  },
  textStyle: {
    width: "auto",
    marginTop:5,
    height: 20,
    textAlign: "center",
  },
});


export default Menu;
