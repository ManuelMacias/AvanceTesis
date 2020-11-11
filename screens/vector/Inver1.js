import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Button,TextInput, Alert, ScrollView,  FlatList,
  Platform,
  ActivityIndicator, } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as ordersActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";
import PRODUTCTS from '../../data/dummy-data';

import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products";



const Inver1=(props)=> {   
  const initialState={
userProducts1: PRODUTCTS.filter(prod=>prod.ownerId==='u1'),
userProducts2: PRODUTCTS.filter(prod=>prod.ownerId==='u2'),
userProducts3: PRODUTCTS.filter(prod=>prod.ownerId==='u3'),
  };
  
 const products=useSelector(state=>state.products.userProducts);
return (
<FlatList data={products} keyExtractor={item=>item.id} renderItem={itemData=><Text>{itemData.item.title}</Text>}/>
);
};


  Inver1.navigationOptions = (navData) => {
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

export default Inver1;