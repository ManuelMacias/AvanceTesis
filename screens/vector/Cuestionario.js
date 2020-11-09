import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as usersActions from "../../store/actions/user";

import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

const CuestionarioScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const name = useSelector((state) => state.user.name);
  const address = useSelector((state) => state.user.address);
  const email = useSelector((state) => state.user.email);
  const phone_number = useSelector((state) => state.user.phone_number);
  const dispatch = useDispatch();



//RRRRRRRRRRR
  const [datoValor1,setDatoValor1]=useState('');
  const [datoValor2,setDatoValor2]=useState('');
  const [datoValor3,setDatoValor3]=useState('');
  const [datoValor4,setDatoValor4]=useState('');
  const [datoValor5,setDatoValor5]=useState('');
    const [userPerfil,setUserPerfil]=useState('No se ha determinado un perfil');
     const [confirmed,setConfirmed]=useState(false);
     const [perfilUsuario,setPerfilUsuario]=useState('');
     var objetivo=0;
     var cantidad=0;
     var tiempo=0;
     var mensual=0;
     var ahorromes=1.1;
     var totalahorrar=1.1;
     //Aqui se va a decidir el perfil con if adentro
    const eleccionPerfil=()=>{
     setConfirmed(true);
  objetivo=Number(datoValor3);
  tiempo=Number(datoValor4);
  cantidad=Number(datoValor5);
  mensual=tiempo*12;
  ahorromes=objetivo/mensual;
  totalahorrar=cantidad-ahorromes;
  
  //totalahorrar es cuanto termina ahorrando de lo que deberia al mes
  
     if(ahorromes<=20000 ){
  setPerfilUsuario('eVectorGrow');
     }
     if(ahorromes>20000 && ahorromes<500000){
  setPerfilUsuario('eVector');
     }
        if(ahorromes>=500000){
  setPerfilUsuario('Vector Tradicional');
     }
   setUserPerfil(perfilUsuario);
  ///////////////////////Acomodo mientras el perfil para lo de ¿Para que quieres ahorra?, el objetivo y a cuantos años lo quieres
    }
//RRRRRRRRRRRRRRRRRRR





  const loadUserData = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(usersActions.fetchUserData());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadUserData
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadUserData]);

    useEffect(() => {
      setIsLoading(true);
      loadUserData().then(() => {
        setIsLoading(false);
      });
    }, [dispatch, loadUserData]);


  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{address}</Text>
        <Button
          title="Try again"
          onPress={loadUserData}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
 <ScrollView>
 <View style={styles.centered}>
 <View>
   <Image source={require('../../assets/logo.jpg')} style={styles.image} resizeMode='contain' /> 
   </View>
 
   <View>
   <Text style={styles.titulos}>VectorPAI Móvil</Text>
   </View>      
 
       <View>
       <Text >Perfil Actual: {userPerfil}</Text>
       </View>
  
   <View >
   <Text style={styles.palabrass}>¿Cuál es el nombre de la empresa en la que trabaja?</Text>
   <TextInput placeholder="Respuesta"  value={datoValor1} onChangeText={text => setDatoValor1(text)}/>
   </View>
 
     <View >
   <Text style={styles.palabrass}>¿Para qué quieres ahorrar?</Text>
   <TextInput placeholder="Respuesta"  value={datoValor2} onChangeText={text => setDatoValor2(text)} />
   </View>
 
     <View >
   <Text style={styles.palabrass}>¿Cuánto se requiere para alcanzar el objetivo? $</Text>
   <TextInput placeholder="Respuesta solo los Números"  value={datoValor3} onChangeText={text => setDatoValor3(text)}/>
   </View>
 
   <View>
   <Text style={styles.palabrass}>¿A cuántos años lo quieres?</Text>
   <TextInput placeholder="Respuesta solo los Números"  value={datoValor4} onChangeText={text => setDatoValor4(text)}/>
   </View>
 
   <View >
   <Text style={styles.palabrass}>¿Cuánto dinero puede ahorrar al mes? $</Text>
   <TextInput placeholder="Respuesta solo los Números"  value={datoValor5} onChangeText={text => setDatoValor5(text)}/>
   </View>
 
   <View style={styles.boton}>
       <Button title="Guardar Respuestas" color="green" onPress={eleccionPerfil} />
       </View>
 
 </View>
 </ScrollView>


  );
};

CuestionarioScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Perfil",
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  palabrass:{
    margin: 10,
       fontSize:15,
       padding:10,
     },
     titulos:{
      fontSize:30,
      paddingTop:5,
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
});

export default CuestionarioScreen;
