import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { api } from "../api/client";
import { Todo } from "../types/todo";
import { RootStackParamList } from "../../App";
import {ToDoCard} from "../components/ToDoCard";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTodos = async () => {
        try {
            const res = await api.get<Todo[]>("/");
            setTodos(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchTodos();
        }, [])
    );

    const handleDelete = async (id: number) => {
        Alert.alert("Eliminar ToDo", "¿Estás seguro?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: async () => {
                    try {
                        await api.delete(`/${id}`);
                        fetchTodos();
                    } catch (err) {
                        console.error(err);
                    }
                },
            },
        ]);
    };

    if (loading) return <Text>Cargando...</Text>;

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TouchableOpacity
                style={{
                    backgroundColor: "#007bff",
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 15,
                }}
                onPress={() => navigation.navigate("AddTodo")}
            >
                <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
                    ➕ Nuevo ToDo
                </Text>
            </TouchableOpacity>

            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ToDoCard
                        todo={item}
                        onPress={() => navigation.navigate("EditTodo", { todo: item })}
                        onDelete={() => handleDelete(item.id)}
                    />
                )}
            />
        </View>
    );
}
