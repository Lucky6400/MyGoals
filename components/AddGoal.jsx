import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../styles/style'
import { MaterialIcons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { taskAction } from '../redux/taskSlice'

const AddGoal = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    return (
        <View style={{ paddingVertical: 10 }}>
            <View style={styles.inputCont}>
                <TextInput
                    value={text}
                    onChangeText={e => setText(e)}
                    placeholder='Add a goal'
                    style={styles.inputText} multiline />
            </View>

            <TouchableOpacity onPress={() => {
                dispatch(taskAction.addTask({
                    id: Date.now(),
                    description: text,
                    date: new Date().toString(),
                    completed: false,
                    important: false,
                    progress: 0,
                    dueDate: ''
                }));
                setText('');
            }
            } style={styles.addBtn}>
                <MaterialIcons name="done" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default AddGoal