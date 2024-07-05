/**The idea of using this code exactly on typescript is to make the weakest
 *  point of validation of incoming json via schema.ts. All functional web
 *  code can be done in js without any hesitation.  */
// import * as bs from "./schema";
// import { Message } from "./schema";

// export function handleScalarCmd(message: Message) {
//   console.log("Received scalar: ", message.ScalarCmd.Scalars[0].Scalar);
//   plug_vibration_level = message.ScalarCmd.Scalars[0].Scalar;
//   // infinite shaking animation
//   document.getElementById("plug").style.animation = `shake ${
//     (1 - plug_vibration_level) / 2
//   }s infinite`;
// }

// export function handleStopCmd(message: Message) {
//   console.log("Received stop command");
//   plug_vibration_level = 0;
//   // stop shaking animation
//   document.getElementById("plug").style.animation = "";
// }
