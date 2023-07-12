import { View, Text, StyleSheet, FlatList, Modal, TextInput } from 'react-native';
import React, { useState } from 'react';
import { DataTable, Button as PaperButton } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

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
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>قائمة المهام</Text>
                <PaperButton
                    mode="contained"
                    onPress={() => setShowTodos(!showTodos)}
                    labelStyle={styles.buttonLabel}
                    style={styles.button}
                // contentStyle={{ backgroundColor: '#76005f' }}
                >
                    {showTodos ? 'إخفاء المهام' : 'عرض المهام'}
                </PaperButton>
            </View>

            {showTodos && (
                <DataTable style={styles.table}>
                    <DataTable.Header>
                        <DataTable.Title style={styles.tableHeader}>
                            المهمة
                        </DataTable.Title>
                        <DataTable.Title style={styles.tableHeader}>
                            الوقت
                        </DataTable.Title>
                        <DataTable.Title style={styles.tableHeader}>
                            الحالة
                        </DataTable.Title>
                        <DataTable.Title style={styles.tableHeader}>
                            الإجراء
                        </DataTable.Title>
                    </DataTable.Header>

                    <FlatList
                        data={todos}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <DataTable.Row key={item.id}>
                                <DataTable.Cell style={styles.tableCell}>
                                    <Text style={styles.taskText}>{item.task}</Text>
                                </DataTable.Cell>
                                <DataTable.Cell style={styles.tableCell}>
                                    <Text style={styles.timeText}>{item.time}</Text>
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
                                        labelStyle={styles.buttonLabel}
                                        style={styles.button}
                                    >
                                        {item.status === 'قيد الانتظار' ? (
                                            <FontAwesomeIcon icon={faCheck} color="white" />
                                        ) : (
                                            <FontAwesomeIcon icon={faTimes} color="white" />
                                        )}
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
                labelStyle={styles.addButtonLabel}
                style={styles.addButton}
            >
                <FontAwesomeIcon icon={faPlus} color="white" size={20} />
            </PaperButton>

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

                        <View style={styles.btnadd}>
                            <PaperButton
                                mode="contained"
                                onPress={addTodo}
                                labelStyle={styles.buttonLabel}
                                style={styles.button}
                            >
                                إضافة
                            </PaperButton>

                        </View>
                        <View >
                            <PaperButton
                                mode="contained"
                                onPress={() => setModalVisible(false)}
                                labelStyle={styles.buttonLabel}
                                style={styles.button}
                            >
                                إلغاء
                            </PaperButton>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#76005f',
        fontFamily: 'Droid',
    },
    button: {
        borderRadius: 7,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        // marginVertical: 10,
    },
    buttonLabel: {
        fontFamily: 'Droid',
        color: 'white',

    },
    table: {
        marginBottom: 20,
        backgroundColor: 'white',
    },
    tableHeader: {
        textAlign: 'right',
        fontFamily: 'Droid',
    },
    tableCell: {
        textAlign: 'right',
        fontFamily: 'Droid',
    },
    taskText: {
        fontFamily: 'Droid',
    },
    timeText: {
        fontFamily: 'Droid',
    },
    statusText: {
        borderRadius: 5,
        padding: 5,
        textAlign: 'center',
        fontFamily: 'Droid',
        fontWeight: 'bold',
        color: 'white',
    },
    completedStatus: {
        backgroundColor: '#76005f',
    },
    pendingStatus: {
        backgroundColor: 'orange',
    },
    addButton: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#76005f',
    },
    btnadd: {

        marginBottom: 8
    },
    addButtonLabel: {
        fontFamily: 'Droid',
        fontSize: 24,
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
        width: 300,
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
    },
});

export default ToDo;
