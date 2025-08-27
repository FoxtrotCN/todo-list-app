import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { api } from "../api/client";
import { RootStackParamList } from "../../App";

type AddTodoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "AddTodo">;

export default function AddTodoScreen() {
    const navigation = useNavigation<AddTodoScreenNavigationProp>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddTodo = async () => {
        try {
            await api.post("/todos", { title, description, completed: false });
            navigation.goBack();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 15,
                }}
            />
            <TextInput
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
                multiline
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 10,
                    height: 100,
                    textAlignVertical: "top",
                }}
            />

            <TouchableOpacity
                style={{
                    backgroundColor: "#28a745",
                    padding: 15,
                    borderRadius: 8,
                    marginTop: 20,
                }}
                onPress={handleAddTodo}
            >
                <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
                    Guardar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    marginTop: 15,
                    padding: 12,
                    borderRadius: 8,
                    backgroundColor: "#6c757d",
                }}
                onPress={() => navigation.goBack()}
            >
                <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
                    Cancelar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
