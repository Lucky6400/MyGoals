import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../styles/style'
import { Feather } from '@expo/vector-icons';
import { danger, green, primary, warning, yellow } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation, route }) => {
  return (
    <View style={styles.homeCont}>
      <Text style={styles.headerText}>
        Hey there, Lucky!
      </Text>
      <Text style={styles.headerText}>
        You have 0 pending tasks.
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

      <TouchableOpacity style={styles.listCard}>
        <Feather name="settings" size={24} color="gray" />
        <Text style={styles.textWhite}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.listCard}>
        <AntDesign name="infocirlceo" size={24} color="white" />
        <Text style={styles.textWhite}>About</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen