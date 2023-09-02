import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Button, Switch, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../styles/style';
import { danger, green, primary } from '../theme/colors';
import { dummyTasks } from '../data/dummyTasks';
import AddGoal from '../components/AddGoal';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { taskAction } from '../redux/taskSlice';
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const TasksScreen = ({ navigation, route }) => {
    const params = route.params;
    const dispatch = useDispatch();
    //console.log(params)

    const [modalVisible, setModalVisible] = useState(false);
    const [input, setInput] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [curr, setCurr] = useState(null);
    const [isEnabled, setIsEnabled] = useState(curr ? curr.completed === true : false);
    const [isEnabled2, setIsEnabled2] = useState(curr ? curr.important === true : false);
    const [dateModal, setDateModal] = useState(false);

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

    const closeModal = () => {
        setEditMode(false);
        setCurr(null);
        setIsEnabled(false);
        setIsEnabled2(false);
        setModalVisible(!modalVisible);
    }

    const openModal = (v) => {
        setCurr(v);
        setIsEnabled(v.completed === true);
        setIsEnabled2(v.important === true);
        setModalVisible(true);
    }

    const widthOfWindow = Dimensions.get('window').width;
    console.log(widthOfWindow)
    return (
        <View style={{ ...styles.homeCont, paddingHorizontal: 10 }}>
            <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
                {currentTasks?.map((v, i) => {

                    let bg = primary;
                    let textColor = '#000000';
                    if (v.completed === true) bg = green;
                    else if (v.important === true) {
                        bg = danger;
                        textColor = '#FFFFFF';
                    }

                    return (
                        <TouchableOpacity
                            onPress={() => openModal(v)}
                            key={i + Date.now()} style={{ ...styles.taskCard, backgroundColor: bg, position: 'relative' }}>
                            <Text style={{ ...styles.taskName, color: textColor }}>{new Date(v.date).toLocaleString()}</Text>
                            <Text style={{ marginVertical: 10, color: textColor }}>
                                {v.description.length > 100 ? v.description.slice(0, 100) + "..." : v.description}
                            </Text>
                            {v.completed !== true ?
                                <Progress.Bar
                                    color='#FFFFFF'
                                    style={{ position: 'absolute', bottom: 0, left: 0 }} width={widthOfWindow - 20} progress={v.progress / 100} />
                                : <></>}

                        </TouchableOpacity>
                    )
                })}

            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {editMode ?
                            <>
                                <TextInput
                                    onChangeText={e => setInput(e)}
                                    value={input} multiline style={{ textAlignVertical: 'top', width: '100%', color: 'white', padding: 10, height: 125 }} />
                                <Button
                                    onPress={() => {
                                        dispatch(taskAction.editTask({
                                            id: curr?.id,
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
                            <Text style={{ ...styles.textWhite, padding: 10, width: '75%' }}>
                                {curr ? curr.description : ''}
                            </Text>
                        }


                        <View style={{...styles.centeredRow, marginVertical: 30, justifyContent: 'center', gap: 30, borderTopWidth: 1, borderColor: '#ffffff73'}}>
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
                        </View>

                        <View style={styles.progressCont}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (curr && curr.progress > 0) {
                                        setCurr(p => ({ ...p, progress: p.progress - 5 }))
                                    }
                                    dispatch(taskAction.minusProgress({
                                        id: curr.id
                                    }))
                                }}
                                style={styles.progBtn}>
                                <AntDesign name="minus" size={24} color="black" />
                            </TouchableOpacity>
                            <Progress.Circle
                                style={{
                                    alignSelf: 'center'
                                }}
                                size={100}
                                showsText
                                thickness={15}
                                formatText={(p) => curr?.progress + "%"}
                                color={primary}
                                progress={((curr?.progress) / 100)} indeterminate={false} />
                            <TouchableOpacity
                                onPress={() => {
                                    if (curr && curr.progress < 100) {
                                        setCurr(p => ({ ...p, progress: p.progress + 5 }))
                                    }
                                    dispatch(taskAction.addProgress({
                                        id: curr.id
                                    }))
                                }}
                                style={styles.progBtn}>
                                <Ionicons name="add" size={24} color="black" />
                            </TouchableOpacity>

                        </View>

                        <View style={{ margin: 10, alignItems: 'center' }}>

                            <Text style={styles.textWhiteBold}>Due Date: </Text>
                            <TouchableOpacity style={styles.dateCont} onPress={() => setDateModal(true)}>
                                <Text style={{ ...styles.textWhite, fontSize: 18 }}>{curr?.dueDate || "N.A"}</Text>
                            </TouchableOpacity>
                        </View>

                        {dateModal ?
                            <DateTimePicker
                                value={new Date()}
                                onChange={(e, s) => {
                                    setDateModal(false);
                                    dispatch(taskAction.changeDueDate({
                                        id: curr?.id,
                                        date: s.toDateString()
                                    }));
                                    setCurr(p => ({ ...p, dueDate: s.toDateString() }))
                                }}
                            />
                            : <></>}

                        {!editMode ?
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        setInput(curr.description);
                                        setEditMode(true);
                                    }}
                                    style={styles.editBtn}>
                                    <MaterialIcons name="mode-edit" size={24} color="black" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(taskAction.deleteTask(curr));
                                        setModalVisible(false);
                                        setIsEnabled(false);
                                        setIsEnabled2(false);
                                    }}
                                    style={styles.deleteBtn}>
                                    <MaterialIcons name="delete" size={24} color="white" />
                                </TouchableOpacity>
                            </>
                            : <></>}

                    </View>
                </View>
            </Modal>
            <AddGoal />
        </View>
    )
}

export default TasksScreen