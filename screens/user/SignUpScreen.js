import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Platform,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import Auth from "@aws-amplify/auth";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
      repeatPassword: "",
      name: "",
      phone_number: "",
      address: "",
    },
    inputValidities: {
      email: false,
      password: false,
      repeatPassword: false,
      name: false,
      phone_number: false,
      address: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    if (!formState.formIsValid) {
      console.log(formState.inputValidities.phone_number);
      Alert.alert("Error", "Porfavor valida que los campos esten llenos.", [
        { text: "Okay" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    await dispatch(
      authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.name,
        formState.inputValues.phone_number,
        formState.inputValues.address
      )
    );
    setIsLoading(false);
    props.navigation.navigate("Confirm", {
      email: formState.inputValues.email,
    });
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <View style={styles.screen}>
      <LinearGradient colors={["#0035c7", "#fc8200"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="name"
              label="Nombre"
              keyboardType="default"
              required
              autoCapitalize="words"
              errorText="Porfavor ingresa un nombre."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="address"
              label="Dirección"
              keyboardType="default"
              required
              autoCapitalize="sentences"
              errorText="Porfavor ingresa una dirección."
              onInputChange={inputChangeHandler}
              initialValue=""
              placeholder="Colonia, calle y numero"
              placeholderTextColor="grey"
            />
            <Input
              id="phone_number"
              label="Numero Celular"
              keyboardType="phone-pad"
              required
              errorText="Porfavor ingresa un numero celular."
              onInputChange={inputChangeHandler}
              initialValue=""
              placeholder="+818116605611"
              placeholderTextColor="grey"
            />
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Contraseña"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="repeatPassword"
              label="Repetir Contraseña"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="La contraseña debe de ser igual a la anterior."
              onInputChange={inputChangeHandler}
              initialValue=""
              firstPassword={formState.inputValues.password}
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={"Registrarse"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </View>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Registro",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    height: "95%",
    maxHeight: 540,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 17,
  },
});

export default AuthScreen;
