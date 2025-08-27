import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Todo } from "../types/todo";

type Props = {
    todo: Todo;
    onPress: () => void;
    onDelete: () => void;
};

export const ToDoCard: React.FC<Props> = ({ todo, onPress, onDelete }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor: todo.completed ? "#d4edda" : "#fff3cd" }]}>
            <Text style={styles.title}>{todo.title}</Text>
            <Text style={styles.description}>{todo.description}</Text>
            <Text style={styles.status}>{todo.completed ? "Completado" : "Pendiente"}</Text>

            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
    description: { fontSize: 14, color: "#555" },
    status: { marginTop: 6, fontWeight: "600" },
    deleteButton: {
        marginTop: 8,
        backgroundColor: "#dc3545",
        padding: 8,
        borderRadius: 5,
        alignItems: "center",
    },
    deleteText: { color: "#fff", fontWeight: "bold" },
});
