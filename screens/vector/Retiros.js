import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Button,TextInput, Alert, ScrollView,
  FlatList,
  Platform,
  ActivityIndicator, } from 'react-native';

import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as ordersActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";


const Retiros=props=> {   
  Retiros.navigationOptions = (navData) => {
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
        <Text style={styles.palabrass}>Solicitud de Retiro</Text>
        </View>   


  <View >
  <Text >Nombre:</Text>
  <TextInput placeholder="Respuesta" />
  </View>

  <View >
  <Text >País:</Text>
  <TextInput placeholder="Respuesta" />
  </View>

  <View >
  <Text >Estado:</Text>
  <TextInput placeholder="Respuesta" />
  </View>
  
  <View >
  <Text >Ciudad o municipio:</Text>
  <TextInput placeholder="Respuesta" />
  </View>

  <View >
  <Text >Calle:</Text>
  <TextInput placeholder="Respuesta" />
  </View>

  <View >
  <Text >Código Postal: </Text>
  <TextInput placeholder="Respuesta" />
  </View>

  <View >
  <Text >Número de cuenta bancaria:</Text>
  <TextInput placeholder="Respuesta" />
  </View>

   <View >
  <Text >Saldo a Retirar: $</Text>
  <TextInput placeholder="Respuesta" />
  </View>


  <View style={styles.boton}>
      <Button title="Menú" color="blue" onPress={props.onRestart}/>
      </View>
      <View style={styles.boton}>
<Button title="Realizar Solicitud de Retiro" color="green" />
</View>
</View>
</ScrollView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        color:'black',
         padding:10
      },
      titulos:{
        fontSize:30,
         padding:10
      },
   dato:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color:'black',
     padding:10
  },
  palabrass:{
 margin: 24,
    fontSize:15,
    flexDirection:"row",
      padding:10
  },
      image: {
      width: '100%',
      height: 230,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      color:'black',
  padding:80
    },
     boton:{
    width:380,
    alignItems:'flex-end',
    alignSelf:'flex-end',
    paddingTop:5,
  },
  });
export default Retiros;