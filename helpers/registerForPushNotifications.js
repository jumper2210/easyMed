import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { currentIp } from '../helpers/currentIp'

const PUSH_ENDPOINT = `${currentIp}/pushNotifications/token`

const registerForPushNotifications = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  if (status !== 'granted') {
    alert('No notification permissions!')
    return
  }
  let token = (await Notifications.getExpoPushTokenAsync()).data
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
    }),
  })
}
export default registerForPushNotifications
