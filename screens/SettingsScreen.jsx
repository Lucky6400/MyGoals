import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../styles/style'

const SettingsScreen = () => {
  return (
    <View style={styles.homeCont}>
      <TouchableOpacity>
        <Text style={{ ...styles.textWhite, paddingHorizontal: 10 }}>Profile settings</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SettingsScreen