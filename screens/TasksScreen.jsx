import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Button, Switch } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../styles/style';
import { danger, green, primary } from '../theme/colors';
import { dummyTasks } from '../data/dummyTasks';
import AddGoal from '../components/AddGoal';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { taskAction } from '../redux/taskSlice';

const TasksScreen = ({ navigation, route }) => {
    const params = route.params;
    const dispatch = useDispatch();
    console.log(params)
    const [modalVisible, setModalVisible] = useState(false);
    const [input, setInput] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [curr, setCurr] = useState(null);
    const [isEnabled, setIsEnabled] = useState(curr ? curr.completed === true : false);
    const [isEnabled2, setIsEnabled2] = useState(curr ? curr.important === true : false);
    const toggleSwitch = () => {
        dispatch(taskAction.markTaskCompleted(curr))
        setIsEnabled(previousState => !previousState)
    };
    const toggleSwitch2 = () => {
        dispatch(taskAction.markTaskImportant(curr));
        setIsEnabled2(previousState => !previousState)
    };
    const allTasks = useSelector(s => s.taskReducer.tasks)
    let currentTasks = allTasks;

    if (params.type === 'completed') {
        currentTasks = currentTasks.filter(v => v.completed === true);
    } else if (params.type === 'important') {
        currentTasks = currentTasks.filter(v => v.important === true);
    } else if (params.type === 'pending') {
        currentTasks = currentTasks.filter(v => v.completed === false);
    } else if (params.type === 'today') {
        currentTasks = currentTasks.filter(v => v.date && new Date(v.date).toDateString() === new Date().toDateString());
    }

    return (
        <View style={{ ...styles.homeCont, paddingHorizontal: 10 }}>
            <ScrollView>
                {currentTasks?.map((v, i) => {

                    let bg = primary;
                    if (v.completed === true) bg = green;
                    else if (v.important === true) bg = danger
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setCurr(v);
                                setIsEnabled(v.completed === true);
                                setIsEnabled2(v.important === true);
                                setModalVisible(true);
                            }}
                            key={i + Date.now()} style={{ ...styles.taskCard, backgroundColor: bg }}>
                            <Text style={styles.taskName}>{new Date(v.date).toLocaleString()}</Text>
                            <Text>
                                {v.description.length > 100 ? v.description.slice(0, 100) + "..." : v.description}
                            </Text>

                        </TouchableOpacity>
                    )
                })}

            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setCurr(null);
                    setIsEnabled(false);
                    setIsEnabled2(false);
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {editMode ?
                            <>
                                <TextInput
                                    onChangeText={e => setInput(e)}
                                    value={input} multiline style={{ textAlignVertical: 'top', width: '90%', color: 'white', padding: 10 }} />
                                <Button
                                    onPress={() => {
                                        dispatch(taskAction.editTask({
                                            id: curr.id,
                                            task: {
                                                ...curr,
                                                description: input
                                            }
                                        }));
                                        setCurr(p => ({ ...p, description: input }))
                                        setEditMode(false);
                                    }}
                                    title="Done" color={primary} />
                            </>
                            :
                            <Text style={{ ...styles.textWhite, padding: 10, width: '90%' }}>
                                {curr ? curr.description : ''}
                            </Text>
                        }


                        <View style={styles.centeredRow}>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isEnabled ? green : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                            <Text style={styles.textWhite}>
                                Completed
                            </Text>
                        </View>

                        <View style={styles.centeredRow}>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isEnabled2 ? danger : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch2}
                                value={isEnabled2}
                            />
                            <Text style={styles.textWhite}>
                                Important
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                setInput(curr.description);
                                setEditMode(true);
                            }}
                            style={styles.editBtn}>
                            <MaterialIcons name="mode-edit" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <AddGoal />
        </View>
    )
}

export default TasksScreen