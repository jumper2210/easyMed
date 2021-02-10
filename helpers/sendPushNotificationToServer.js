import { currentIp } from '../helpers/currentIp'

const PUSH_ENDPOINT = `${currentIp}/pushNotifications/message`

const sendPushNotificationToServer = async (patientName) => {
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: `Pacjent ${patientName} stworzył przypadek medyczny!`,
      body: 'Skontaktuj się z nim!',
    }),
  })
}
export default sendPushNotificationToServer
