import { logToConsole } from "./console";
import { Toy } from "./toy";
import * as Message from "./schema/messages";
function main() {
  logToConsole("Console:");
  new Toy("element-grid");
  let messageOkError: Message.Message = {
    Ok: { Id: 1 },
    Error: { Id: 2, ErrorCode: 1, ErrorMessage: "23" },
  };
  let messageAddDevice: Message.Message = {
    DeviceAdded: {
      Id: 1,
      DeviceDisplayName: "Device 1",
      DeviceIndex: 1,
      DeviceName: "Device 1 - plugin vibrator",
      DeviceMessageTimingGap: 122,
      DeviceMessages: {
        LinearCmd: [
          {
            ActuatorType: "vibrator",
            FeatureDescriptor: "Feat",
            StepCount: 10,
          },
          {
            ActuatorType: "vibrator",
            FeatureDescriptor: "Feat",
            StepCount: 10,
          },
          {
            ActuatorType: "vibrator",
            FeatureDescriptor: "Feat",
            StepCount: 10,
          },
        ],
      },
    },
  };
  logToConsole("Message: " + JSON.stringify(messageOkError));
  logToConsole("_");
  logToConsole("Message: " + JSON.stringify(messageAddDevice));
  // logToConsole(
  //   JSON.stringify(
  //     JSON.stringify(messageAddDevice) + JSON.stringify(messageAddDevice)
  //   )
  // );
}

main();
