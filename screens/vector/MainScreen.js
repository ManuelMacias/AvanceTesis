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

const MainScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const name = useSelector((state) => state.user.name);
  const address = useSelector((state) => state.user.address);
  const email = useSelector((state) => state.user.email);
  const phone_number = useSelector((state) => state.user.phone_number);
  const dispatch = useDispatch();

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
<Text style={styles.palabrass}>Nombre de Parcipante: {name}</Text>
</View>

<View>
<Text style={styles.palabrass}>Direccion: {address}</Text>
</View>

<View>
<Text style={styles.palabrass}>Email: {email}</Text>
</View>

<View>
<Text style={styles.palabrass}>Celular: {phone_number}</Text>
</View>


<View> 
<Text style={styles.palabrass}>Saldo de Aportación Ordinaria: </Text>
</View>

<View> 
<Text style={styles.palabrass}>Saldo de Aportación Extraordinaria:</Text>
</View>

<View> 
<Text style={styles.palabrass}>Saldo de Rendimiento:</Text>
</View>

<View> 
<Text style={styles.palabrass}>Saldo Distribuido (Otros empleados)</Text>
</View>

<View> 
<Text style={styles.palabrass}>Retiros: $</Text>
</View>

<View> 
<Text style={styles.palabrass}>Saldo Total: $</Text>
</View>

<View> 
<Text style={styles.palabrass}>Saldo Posible a Retirar: $</Text>
</View>
      </View>
      </ScrollView>
  );
};

MainScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Pantalla Principal",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
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

export default MainScreen;
