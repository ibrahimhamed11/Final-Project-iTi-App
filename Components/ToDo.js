import { View, Text, StyleSheet, FlatList, Modal, TextInput } from 'react-native';
import React, { useState } from 'react';
import { DataTable, Button as PaperButton } from 'react-native-paper';

const ToDo = () => {
    const [showTodos, setShowTodos] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [newTime, setNewTime] = useState('');
    const [todos, setTodos] = useState([
        { id: '1', task: 'المهمة 1', time: '10:00 صباحًا', status: 'قيد الانتظار' },
        { id: '2', task: 'المهمة 2', time: '11:00 صباحًا', status: 'مكتملة' },
        { id: '3', task: 'المهمة 3', time: '12:00 ظهرًا', status: 'قيد الانتظار' },
    ]);
    const toggleTodoStatus = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    status: todo.status === 'قيد الانتظار' ? 'مكتملة' : 'قيد الانتظار',
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const addTodo = () => {
        const newTodo = {
            id: (todos.length + 1).toString(),
            task: newTask,
            time: newTime,
            status: 'قيد الانتظار',
        };
        setTodos([...todos, newTodo]);
        setModalVisible(false);
        setNewTask('');
        setNewTime('');
    };

    return (
        <View>
            <View style={{ marginBottom: 20 }}>
                <PaperButton
                    mode="contained"
                    onPress={() => setShowTodos(!showTodos)}
                    labelStyle={{ fontFamily: 'Droid' }}
                    style={{
                        marginTop: 5, alignSelf: 'center', width: 150, borderRadius: 7,
                    }}
                    contentStyle={{ backgroundColor: styles.completedStatus }}
                >
                    {showTodos ? 'إخفاء المهام' : 'عرض المهام'}
                </PaperButton>
                {showTodos && (
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title style={{ textAlign: 'right', fontFamily: 'Droid' }}>
                                المهمة
                            </DataTable.Title>
                            <DataTable.Title style={{ textAlign: 'right', fontFamily: 'Droid' }}>
                                الوقت
                            </DataTable.Title>
                            <DataTable.Title style={{ textAlign: 'right', fontFamily: 'Droid' }}>
                                الحالة
                            </DataTable.Title>
                        </DataTable.Header>

                        <FlatList
                            data={todos}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <DataTable.Row key={item.id}>
                                    <DataTable.Cell style={{ textAlign: 'right', fontFamily: 'Droid' }}>
                                        {item.task}
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ textAlign: 'right', fontFamily: 'Droid' }}>
                                        {item.time}
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <Text
                                            style={[
                                                styles.statusText,
                                                item.status === 'مكتملة' ? styles.completedStatus : styles.pendingStatus,
                                            ]}
                                        >
                                            {item.status}
                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <PaperButton
                                            mode="contained"
                                            onPress={() => toggleTodoStatus(item.id)}
                                            labelStyle={{ fontFamily: 'Droid', fontSize: 10, width: 30 }}
                                            style={{ borderRadius: 7 }}
                                        >
                                            {item.status === 'قيد الانتظار' ? 'تراجع ' : 'مكتملة'}
                                        </PaperButton>
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )}
                        />
                    </DataTable>


                )}
                <PaperButton
                    mode="contained"
                    onPress={() => setModalVisible(true)}
                    labelStyle={{ fontFamily: 'Droid', fontSize: 20, alignItems: 'center' }}
                    style={{ marginTop: 10, alignSelf: 'center', width: 100, height: 100, borderRadius: 7 }}
                >
                    +
                </PaperButton>
            </View>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            value={newTask}
                            onChangeText={(text) => setNewTask(text)}
                            placeholder="المهمة"
                            placeholderTextColor="gray"
                            textAlign="right"
                        />
                        <TextInput
                            style={styles.input}
                            value={newTime}
                            onChangeText={(text) => setNewTime(text)}
                            placeholder="الوقت"
                            placeholderTextColor="gray"
                            keyboardType="numeric"
                            textAlign="right"
                        />
                        <PaperButton
                            mode="contained"
                            onPress={addTodo}
                            labelStyle={{ fontFamily: 'Droid' }}
                            style={{ marginTop: 10, borderRadius: 7, }}
                        >
                            إضافة
                        </PaperButton>
                        <PaperButton
                            mode="contained"
                            onPress={() => setModalVisible(false)}
                            labelStyle={{ fontFamily: 'Droid' }}
                            style={{ marginTop: 10, borderRadius: 7, }}
                        >
                            إلغاء
                        </PaperButton>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    statusText: {
        borderRadius: 5,
        padding: 5,
        textAlign: 'center',
        fontFamily: 'Droid',
        fontWeight: 'bold',
    },
    completedStatus: {
        backgroundColor: 'green',
        color: 'white',
    },
    pendingStatus: {
        backgroundColor: 'orange',
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: 300
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        textAlign: 'right',
        fontFamily: 'Droid',
        alignItems: 'center',

    },
    button: {
        width: 90,
        fontSize: 10,
        marginVertical: 5,
        alignSelf: 'center',
        borderRadius: 7,
    },

    // the changes
    userInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    userName: {
        fontSize: 18,
        fontWeight: 600,
        color: '#76005f',
    },
    userEmail: {
        fontSize: 13,
        color: "grey",
    },
    type: {
        fontWeight: 600,
        color: '#ca9ccd'
    }
});
export default ToDo
