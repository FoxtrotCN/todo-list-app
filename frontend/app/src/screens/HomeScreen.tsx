import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { api } from "../api/client";
import { Todo } from "../types/todo";

export default function HomeScreen() {
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

    useEffect(() => {
        fetchTodos();
    }, []);

    if (loading) return <Text>Cargando...</Text>;

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View
                        style={{
                            padding: 15,
                            marginVertical: 8,
                            borderRadius: 10,
                            backgroundColor: item.completed ? "#d4edda" : "#fff3cd", // verde suave / amarillo suave
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>
                            {item.title}
                        </Text>
                        <Text style={{ fontSize: 14, color: "#555" }}>{item.description}</Text>
                        <Text style={{ marginTop: 6, fontWeight: "600" }}>
                            {item.completed ? "✅ Completado" : "❌ Pendiente"}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}
