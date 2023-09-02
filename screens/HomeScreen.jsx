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
import { Calendar, LocaleConfig } from 'react-native-calendars';

const HomeScreen = ({ navigation, route }) => {
  const tasks = useSelector(s => s.taskReducer.tasks);
  const pendingTasks = tasks.filter(t => t.completed !== true).length;
  const [selected, setSelected] = useState('');
  return (
    <View style={styles.homeCont}>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
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