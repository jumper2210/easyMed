const PUSH_ENDPOINT = "http://192.168.1.12:8080/pushNotifications/message"

const sendPushNotificationToServer = async (patientName) => {
  return fetch(PUSH_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: `Patient ${patientName} made a medical case!`,
      body: "Go ahead, contact him",
    }),
  })
}
export default sendPushNotificationToServer
