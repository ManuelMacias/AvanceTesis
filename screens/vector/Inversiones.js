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

const Inversiones=(props)=> {  
    const [userPerfilUsuario, setUserPerfilUsuario] = useState('');
    setUserPerfilUsuario('perfil')

  if(userPerfilUsuario=='eVectorGrow'){
    return(
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
                  Ejecutivo de aguna cosa de nivel bajo
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
    );
  }
    if(props.cosa=='eVector'){
    return(
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
    );
  }
    if(props.cosa=='Vector Tradicional'){
    return(
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
                Ejecutivo de aguna cosa de nivel alto
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
    );
  }
  Inversiones.navigationOptions = (navData) => {
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
      <Text style={styles.palabrass}>MarketPlace</Text>
      </View>   
      <View style={styles.dato}>
      <Text style={styles.palabrass}>No se ha definido el Perfil</Text>
      </View>  



</View>
</ScrollView>
);
}
const styles = StyleSheet.create({

      screen: {
    flex: 1,
    },
     boton:{
    width:380,
    alignItems:'flex-end',
    alignSelf:'flex-end',
    paddingTop:15,
  },

  });
export default Inversiones;