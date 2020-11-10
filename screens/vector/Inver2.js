import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, 
  Button,TextInput, Alert, ScrollView,  FlatList,
  Platform,
  ActivityIndicator, } from 'react-native';


import { Card, Divider } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as ordersActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";

const Inver2=(props)=> { 
  Inver2.navigationOptions = (navData) => {
    return {
      headerTitle: "Your Orders",
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    };
  };
    return (
      ////Imagen y Titulo y datos 
      <ScrollView>
<View>
  <View>
  <Image source={require('../assets/logo.jpg')} style={styles.image} resizeMode='contain' /> 
  </View>
 <View style={styles.container}>
<Text style={styles.titulos}>VectorPAI Móvil</Text>
</View>
<View style={styles.dato}>
<Text style={styles.palabrass}>Ofertas de Inversión</Text>
</View>   

    <SafeAreaView style={styles.conta}>
      <View style={styles.conta}>
        <Card>
          {/*react-native-elements Card*/}
          <Text style={styles.paragraph}>
          Ejecutivo de aguna cosa de nivel medio
          </Text>
        </Card>
      </View>
    </SafeAreaView>

 <View style={styles.conta}>
<Card>
  <Text style={styles.paragraph}>VectorPAI Móvil</Text>
</Card>
 </View>     


</View>
</ScrollView>
  )
}
const styles = StyleSheet.create({
     boton:{
    width:380,
    alignItems:'flex-end',
    alignSelf:'flex-end',
    paddingTop:15,
  },
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      color:'black',
      padding:20,
    },
    image: {
      width: '100%',
      height: 230,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      color:'black',
      padding:90
    },
      palabrass:{
 margin: 24,
    fontSize:20,
    padding:5,
  },
    titulos:{
      fontSize:30,
      paddingTop:5,
    },

    paragraph: {
    margin: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
    conta: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#ddf0f1',
  },
  });
export default Inver2;