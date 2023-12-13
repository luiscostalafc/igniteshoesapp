import { OneSignal } from "react-native-onesignal";

export function tabUserInfoCreate() {
  OneSignal.User.addTags({
    user_name: "Luis",
    user_email: "luiscostalafc@gmail.com",
  });
}
