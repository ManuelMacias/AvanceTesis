import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
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
      <View style={styles.centered}>
      <Text>Nombre: {name}</Text>
      <Text>Direccion: {address}</Text>
      <Text>Email: {email}</Text>
      <Text>Celular: {phone_number}</Text>
      </View>
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
});

export default MainScreen;
