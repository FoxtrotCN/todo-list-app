import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import AddTodoScreen from "./src/screens/AddToDoScreen";
import EditTodoScreen from "./src/screens/EditToDoScreen";



export type RootStackParamList = {
  Home: undefined;
  AddTodo: undefined;
  EditTodo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "ToDos" }} />
          <Stack.Screen name="AddTodo" component={AddTodoScreen} options={{ title: "Nuevo ToDo" }} />
          <Stack.Screen name="EditTodo" component={EditTodoScreen} options={{ title: "Editar ToDo" }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
