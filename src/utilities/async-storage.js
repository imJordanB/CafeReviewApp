import AsyncStorage from '@react-native-async-storage/async-storage'

const getUserIdAndAuthToken = async () => {
  return {
    userId: this.getUserId(),
    authToken: this.getAuthToken()
  }
}

const getUserId = async () => {
  return await AsyncStorage.getItem('user-id')
}

const getAuthToken = async () => {
  return await AsyncStorage.getItem('auth-token')
}

module.exports = {
  getUserIdAndAuthToken: getUserIdAndAuthToken,
  getUserId: getUserId,
  getAuthToken: getAuthToken
}
