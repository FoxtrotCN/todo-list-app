import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { api } from "../api/client";
import { Todo } from "../types/todo";
import { RootStackParamList } from "../../App";

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
                    <TouchableOpacity
                        onPress={() => navigation.navigate("EditTodo", { todo: item })}
                        style={{
                            padding: 15,
                            marginVertical: 8,
                            borderRadius: 10,
                            backgroundColor: item.completed ? "#d4edda" : "#fff3cd",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>
                            {item.title}
                        </Text>
                        <Text style={{ fontSize: 14, color: "#555" }}>{item.description}</Text>
                        <Text style={{ marginTop: 6, fontWeight: "600" }}>
                            {item.completed ? "Completado" : "Pendiente"}
                        </Text>

                        <TouchableOpacity
                            onPress={() => handleDelete(item.id)}
                            style={{
                                marginTop: 8,
                                backgroundColor: "#dc3545",
                                padding: 8,
                                borderRadius: 5,
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>Eliminar</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
