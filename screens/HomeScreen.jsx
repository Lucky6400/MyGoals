import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../styles/style'
import { Feather } from '@expo/vector-icons';
import { danger, green, primary, warning, yellow } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import { Modal } from 'react-native';
import { Dimensions } from 'react-native';

import * as Progress from 'react-native-progress';
import { ScrollView } from 'react-native';

const HomeScreen = ({ navigation, route }) => {
  const tasks = useSelector(s => s.taskReducer.tasks);
  const pendingTasks = tasks.filter(t => t.completed !== true).length;
  const [selected, setSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const heightOfWindow = Dimensions.get('window').height;
  const todayTasks = tasks?.filter(v => new Date(selected).toDateString() === new Date(v.date).toDateString())

  return (
    <View style={styles.homeCont}>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
          setModalVisible(true);
        }}
        
        theme={{
          backgroundColor: '#313131',
          calendarBackground: '#393939',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: primary,
          selectedDayTextColor: '#ffffff',
          todayTextColor: primary,
          dayTextColor: '#ffffff',
          monthTextColor: green,
          textDisabledColor: '#7c7c7c'
        }}
        style={{ marginBottom: 20 }}
      />


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView
              style={{ height: heightOfWindow / 1.2 }}
              contentContainerStyle={{ padding: 10 }}>
              {todayTasks.length > 0 ? todayTasks?.map((v, i) => {

                let bg = primary;
                let textColor = '#000000';
                if (v.completed === true) bg = green;
                else if (v.important === true) {
                  bg = danger;
                  textColor = '#FFFFFF';
                }

                return (
                  <TouchableOpacity
                    key={i + Date.now()} style={{ ...styles.taskCard, backgroundColor: bg, position: 'relative' }}>
                    <Text style={{ ...styles.taskName, color: textColor }}>{new Date(v.date).toLocaleString()}</Text>
                    <Text style={{ marginVertical: 10, color: textColor }}>
                      {v.description.length > 100 ? v.description.slice(0, 100) + "..." : v.description}
                    </Text>
                    {v.completed !== true ?
                      <Progress.Bar
                        color='#FFFFFF'
                        style={{ position: 'absolute', bottom: 0, left: 0 }} width={heightOfWindow - 20} progress={v.progress / 100} />
                      : <></>}

                  </TouchableOpacity>
                )
              })
            :
            <Text style={styles.textWhite}>
              You have nothing to do on this day!
            </Text>
            }
            </ScrollView>
          </View>
        </View>
      </Modal>


      <Text style={styles.headerText}>
        Hey there!
      </Text>
      <Text style={styles.headerText}>
        You have {pendingTasks} pending Goals.
      </Text>
      <View style={styles.listCont}>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Tasks', {
              type: 'today'
            })
          }}
          style={styles.listCard}>
          <Feather name="sun" size={24} color={yellow} />
          <Text style={styles.textWhite}>Today's Goals</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Tasks', {
              type: 'completed'
            })
          }}
          style={styles.listCard}>
          <Ionicons name="checkmark-done" size={24} color={green} />
          <Text style={styles.textWhite}>Completed Goals</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Tasks', {
              type: 'pending'
            })
          }}
          style={styles.listCard}>
          <MaterialCommunityIcons name="clock" size={24} color={warning} />
          <Text style={styles.textWhite}>Pending Goals</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Tasks', {
              type: 'important'
            })
          }}
          style={styles.listCard}>
          <FontAwesome5 name="exclamation-circle" size={24} color={danger} />
          <Text style={styles.textWhite}>Important Goals</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Tasks', {
              type: 'all'
            })
          }}
          style={styles.listCard}>
          <FontAwesome5 name="tasks" size={24} color={primary} />
          <Text style={styles.textWhite}>All Goals</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('About')}
        style={styles.listCard}>
        <AntDesign name="infocirlceo" size={24} color="white" />
        <Text style={styles.textWhite}>About</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen