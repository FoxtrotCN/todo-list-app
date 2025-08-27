import React, { useState, useEffect } from "react";
import { View, TextInput, Switch, TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { api } from "../api/client";
import { Todo } from "../types/todo";

type EditTodoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function EditTodoScreen() {
    const navigation = useNavigation<EditTodoScreenNavigationProp>();
    const route = useRoute<any>();
    const todo: Todo = route.params.todo;

    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [completed, setCompleted] = useState(todo.completed);

    const handleUpdate = async () => {
        try {
            await api.put(`/todos/${todo.id}`, { title, description, completed });
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
                style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }}
            />

            <TextInput
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
                multiline
                style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, height: 100, textAlignVertical: "top" }}
            />

            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 15 }}>
                <Text style={{ fontSize: 16, marginRight: 10 }}>Completado</Text>
                <Switch value={completed} onValueChange={setCompleted} />
            </View>

            <TouchableOpacity
                style={{ backgroundColor: "#28a745", padding: 15, borderRadius: 8, marginTop: 10 }}
                onPress={handleUpdate}
            >
                <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>Guardar cambios</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ marginTop: 15, padding: 12, borderRadius: 8, backgroundColor: "#6c757d" }}
                onPress={() => navigation.goBack()}
            >
                <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}
