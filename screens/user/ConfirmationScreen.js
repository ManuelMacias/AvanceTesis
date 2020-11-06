import React, { useReducer, useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Platform,
  Button,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

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

const ConfirmationScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { navigation } = props;
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      confirmationCode: ""
    },
    inputValidities: {
      confirmationCode: false,
    },
    formIsValid: false,
  });

  const signupHandler = async () => {
    setIsLoading(true);
    try{
      await dispatch(
        authActions.confirmSignUp(
          navigation.getParam('email'),
          formState.inputValues.confirmationCode
        )
      );
    }catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
    navigation.navigate('Auth');
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
    <View
      style={styles.screen}
    >
      <LinearGradient colors={["#0035c7", "#fc8200"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="confirmationCode"
              label="Codigo de confirmación:"
              keyboardType="numeric"
              required
              autoCapitalize="none"
              errorText="Please enter a confirmation code"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
            {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
              <Button
                title="Confirmar"
                color={Colors.primary}
                onPress={signupHandler}
              />
              )}
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </View>
  );
};

ConfirmationScreen.navigationOptions = {
  headerTitle: "Codigo de Confirmación",
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
    height: "80%",
    maxHeight: 180,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 15,
  },
});

export default ConfirmationScreen;
