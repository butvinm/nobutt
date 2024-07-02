/**
 * The JSON Protocol format for the Buttplug Protocol.
 */
export type ButtplugMessageSchema =
  | [
      {
        /**
         * List of all available devices known to the system.
         */
        DeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Array of device ids and names.
           */
          Devices: {
            /**
             * Name of the device
             */
            DeviceName: string;
            /**
             * Index used for referencing the device in device messages.
             */
            DeviceIndex: number;
            DeviceDisplayName?: string;
            DeviceMessageTimingGap?: number;
            /**
             * A list of the messages a device will accept on this server implementation.
             */
            DeviceMessages: {
              /**
               * Attributes for device message that have no attributes.
               */
              StopDeviceCmd?: {};
              ScalarCmd?: [
                {
                  FeatureDescriptor?: string;
                  /**
                   * Specifies granularity of each feature on the device.
                   */
                  StepCount?: number;
                  /**
                   * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
                   */
                  ActuatorType?: string;
                },
                ...{
                  FeatureDescriptor?: string;
                  /**
                   * Specifies granularity of each feature on the device.
                   */
                  StepCount?: number;
                  /**
                   * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
                   */
                  ActuatorType?: string;
                }[]
              ];
              LinearCmd?: {
                FeatureDescriptor?: string;
                /**
                 * Specifies granularity of each feature on the device.
                 */
                StepCount?: number;
                /**
                 * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
                 */
                ActuatorType?: string;
              }[];
              RotateCmd?: {
                FeatureDescriptor?: string;
                /**
                 * Specifies granularity of each feature on the device.
                 */
                StepCount?: number;
                /**
                 * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
                 */
                ActuatorType?: string;
              }[];
              SensorReadCmd?: {
                SensorType: string;
                FeatureDescriptor: string;
                SensorRange: [number[], ...number[][]];
              }[];
              SensorSubscribeCmd?: {
                SensorType: string;
                FeatureDescriptor: string;
                SensorRange: [number[], ...number[][]];
              }[];
              /**
               * Attributes for raw device messages.
               */
              RawReadCmd?: {
                Endpoints?: [string, ...string[]];
              };
              /**
               * Attributes for raw device messages.
               */
              RawWriteCmd?: {
                Endpoints?: [string, ...string[]];
              };
              /**
               * Attributes for raw device messages.
               */
              RawSubscribeCmd?: {
                Endpoints?: [string, ...string[]];
              };
            };
          }[];
        };
        /**
         * Notifies client that a device of a certain type has been added to the server.
         */
        DeviceAdded?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Name of the device
           */
          DeviceName: string;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          DeviceDisplayName?: string;
          DeviceMessageTimingGap?: number;
          /**
           * A list of the messages a device will accept on this server implementation.
           */
          DeviceMessages: {
            /**
             * Attributes for device message that have no attributes.
             */
            StopDeviceCmd?: {};
            ScalarCmd?: [
              {
                FeatureDescriptor?: string;
                /**
                 * Specifies granularity of each feature on the device.
                 */
                StepCount?: number;
                /**
                 * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
                 */
                ActuatorType?: string;
              },
              ...{
                FeatureDescriptor?: string;
                /**
                 * Specifies granularity of each feature on the device.
                 */
                StepCount?: number;
                /**
                 * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
                 */
                ActuatorType?: string;
              }[]
            ];
            LinearCmd?: {
              FeatureDescriptor?: string;
              /**
               * Specifies granularity of each feature on the device.
               */
              StepCount?: number;
              /**
               * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
               */
              ActuatorType?: string;
            }[];
            RotateCmd?: {
              FeatureDescriptor?: string;
              /**
               * Specifies granularity of each feature on the device.
               */
              StepCount?: number;
              /**
               * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
               */
              ActuatorType?: string;
            }[];
            SensorReadCmd?: {
              SensorType: string;
              FeatureDescriptor: string;
              SensorRange: [number[], ...number[][]];
            }[];
            SensorSubscribeCmd?: {
              SensorType: string;
              FeatureDescriptor: string;
              SensorRange: [number[], ...number[][]];
            }[];
            /**
             * Attributes for raw device messages.
             */
            RawReadCmd?: {
              Endpoints?: [string, ...string[]];
            };
            /**
             * Attributes for raw device messages.
             */
            RawWriteCmd?: {
              Endpoints?: [string, ...string[]];
            };
            /**
             * Attributes for raw device messages.
             */
            RawSubscribeCmd?: {
              Endpoints?: [string, ...string[]];
            };
          };
        };
        /**
         * Notifies client that a device of a certain type has been removed from the server.
         */
        DeviceRemoved?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Signifies the server encountered an error while processing the message indicated by the id.
         */
        Error?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          ErrorMessage: string;
          ErrorCode: number;
        };
        /**
         * Sends a generic scalar command to a device.
         */
        ScalarCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device actution scalar (floating point, range can vary) keyed on acutator index, stepping will be device specific.
           */
          Scalars: [
            {
              /**
               * Actuator index.
               */
              Index: number;
              /**
               * Actuator scalar (floating point, range can vary), stepping will be device specific.
               */
              Scalar: number;
              /**
               * Actuator type that is expected to be controlled with this subcommand.
               */
              ActuatorType: string;
            },
            ...{
              /**
               * Actuator index.
               */
              Index: number;
              /**
               * Actuator scalar (floating point, range can vary), stepping will be device specific.
               */
              Scalar: number;
              /**
               * Actuator type that is expected to be controlled with this subcommand.
               */
              ActuatorType: string;
            }[]
          ];
        };
        /**
         * Sends a linear movement command to a device that supports linear movements.
         */
        LinearCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device linear movement times (milliseconds) and positions (floating point, 0 < x < 1) keyed on linear actuator number, stepping will be device specific.
           */
          Vectors: {
            /**
             * Linear actuator number.
             */
            Index: number;
            /**
             * Linear movement time in milliseconds.
             */
            Duration: number;
            /**
             * Linear movement position (floating point, 0 < x < 1), stepping will be device specific.
             */
            Position: number;
          }[];
        };
        /**
         * Signifies successful processing of the message indicated by the id.
         */
        Ok?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Connection keep-alive message.
         */
        Ping?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request a raw byte array from a device. Should only be used for testing/development.
         */
        RawReadCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
          /**
           * Amount of data to read from device, 0 to exhaust whatever is in immediate buffer
           */
          Length: number;
          /**
           * If true, then wait until Length amount of data is available.
           */
          WaitForData: boolean;
        };
        /**
         * Raw byte array received from a device. Should only be used for testing/development.
         */
        RawReading?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
          /**
           * Raw byte string received from device.
           */
          Data: [number, ...number[]];
        };
        /**
         * Sends a raw byte array to a device. Should only be used for testing/development.
         */
        RawWriteCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) to send command to.
           */
          Endpoint: string;
          /**
           * Raw byte string to send to device.
           */
          Data: [number, ...number[]];
          /**
           * If true, BLE writes will use WriteWithResponse. Value ignored for all other types.
           */
          WriteWithResponse: boolean;
        };
        /**
         * Subscribe to an endpoint on a device to receive raw info back.
         */
        RawSubscribeCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
        };
        /**
         * Unsubscribe to an endpoint on a device.
         */
        RawUnsubscribeCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
        };
        /**
         * Request for the server to send a list of devices to the client.
         */
        RequestDeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request server version, and relay client name.
         */
        RequestServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the client software.
           */
          ClientName: string;
          /**
           * Message template version of the client software.
           */
          MessageVersion: number;
        };
        /**
         * Sends a rotate command to a device that supports rotation.
         */
        RotateCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device rotation speeds (floating point, 0 < x < 1) keyed on rotator number, stepping will be device specific.
           */
          Rotations: [
            {
              /**
               * Rotator number.
               */
              Index: number;
              /**
               * Rotation speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
              /**
               * Rotation direction (boolean). Not all devices have a concept of actual clockwise.
               */
              Clockwise: boolean;
            },
            ...{
              /**
               * Rotator number.
               */
              Index: number;
              /**
               * Rotation speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
              /**
               * Rotation direction (boolean). Not all devices have a concept of actual clockwise.
               */
              Clockwise: boolean;
            }[]
          ];
        };
        /**
         * Server notification to client that scanning has ended.
         */
        ScanningFinished?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
        };
        /**
         * Sends a request to read a sensor value.
         */
        SensorReadCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          SensorIndex: number;
          SensorType: string;
        };
        /**
         * Returns from either a sensor read request or a subscribed sensor event.
         */
        SensorReading?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          SensorIndex: number;
          SensorType: string;
          Data: number[];
        };
        /**
         * Sends a request to subscribe for updates to a sensor value.
         */
        SensorSubscribeCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          SensorIndex: number;
          SensorType: string;
        };
        /**
         * Sends a request to subscribe for updates to a sensor value.
         */
        SensorUnsubscribeCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          SensorIndex: number;
          SensorType: string;
        };
        /**
         * Server version information, in Major.Minor.Build format.
         */
        ServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the server. Can be 0-length.
           */
          ServerName: string;
          /**
           * Message template version of the server software.
           */
          MessageVersion: number;
          /**
           * Maximum time (in milliseconds) the server will wait between ping messages from client before shutting down.
           */
          MaxPingTime: number;
        };
        /**
         * Request for the server to start scanning for new devices.
         */
        StartScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops all actions currently being taken by all connected devices.
         */
        StopAllDevices?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops the all actions currently being taken by a device.
         */
        StopDeviceCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Request for the server to stop scanning for new devices.
         */
        StopScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
      },
      ...{
        /**
         * List of all available devices known to the system.
         */
        DeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Array of device ids and names.
           */
          Devices: {
            /**
             * Name of the device
             */
            DeviceName: string;
            /**
             * Index used for referencing the device in device messages.
             */
            DeviceIndex: number;
            DeviceDisplayName?: string;
            DeviceMessageTimingGap?: number;
            /**
             * A list of the messages a device will accept on this server implementation.
             */
            DeviceMessages: {
              /**
               * Attributes for device message that have no attributes.
               */
              StopDeviceCmd?: {};
              ScalarCmd?: [
                {
                  FeatureDescriptor?: string;
                  /**
                   * Specifies granularity of each feature on the device.
                   */
                  StepCount?: number;
                  /**
                   * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
                   */
                  ActuatorType?: string;
                },
                ...{
                  FeatureDescriptor?: string;
                  /**
                   * Specifies granularity of each feature on the device.
                   */
                  StepCount?: number;
                  /**
                   * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
                   */
                  ActuatorType?: string;
                }[]
              ];
              LinearCmd?: {
                FeatureDescriptor?: string;
                /**
                 * Specifies granularity of each feature on the device.
                 */
                StepCount?: number;
                /**
                 * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
                 */
                ActuatorType?: string;
              }[];
              RotateCmd?: {
                FeatureDescriptor?: string;
                /**
                 * Specifies granularity of each feature on the device.
                 */
                StepCount?: number;
                /**
                 * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
                 */
                ActuatorType?: string;
              }[];
              SensorReadCmd?: {
                SensorType: string;
                FeatureDescriptor: string;
                SensorRange: [number[], ...number[][]];
              }[];
              SensorSubscribeCmd?: {
                SensorType: string;
                FeatureDescriptor: string;
                SensorRange: [number[], ...number[][]];
              }[];
              /**
               * Attributes for raw device messages.
               */
              RawReadCmd?: {
                Endpoints?: [string, ...string[]];
              };
              /**
               * Attributes for raw device messages.
               */
              RawWriteCmd?: {
                Endpoints?: [string, ...string[]];
              };
              /**
               * Attributes for raw device messages.
               */
              RawSubscribeCmd?: {
                Endpoints?: [string, ...string[]];
              };
            };
          }[];
        };
        /**
         * Notifies client that a device of a certain type has been added to the server.
         */
        DeviceAdded?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Name of the device
           */
          DeviceName: string;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          DeviceDisplayName?: string;
          DeviceMessageTimingGap?: number;
          /**
           * A list of the messages a device will accept on this server implementation.
           */
          DeviceMessages: {
            /**
             * Attributes for device message that have no attributes.
             */
            StopDeviceCmd?: {};
            ScalarCmd?: [
              {
                FeatureDescriptor?: string;
                /**
                 * Specifies granularity of each feature on the device.
                 */
                StepCount?: number;
                /**
                 * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
                 */
                ActuatorType?: string;
              },
              ...{
                FeatureDescriptor?: string;
                /**
                 * Specifies granularity of each feature on the device.
                 */
                StepCount?: number;
                /**
                 * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
                 */
                ActuatorType?: string;
              }[]
            ];
            LinearCmd?: {
              FeatureDescriptor?: string;
              /**
               * Specifies granularity of each feature on the device.
               */
              StepCount?: number;
              /**
               * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
               */
              ActuatorType?: string;
            }[];
            RotateCmd?: {
              FeatureDescriptor?: string;
              /**
               * Specifies granularity of each feature on the device.
               */
              StepCount?: number;
              /**
               * Denotes type of actuator (Vibrator, Linear, Oscillator, etc...)
               */
              ActuatorType?: string;
            }[];
            SensorReadCmd?: {
              SensorType: string;
              FeatureDescriptor: string;
              SensorRange: [number[], ...number[][]];
            }[];
            SensorSubscribeCmd?: {
              SensorType: string;
              FeatureDescriptor: string;
              SensorRange: [number[], ...number[][]];
            }[];
            /**
             * Attributes for raw device messages.
             */
            RawReadCmd?: {
              Endpoints?: [string, ...string[]];
            };
            /**
             * Attributes for raw device messages.
             */
            RawWriteCmd?: {
              Endpoints?: [string, ...string[]];
            };
            /**
             * Attributes for raw device messages.
             */
            RawSubscribeCmd?: {
              Endpoints?: [string, ...string[]];
            };
          };
        };
        /**
         * Notifies client that a device of a certain type has been removed from the server.
         */
        DeviceRemoved?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Signifies the server encountered an error while processing the message indicated by the id.
         */
        Error?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          ErrorMessage: string;
          ErrorCode: number;
        };
        /**
         * Sends a generic scalar command to a device.
         */
        ScalarCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device actution scalar (floating point, range can vary) keyed on acutator index, stepping will be device specific.
           */
          Scalars: [
            {
              /**
               * Actuator index.
               */
              Index: number;
              /**
               * Actuator scalar (floating point, range can vary), stepping will be device specific.
               */
              Scalar: number;
              /**
               * Actuator type that is expected to be controlled with this subcommand.
               */
              ActuatorType: string;
            },
            ...{
              /**
               * Actuator index.
               */
              Index: number;
              /**
               * Actuator scalar (floating point, range can vary), stepping will be device specific.
               */
              Scalar: number;
              /**
               * Actuator type that is expected to be controlled with this subcommand.
               */
              ActuatorType: string;
            }[]
          ];
        };
        /**
         * Sends a linear movement command to a device that supports linear movements.
         */
        LinearCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device linear movement times (milliseconds) and positions (floating point, 0 < x < 1) keyed on linear actuator number, stepping will be device specific.
           */
          Vectors: {
            /**
             * Linear actuator number.
             */
            Index: number;
            /**
             * Linear movement time in milliseconds.
             */
            Duration: number;
            /**
             * Linear movement position (floating point, 0 < x < 1), stepping will be device specific.
             */
            Position: number;
          }[];
        };
        /**
         * Signifies successful processing of the message indicated by the id.
         */
        Ok?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Connection keep-alive message.
         */
        Ping?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request a raw byte array from a device. Should only be used for testing/development.
         */
        RawReadCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
          /**
           * Amount of data to read from device, 0 to exhaust whatever is in immediate buffer
           */
          Length: number;
          /**
           * If true, then wait until Length amount of data is available.
           */
          WaitForData: boolean;
        };
        /**
         * Raw byte array received from a device. Should only be used for testing/development.
         */
        RawReading?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
          /**
           * Raw byte string received from device.
           */
          Data: [number, ...number[]];
        };
        /**
         * Sends a raw byte array to a device. Should only be used for testing/development.
         */
        RawWriteCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) to send command to.
           */
          Endpoint: string;
          /**
           * Raw byte string to send to device.
           */
          Data: [number, ...number[]];
          /**
           * If true, BLE writes will use WriteWithResponse. Value ignored for all other types.
           */
          WriteWithResponse: boolean;
        };
        /**
         * Subscribe to an endpoint on a device to receive raw info back.
         */
        RawSubscribeCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
        };
        /**
         * Unsubscribe to an endpoint on a device.
         */
        RawUnsubscribeCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
        };
        /**
         * Request for the server to send a list of devices to the client.
         */
        RequestDeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request server version, and relay client name.
         */
        RequestServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the client software.
           */
          ClientName: string;
          /**
           * Message template version of the client software.
           */
          MessageVersion: number;
        };
        /**
         * Sends a rotate command to a device that supports rotation.
         */
        RotateCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device rotation speeds (floating point, 0 < x < 1) keyed on rotator number, stepping will be device specific.
           */
          Rotations: [
            {
              /**
               * Rotator number.
               */
              Index: number;
              /**
               * Rotation speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
              /**
               * Rotation direction (boolean). Not all devices have a concept of actual clockwise.
               */
              Clockwise: boolean;
            },
            ...{
              /**
               * Rotator number.
               */
              Index: number;
              /**
               * Rotation speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
              /**
               * Rotation direction (boolean). Not all devices have a concept of actual clockwise.
               */
              Clockwise: boolean;
            }[]
          ];
        };
        /**
         * Server notification to client that scanning has ended.
         */
        ScanningFinished?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
        };
        /**
         * Sends a request to read a sensor value.
         */
        SensorReadCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          SensorIndex: number;
          SensorType: string;
        };
        /**
         * Returns from either a sensor read request or a subscribed sensor event.
         */
        SensorReading?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          SensorIndex: number;
          SensorType: string;
          Data: number[];
        };
        /**
         * Sends a request to subscribe for updates to a sensor value.
         */
        SensorSubscribeCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          SensorIndex: number;
          SensorType: string;
        };
        /**
         * Sends a request to subscribe for updates to a sensor value.
         */
        SensorUnsubscribeCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          SensorIndex: number;
          SensorType: string;
        };
        /**
         * Server version information, in Major.Minor.Build format.
         */
        ServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the server. Can be 0-length.
           */
          ServerName: string;
          /**
           * Message template version of the server software.
           */
          MessageVersion: number;
          /**
           * Maximum time (in milliseconds) the server will wait between ping messages from client before shutting down.
           */
          MaxPingTime: number;
        };
        /**
         * Request for the server to start scanning for new devices.
         */
        StartScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops all actions currently being taken by all connected devices.
         */
        StopAllDevices?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops the all actions currently being taken by a device.
         */
        StopDeviceCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Request for the server to stop scanning for new devices.
         */
        StopScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
      }[]
    ]
  | [
      {
        /**
         * Requests that a BatteryLevel be retreived.
         */
        BatteryLevelCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Returns a BatteryLevel read from a device.
         */
        BatteryLevelReading?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Battery Level
           */
          BatteryLevel: number;
        };
        /**
         * List of all available devices known to the system.
         */
        DeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Array of device ids and names.
           */
          Devices: {
            /**
             * Name of the device
             */
            DeviceName: string;
            /**
             * Index used for referencing the device in device messages.
             */
            DeviceIndex: number;
            /**
             * A list of the messages a device will accept on this server implementation.
             */
            DeviceMessages: {
              /**
               * Attributes for device message that have no attributes.
               */
              StopDeviceCmd?: {};
              /**
               * Attributes for device messages.
               */
              VibrateCmd?: {
                /**
                 * Number of features on device.
                 */
                FeatureCount?: number;
                /**
                 * Specifies granularity of each feature on the device.
                 */
                StepCount?: [number, ...number[]];
              };
              /**
               * Attributes for device messages.
               */
              LinearCmd?: {
                /**
                 * Number of features on device.
                 */
                FeatureCount?: number;
                /**
                 * Specifies granularity of each feature on the device.
                 */
                StepCount?: [number, ...number[]];
              };
              /**
               * Attributes for device messages.
               */
              RotateCmd?: {
                /**
                 * Number of features on device.
                 */
                FeatureCount?: number;
                /**
                 * Specifies granularity of each feature on the device.
                 */
                StepCount?: [number, ...number[]];
              };
              /**
               * Attributes for device message that have no attributes.
               */
              BatteryLevelCmd?: {};
              /**
               * Attributes for device message that have no attributes.
               */
              RSSILevelCmd?: {};
              /**
               * Attributes for raw device messages.
               */
              RawReadCmd?: {
                Endpoints?: [string, ...string[]];
              };
              /**
               * Attributes for raw device messages.
               */
              RawWriteCmd?: {
                Endpoints?: [string, ...string[]];
              };
              /**
               * Attributes for raw device messages.
               */
              RawSubscribeCmd?: {
                Endpoints?: [string, ...string[]];
              };
              /**
               * Attributes for raw device messages.
               */
              RawUnsubscribeCmd?: {
                Endpoints?: [string, ...string[]];
              };
            };
          }[];
        };
        /**
         * Notifies client that a device of a certain type has been added to the server.
         */
        DeviceAdded?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Name of the device
           */
          DeviceName: string;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * A list of the messages a device will accept on this server implementation.
           */
          DeviceMessages: {
            /**
             * Attributes for device message that have no attributes.
             */
            StopDeviceCmd?: {};
            /**
             * Attributes for device messages.
             */
            VibrateCmd?: {
              /**
               * Number of features on device.
               */
              FeatureCount?: number;
              /**
               * Specifies granularity of each feature on the device.
               */
              StepCount?: [number, ...number[]];
            };
            /**
             * Attributes for device messages.
             */
            LinearCmd?: {
              /**
               * Number of features on device.
               */
              FeatureCount?: number;
              /**
               * Specifies granularity of each feature on the device.
               */
              StepCount?: [number, ...number[]];
            };
            /**
             * Attributes for device messages.
             */
            RotateCmd?: {
              /**
               * Number of features on device.
               */
              FeatureCount?: number;
              /**
               * Specifies granularity of each feature on the device.
               */
              StepCount?: [number, ...number[]];
            };
            /**
             * Attributes for device message that have no attributes.
             */
            BatteryLevelCmd?: {};
            /**
             * Attributes for device message that have no attributes.
             */
            RSSILevelCmd?: {};
            /**
             * Attributes for raw device messages.
             */
            RawReadCmd?: {
              Endpoints?: [string, ...string[]];
            };
            /**
             * Attributes for raw device messages.
             */
            RawWriteCmd?: {
              Endpoints?: [string, ...string[]];
            };
            /**
             * Attributes for raw device messages.
             */
            RawSubscribeCmd?: {
              Endpoints?: [string, ...string[]];
            };
            /**
             * Attributes for raw device messages.
             */
            RawUnsubscribeCmd?: {
              Endpoints?: [string, ...string[]];
            };
          };
        };
        /**
         * Notifies client that a device of a certain type has been removed from the server.
         */
        DeviceRemoved?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Signifies the server encountered an error while processing the message indicated by the id.
         */
        Error?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          ErrorMessage: string;
          ErrorCode: number;
        };
        /**
         * Sends a linear movement command to a device that supports linear movements.
         */
        LinearCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device linear movement times (milliseconds) and positions (floating point, 0 < x < 1) keyed on linear actuator number, stepping will be device specific.
           */
          Vectors: {
            /**
             * Linear actuator number.
             */
            Index: number;
            /**
             * Linear movement time in milliseconds.
             */
            Duration: number;
            /**
             * Linear movement position (floating point, 0 < x < 1), stepping will be device specific.
             */
            Position: number;
          }[];
        };
        /**
         * Signifies successful processing of the message indicated by the id.
         */
        Ok?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Connection keep-alive message.
         */
        Ping?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request a raw byte array from a device. Should only be used for testing/development.
         */
        RawReadCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
          /**
           * Amount of data to read from device, 0 to exhaust whatever is in immediate buffer
           */
          Length: number;
          /**
           * If true, then wait until Length amount of data is available.
           */
          WaitForData: boolean;
        };
        /**
         * Raw byte array received from a device. Should only be used for testing/development.
         */
        RawReading?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
          /**
           * Raw byte string received from device.
           */
          Data: [number, ...number[]];
        };
        /**
         * Sends a raw byte array to a device. Should only be used for testing/development.
         */
        RawWriteCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) to send command to.
           */
          Endpoint: string;
          /**
           * Raw byte string to send to device.
           */
          Data: [number, ...number[]];
          /**
           * If true, BLE writes will use WriteWithResponse. Value ignored for all other types.
           */
          WriteWithResponse: boolean;
        };
        /**
         * Subscribe to an endpoint on a device to receive raw info back.
         */
        RawSubscribeCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
        };
        /**
         * Unsubscribe to an endpoint on a device.
         */
        RawUnsubscribeCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
        };
        /**
         * Request for the server to send a list of devices to the client.
         */
        RequestDeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request for server to stream log messages of a certain level to client.
         */
        RequestLog?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Maximum level of log message to receive.
           */
          LogLevel:
            | "Off"
            | "Fatal"
            | "Error"
            | "Warn"
            | "Info"
            | "Debug"
            | "Trace";
        };
        /**
         * Request server version, and relay client name.
         */
        RequestServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the client software.
           */
          ClientName: string;
          /**
           * Message template version of the client software.
           */
          MessageVersion: number;
        };
        /**
         * Sends a rotate command to a device that supports rotation.
         */
        RotateCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device rotation speeds (floating point, 0 < x < 1) keyed on rotator number, stepping will be device specific.
           */
          Rotations: [
            {
              /**
               * Rotator number.
               */
              Index: number;
              /**
               * Rotation speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
              /**
               * Rotation direction (boolean). Not all devices have a concept of actual clockwise.
               */
              Clockwise: boolean;
            },
            ...{
              /**
               * Rotator number.
               */
              Index: number;
              /**
               * Rotation speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
              /**
               * Rotation direction (boolean). Not all devices have a concept of actual clockwise.
               */
              Clockwise: boolean;
            }[]
          ];
        };
        /**
         * Requests that a RSSI level be retreived.
         */
        RSSILevelCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Returns a BatteryLevel read from a device.
         */
        RSSILevelReading?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * RSSI Level
           */
          RSSILevel: number;
        };
        /**
         * Server notification to client that scanning has ended.
         */
        ScanningFinished?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
        };
        /**
         * Server version information, in Major.Minor.Build format.
         */
        ServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the server. Can be 0-length.
           */
          ServerName: string;
          /**
           * Message template version of the server software.
           */
          MessageVersion: number;
          /**
           * Maximum time (in milliseconds) the server will wait between ping messages from client before shutting down.
           */
          MaxPingTime: number;
        };
        /**
         * Request for the server to start scanning for new devices.
         */
        StartScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops all actions currently being taken by all connected devices.
         */
        StopAllDevices?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops the all actions currently being taken by a device.
         */
        StopDeviceCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Request for the server to stop scanning for new devices.
         */
        StopScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Sends a vibrate command to a device that supports vibration.
         */
        VibrateCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device vibration speeds (floating point, 0 < x < 1) keyed on vibrator number, stepping will be device specific.
           */
          Speeds: [
            {
              /**
               * Vibrator number.
               */
              Index: number;
              /**
               * Vibration speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
            },
            ...{
              /**
               * Vibrator number.
               */
              Index: number;
              /**
               * Vibration speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
            }[]
          ];
        };
      },
      ...{
        /**
         * Requests that a BatteryLevel be retreived.
         */
        BatteryLevelCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Returns a BatteryLevel read from a device.
         */
        BatteryLevelReading?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Battery Level
           */
          BatteryLevel: number;
        };
        /**
         * List of all available devices known to the system.
         */
        DeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Array of device ids and names.
           */
          Devices: {
            /**
             * Name of the device
             */
            DeviceName: string;
            /**
             * Index used for referencing the device in device messages.
             */
            DeviceIndex: number;
            /**
             * A list of the messages a device will accept on this server implementation.
             */
            DeviceMessages: {
              /**
               * Attributes for device message that have no attributes.
               */
              StopDeviceCmd?: {};
              /**
               * Attributes for device messages.
               */
              VibrateCmd?: {
                /**
                 * Number of features on device.
                 */
                FeatureCount?: number;
                /**
                 * Specifies granularity of each feature on the device.
                 */
                StepCount?: [number, ...number[]];
              };
              /**
               * Attributes for device messages.
               */
              LinearCmd?: {
                /**
                 * Number of features on device.
                 */
                FeatureCount?: number;
                /**
                 * Specifies granularity of each feature on the device.
                 */
                StepCount?: [number, ...number[]];
              };
              /**
               * Attributes for device messages.
               */
              RotateCmd?: {
                /**
                 * Number of features on device.
                 */
                FeatureCount?: number;
                /**
                 * Specifies granularity of each feature on the device.
                 */
                StepCount?: [number, ...number[]];
              };
              /**
               * Attributes for device message that have no attributes.
               */
              BatteryLevelCmd?: {};
              /**
               * Attributes for device message that have no attributes.
               */
              RSSILevelCmd?: {};
              /**
               * Attributes for raw device messages.
               */
              RawReadCmd?: {
                Endpoints?: [string, ...string[]];
              };
              /**
               * Attributes for raw device messages.
               */
              RawWriteCmd?: {
                Endpoints?: [string, ...string[]];
              };
              /**
               * Attributes for raw device messages.
               */
              RawSubscribeCmd?: {
                Endpoints?: [string, ...string[]];
              };
              /**
               * Attributes for raw device messages.
               */
              RawUnsubscribeCmd?: {
                Endpoints?: [string, ...string[]];
              };
            };
          }[];
        };
        /**
         * Notifies client that a device of a certain type has been added to the server.
         */
        DeviceAdded?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Name of the device
           */
          DeviceName: string;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * A list of the messages a device will accept on this server implementation.
           */
          DeviceMessages: {
            /**
             * Attributes for device message that have no attributes.
             */
            StopDeviceCmd?: {};
            /**
             * Attributes for device messages.
             */
            VibrateCmd?: {
              /**
               * Number of features on device.
               */
              FeatureCount?: number;
              /**
               * Specifies granularity of each feature on the device.
               */
              StepCount?: [number, ...number[]];
            };
            /**
             * Attributes for device messages.
             */
            LinearCmd?: {
              /**
               * Number of features on device.
               */
              FeatureCount?: number;
              /**
               * Specifies granularity of each feature on the device.
               */
              StepCount?: [number, ...number[]];
            };
            /**
             * Attributes for device messages.
             */
            RotateCmd?: {
              /**
               * Number of features on device.
               */
              FeatureCount?: number;
              /**
               * Specifies granularity of each feature on the device.
               */
              StepCount?: [number, ...number[]];
            };
            /**
             * Attributes for device message that have no attributes.
             */
            BatteryLevelCmd?: {};
            /**
             * Attributes for device message that have no attributes.
             */
            RSSILevelCmd?: {};
            /**
             * Attributes for raw device messages.
             */
            RawReadCmd?: {
              Endpoints?: [string, ...string[]];
            };
            /**
             * Attributes for raw device messages.
             */
            RawWriteCmd?: {
              Endpoints?: [string, ...string[]];
            };
            /**
             * Attributes for raw device messages.
             */
            RawSubscribeCmd?: {
              Endpoints?: [string, ...string[]];
            };
            /**
             * Attributes for raw device messages.
             */
            RawUnsubscribeCmd?: {
              Endpoints?: [string, ...string[]];
            };
          };
        };
        /**
         * Notifies client that a device of a certain type has been removed from the server.
         */
        DeviceRemoved?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Signifies the server encountered an error while processing the message indicated by the id.
         */
        Error?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          ErrorMessage: string;
          ErrorCode: number;
        };
        /**
         * Sends a linear movement command to a device that supports linear movements.
         */
        LinearCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device linear movement times (milliseconds) and positions (floating point, 0 < x < 1) keyed on linear actuator number, stepping will be device specific.
           */
          Vectors: {
            /**
             * Linear actuator number.
             */
            Index: number;
            /**
             * Linear movement time in milliseconds.
             */
            Duration: number;
            /**
             * Linear movement position (floating point, 0 < x < 1), stepping will be device specific.
             */
            Position: number;
          }[];
        };
        /**
         * Signifies successful processing of the message indicated by the id.
         */
        Ok?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Connection keep-alive message.
         */
        Ping?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request a raw byte array from a device. Should only be used for testing/development.
         */
        RawReadCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
          /**
           * Amount of data to read from device, 0 to exhaust whatever is in immediate buffer
           */
          Length: number;
          /**
           * If true, then wait until Length amount of data is available.
           */
          WaitForData: boolean;
        };
        /**
         * Raw byte array received from a device. Should only be used for testing/development.
         */
        RawReading?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
          /**
           * Raw byte string received from device.
           */
          Data: [number, ...number[]];
        };
        /**
         * Sends a raw byte array to a device. Should only be used for testing/development.
         */
        RawWriteCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) to send command to.
           */
          Endpoint: string;
          /**
           * Raw byte string to send to device.
           */
          Data: [number, ...number[]];
          /**
           * If true, BLE writes will use WriteWithResponse. Value ignored for all other types.
           */
          WriteWithResponse: boolean;
        };
        /**
         * Subscribe to an endpoint on a device to receive raw info back.
         */
        RawSubscribeCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
        };
        /**
         * Unsubscribe to an endpoint on a device.
         */
        RawUnsubscribeCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Endpoint (from device config file) from which the data was retrieved.
           */
          Endpoint: string;
        };
        /**
         * Request for the server to send a list of devices to the client.
         */
        RequestDeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request for server to stream log messages of a certain level to client.
         */
        RequestLog?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Maximum level of log message to receive.
           */
          LogLevel:
            | "Off"
            | "Fatal"
            | "Error"
            | "Warn"
            | "Info"
            | "Debug"
            | "Trace";
        };
        /**
         * Request server version, and relay client name.
         */
        RequestServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the client software.
           */
          ClientName: string;
          /**
           * Message template version of the client software.
           */
          MessageVersion: number;
        };
        /**
         * Sends a rotate command to a device that supports rotation.
         */
        RotateCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device rotation speeds (floating point, 0 < x < 1) keyed on rotator number, stepping will be device specific.
           */
          Rotations: [
            {
              /**
               * Rotator number.
               */
              Index: number;
              /**
               * Rotation speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
              /**
               * Rotation direction (boolean). Not all devices have a concept of actual clockwise.
               */
              Clockwise: boolean;
            },
            ...{
              /**
               * Rotator number.
               */
              Index: number;
              /**
               * Rotation speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
              /**
               * Rotation direction (boolean). Not all devices have a concept of actual clockwise.
               */
              Clockwise: boolean;
            }[]
          ];
        };
        /**
         * Requests that a RSSI level be retreived.
         */
        RSSILevelCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Returns a BatteryLevel read from a device.
         */
        RSSILevelReading?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * RSSI Level
           */
          RSSILevel: number;
        };
        /**
         * Server notification to client that scanning has ended.
         */
        ScanningFinished?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
        };
        /**
         * Server version information, in Major.Minor.Build format.
         */
        ServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the server. Can be 0-length.
           */
          ServerName: string;
          /**
           * Message template version of the server software.
           */
          MessageVersion: number;
          /**
           * Maximum time (in milliseconds) the server will wait between ping messages from client before shutting down.
           */
          MaxPingTime: number;
        };
        /**
         * Request for the server to start scanning for new devices.
         */
        StartScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops all actions currently being taken by all connected devices.
         */
        StopAllDevices?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops the all actions currently being taken by a device.
         */
        StopDeviceCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Request for the server to stop scanning for new devices.
         */
        StopScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Sends a vibrate command to a device that supports vibration.
         */
        VibrateCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device vibration speeds (floating point, 0 < x < 1) keyed on vibrator number, stepping will be device specific.
           */
          Speeds: [
            {
              /**
               * Vibrator number.
               */
              Index: number;
              /**
               * Vibration speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
            },
            ...{
              /**
               * Vibrator number.
               */
              Index: number;
              /**
               * Vibration speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
            }[]
          ];
        };
      }[]
    ]
  | [
      {
        /**
         * List of all available devices known to the system.
         */
        DeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Array of device ids and names.
           */
          Devices: {
            /**
             * Name of the device
             */
            DeviceName: string;
            /**
             * Index used for referencing the device in device messages.
             */
            DeviceIndex: number;
            /**
             * A list of the messages a device will accept on this server implementation.
             */
            DeviceMessages: {
              /**
               * Attributes for device message that have no attributes.
               */
              StopDeviceCmd?: {};
              /**
               * Attributes for device messages.
               */
              VibrateCmd?: {
                /**
                 * Number of features on device.
                 */
                FeatureCount?: number;
              };
              /**
               * Attributes for device messages.
               */
              LinearCmd?: {
                /**
                 * Number of features on device.
                 */
                FeatureCount?: number;
              };
              /**
               * Attributes for device messages.
               */
              RotateCmd?: {
                /**
                 * Number of features on device.
                 */
                FeatureCount?: number;
              };
              /**
               * Attributes for device message that have no attributes.
               */
              LovenseCmd?: {};
              /**
               * Attributes for device message that have no attributes.
               */
              VorzeA10CycloneCmd?: {};
              /**
               * Attributes for device message that have no attributes.
               */
              KiirooCmd?: {};
              /**
               * Attributes for device message that have no attributes.
               */
              SingleMotorVibrateCmd?: {};
              /**
               * Attributes for device message that have no attributes.
               */
              FleshlightLaunchFW12Cmd?: {};
            };
          }[];
        };
        /**
         * Notifies client that a device of a certain type has been added to the server.
         */
        DeviceAdded?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Name of the device
           */
          DeviceName: string;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * A list of the messages a device will accept on this server implementation.
           */
          DeviceMessages: {
            /**
             * Attributes for device message that have no attributes.
             */
            StopDeviceCmd?: {};
            /**
             * Attributes for device messages.
             */
            VibrateCmd?: {
              /**
               * Number of features on device.
               */
              FeatureCount?: number;
            };
            /**
             * Attributes for device messages.
             */
            LinearCmd?: {
              /**
               * Number of features on device.
               */
              FeatureCount?: number;
            };
            /**
             * Attributes for device messages.
             */
            RotateCmd?: {
              /**
               * Number of features on device.
               */
              FeatureCount?: number;
            };
            /**
             * Attributes for device message that have no attributes.
             */
            LovenseCmd?: {};
            /**
             * Attributes for device message that have no attributes.
             */
            VorzeA10CycloneCmd?: {};
            /**
             * Attributes for device message that have no attributes.
             */
            KiirooCmd?: {};
            /**
             * Attributes for device message that have no attributes.
             */
            SingleMotorVibrateCmd?: {};
            /**
             * Attributes for device message that have no attributes.
             */
            FleshlightLaunchFW12Cmd?: {};
          };
        };
        /**
         * Notifies client that a device of a certain type has been removed from the server.
         */
        DeviceRemoved?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Signifies the server encountered an error while processing the message indicated by the id.
         */
        Error?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          ErrorMessage: string;
          ErrorCode: number;
        };
        /**
         * Sends speed and position command to the Fleshlight Launch Device denoted by the device index.
         */
        FleshlightLaunchFW12Cmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Speed at which to move to designated position.
           */
          Speed: number;
          /**
           * Position to which to move Fleshlight.
           */
          Position: number;
        };
        /**
         * Sends a raw byte string to a Kiiroo Onyx/Pearl device.
         */
        KiirooCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Command to send to Kiiroo device.
           */
          Command: string;
        };
        /**
         * Sends a linear movement command to a device that supports linear movements.
         */
        LinearCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device linear movement times (milliseconds) and positions (floating point, 0 < x < 1) keyed on linear actuator number, stepping will be device specific.
           */
          Vectors: {
            /**
             * Linear actuator number.
             */
            Index: number;
            /**
             * Linear movement time in milliseconds.
             */
            Duration: number;
            /**
             * Linear movement position (floating point, 0 < x < 1), stepping will be device specific.
             */
            Position: number;
          }[];
        };
        /**
         * Log message from the server.
         */
        Log?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Log level of message.
           */
          LogLevel:
            | "Off"
            | "Fatal"
            | "Error"
            | "Warn"
            | "Info"
            | "Debug"
            | "Trace";
          /**
           * Log message from server.
           */
          LogMessage: string;
        };
        /**
         * Signifies successful processing of the message indicated by the id.
         */
        Ok?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Connection keep-alive message.
         */
        Ping?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request for the server to send a list of devices to the client.
         */
        RequestDeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request for server to stream log messages of a certain level to client.
         */
        RequestLog?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Maximum level of log message to receive.
           */
          LogLevel:
            | "Off"
            | "Fatal"
            | "Error"
            | "Warn"
            | "Info"
            | "Debug"
            | "Trace";
        };
        /**
         * Request server version, and relay client name.
         */
        RequestServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the client software.
           */
          ClientName: string;
          /**
           * Message template version of the client software.
           */
          MessageVersion: number;
        };
        /**
         * Sends a rotate command to a device that supports rotation.
         */
        RotateCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device rotation speeds (floating point, 0 < x < 1) keyed on rotator number, stepping will be device specific.
           */
          Rotations: [
            {
              /**
               * Rotator number.
               */
              Index: number;
              /**
               * Rotation speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
              /**
               * Rotation direction (boolean). Not all devices have a concept of actual clockwise.
               */
              Clockwise: boolean;
            },
            ...{
              /**
               * Rotator number.
               */
              Index: number;
              /**
               * Rotation speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
              /**
               * Rotation direction (boolean). Not all devices have a concept of actual clockwise.
               */
              Clockwise: boolean;
            }[]
          ];
        };
        /**
         * Server version information, in Major.Minor.Build format.
         */
        ServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the server. Can be 0-length.
           */
          ServerName: string;
          /**
           * Message template version of the server software.
           */
          MessageVersion: number;
          /**
           * Major version of server.
           */
          MajorVersion: number;
          /**
           * Minor version of server.
           */
          MinorVersion: number;
          /**
           * Build version of server.
           */
          BuildVersion: number;
          /**
           * Maximum time (in milliseconds) the server will wait between ping messages from client before shutting down.
           */
          MaxPingTime: number;
        };
        /**
         * Request for the server to start scanning for new devices.
         */
        StartScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops all actions currently being taken by all connected devices.
         */
        StopAllDevices?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops the all actions currently being taken by a device.
         */
        StopDeviceCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Request for the server to stop scanning for new devices.
         */
        StopScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Used for connection/application testing. Causes server to echo back the string sent. Sending string of 'Error' will result in a server error.
         */
        Test?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * String to be echo'd back from server. Setting this to 'Error' will cause an error to be thrown.
           */
          TestString: string;
        };
        /**
         * Sends a vibrate command to a device that supports vibration.
         */
        VibrateCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device vibration speeds (floating point, 0 < x < 1) keyed on vibrator number, stepping will be device specific.
           */
          Speeds: [
            {
              /**
               * Vibrator number.
               */
              Index: number;
              /**
               * Vibration speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
            },
            ...{
              /**
               * Vibrator number.
               */
              Index: number;
              /**
               * Vibration speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
            }[]
          ];
        };
        /**
         * Sends a raw byte string to a Kiiroo Onyx/Pearl device.
         */
        VorzeA10CycloneCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Rotation speed command for the Cyclone.
           */
          Speed: number;
          /**
           * True for clockwise rotation (in relation to device facing user), false for Counter-clockwise
           */
          Clockwise: boolean;
        };
      },
      ...{
        /**
         * List of all available devices known to the system.
         */
        DeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Array of device ids and names.
           */
          Devices: {
            /**
             * Name of the device
             */
            DeviceName: string;
            /**
             * Index used for referencing the device in device messages.
             */
            DeviceIndex: number;
            /**
             * A list of the messages a device will accept on this server implementation.
             */
            DeviceMessages: {
              /**
               * Attributes for device message that have no attributes.
               */
              StopDeviceCmd?: {};
              /**
               * Attributes for device messages.
               */
              VibrateCmd?: {
                /**
                 * Number of features on device.
                 */
                FeatureCount?: number;
              };
              /**
               * Attributes for device messages.
               */
              LinearCmd?: {
                /**
                 * Number of features on device.
                 */
                FeatureCount?: number;
              };
              /**
               * Attributes for device messages.
               */
              RotateCmd?: {
                /**
                 * Number of features on device.
                 */
                FeatureCount?: number;
              };
              /**
               * Attributes for device message that have no attributes.
               */
              LovenseCmd?: {};
              /**
               * Attributes for device message that have no attributes.
               */
              VorzeA10CycloneCmd?: {};
              /**
               * Attributes for device message that have no attributes.
               */
              KiirooCmd?: {};
              /**
               * Attributes for device message that have no attributes.
               */
              SingleMotorVibrateCmd?: {};
              /**
               * Attributes for device message that have no attributes.
               */
              FleshlightLaunchFW12Cmd?: {};
            };
          }[];
        };
        /**
         * Notifies client that a device of a certain type has been added to the server.
         */
        DeviceAdded?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Name of the device
           */
          DeviceName: string;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * A list of the messages a device will accept on this server implementation.
           */
          DeviceMessages: {
            /**
             * Attributes for device message that have no attributes.
             */
            StopDeviceCmd?: {};
            /**
             * Attributes for device messages.
             */
            VibrateCmd?: {
              /**
               * Number of features on device.
               */
              FeatureCount?: number;
            };
            /**
             * Attributes for device messages.
             */
            LinearCmd?: {
              /**
               * Number of features on device.
               */
              FeatureCount?: number;
            };
            /**
             * Attributes for device messages.
             */
            RotateCmd?: {
              /**
               * Number of features on device.
               */
              FeatureCount?: number;
            };
            /**
             * Attributes for device message that have no attributes.
             */
            LovenseCmd?: {};
            /**
             * Attributes for device message that have no attributes.
             */
            VorzeA10CycloneCmd?: {};
            /**
             * Attributes for device message that have no attributes.
             */
            KiirooCmd?: {};
            /**
             * Attributes for device message that have no attributes.
             */
            SingleMotorVibrateCmd?: {};
            /**
             * Attributes for device message that have no attributes.
             */
            FleshlightLaunchFW12Cmd?: {};
          };
        };
        /**
         * Notifies client that a device of a certain type has been removed from the server.
         */
        DeviceRemoved?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Signifies the server encountered an error while processing the message indicated by the id.
         */
        Error?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          ErrorMessage: string;
          ErrorCode: number;
        };
        /**
         * Sends speed and position command to the Fleshlight Launch Device denoted by the device index.
         */
        FleshlightLaunchFW12Cmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Speed at which to move to designated position.
           */
          Speed: number;
          /**
           * Position to which to move Fleshlight.
           */
          Position: number;
        };
        /**
         * Sends a raw byte string to a Kiiroo Onyx/Pearl device.
         */
        KiirooCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Command to send to Kiiroo device.
           */
          Command: string;
        };
        /**
         * Sends a linear movement command to a device that supports linear movements.
         */
        LinearCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device linear movement times (milliseconds) and positions (floating point, 0 < x < 1) keyed on linear actuator number, stepping will be device specific.
           */
          Vectors: {
            /**
             * Linear actuator number.
             */
            Index: number;
            /**
             * Linear movement time in milliseconds.
             */
            Duration: number;
            /**
             * Linear movement position (floating point, 0 < x < 1), stepping will be device specific.
             */
            Position: number;
          }[];
        };
        /**
         * Log message from the server.
         */
        Log?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Log level of message.
           */
          LogLevel:
            | "Off"
            | "Fatal"
            | "Error"
            | "Warn"
            | "Info"
            | "Debug"
            | "Trace";
          /**
           * Log message from server.
           */
          LogMessage: string;
        };
        /**
         * Signifies successful processing of the message indicated by the id.
         */
        Ok?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Connection keep-alive message.
         */
        Ping?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request for the server to send a list of devices to the client.
         */
        RequestDeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request for server to stream log messages of a certain level to client.
         */
        RequestLog?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Maximum level of log message to receive.
           */
          LogLevel:
            | "Off"
            | "Fatal"
            | "Error"
            | "Warn"
            | "Info"
            | "Debug"
            | "Trace";
        };
        /**
         * Request server version, and relay client name.
         */
        RequestServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the client software.
           */
          ClientName: string;
          /**
           * Message template version of the client software.
           */
          MessageVersion: number;
        };
        /**
         * Sends a rotate command to a device that supports rotation.
         */
        RotateCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device rotation speeds (floating point, 0 < x < 1) keyed on rotator number, stepping will be device specific.
           */
          Rotations: [
            {
              /**
               * Rotator number.
               */
              Index: number;
              /**
               * Rotation speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
              /**
               * Rotation direction (boolean). Not all devices have a concept of actual clockwise.
               */
              Clockwise: boolean;
            },
            ...{
              /**
               * Rotator number.
               */
              Index: number;
              /**
               * Rotation speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
              /**
               * Rotation direction (boolean). Not all devices have a concept of actual clockwise.
               */
              Clockwise: boolean;
            }[]
          ];
        };
        /**
         * Server version information, in Major.Minor.Build format.
         */
        ServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the server. Can be 0-length.
           */
          ServerName: string;
          /**
           * Message template version of the server software.
           */
          MessageVersion: number;
          /**
           * Major version of server.
           */
          MajorVersion: number;
          /**
           * Minor version of server.
           */
          MinorVersion: number;
          /**
           * Build version of server.
           */
          BuildVersion: number;
          /**
           * Maximum time (in milliseconds) the server will wait between ping messages from client before shutting down.
           */
          MaxPingTime: number;
        };
        /**
         * Request for the server to start scanning for new devices.
         */
        StartScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops all actions currently being taken by all connected devices.
         */
        StopAllDevices?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops the all actions currently being taken by a device.
         */
        StopDeviceCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Request for the server to stop scanning for new devices.
         */
        StopScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Used for connection/application testing. Causes server to echo back the string sent. Sending string of 'Error' will result in a server error.
         */
        Test?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * String to be echo'd back from server. Setting this to 'Error' will cause an error to be thrown.
           */
          TestString: string;
        };
        /**
         * Sends a vibrate command to a device that supports vibration.
         */
        VibrateCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device vibration speeds (floating point, 0 < x < 1) keyed on vibrator number, stepping will be device specific.
           */
          Speeds: [
            {
              /**
               * Vibrator number.
               */
              Index: number;
              /**
               * Vibration speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
            },
            ...{
              /**
               * Vibrator number.
               */
              Index: number;
              /**
               * Vibration speed (floating point, 0 < x < 1), stepping will be device specific.
               */
              Speed: number;
            }[]
          ];
        };
        /**
         * Sends a raw byte string to a Kiiroo Onyx/Pearl device.
         */
        VorzeA10CycloneCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Rotation speed command for the Cyclone.
           */
          Speed: number;
          /**
           * True for clockwise rotation (in relation to device facing user), false for Counter-clockwise
           */
          Clockwise: boolean;
        };
      }[]
    ]
  | [
      {
        /**
         * List of all available devices known to the system.
         */
        DeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Array of device ids and names.
           */
          Devices: {
            /**
             * Name of the device
             */
            DeviceName: string;
            /**
             * Index used for referencing the device in device messages.
             */
            DeviceIndex: number;
            /**
             * A list of the messages a device will accept on this server implementation.
             */
            DeviceMessages: (
              | "FleshlightLaunchFW12Cmd"
              | "SingleMotorVibrateCmd"
              | "KiirooCmd"
              | "LovenseCmd"
              | "VorzeA10CycloneCmd"
            )[];
          }[];
        };
        /**
         * Notifies client that a device of a certain type has been added to the server.
         */
        DeviceAdded?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Name of the device
           */
          DeviceName: string;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * A list of the messages a device will accept on this server implementation.
           */
          DeviceMessages: (
            | "FleshlightLaunchFW12Cmd"
            | "SingleMotorVibrateCmd"
            | "KiirooCmd"
            | "LovenseCmd"
            | "VorzeA10CycloneCmd"
          )[];
        };
        /**
         * Notifies client that a device of a certain type has been removed from the server.
         */
        DeviceRemoved?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Signifies the server encountered an error while processing the message indicated by the id.
         */
        Error?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          ErrorMessage: string;
          ErrorCode: number;
        };
        /**
         * Log message from the server.
         */
        Log?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Log level of message.
           */
          LogLevel:
            | "Off"
            | "Fatal"
            | "Error"
            | "Warn"
            | "Info"
            | "Debug"
            | "Trace";
          /**
           * Log message from server.
           */
          LogMessage: string;
        };
        /**
         * Signifies successful processing of the message indicated by the id.
         */
        Ok?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Connection keep-alive message.
         */
        Ping?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request for the server to send a list of devices to the client.
         */
        RequestDeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request for server to stream log messages of a certain level to client.
         */
        RequestLog?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Maximum level of log message to receive.
           */
          LogLevel:
            | "Off"
            | "Fatal"
            | "Error"
            | "Warn"
            | "Info"
            | "Debug"
            | "Trace";
        };
        /**
         * Request server version, and relay client name.
         */
        RequestServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the client software.
           */
          ClientName: string;
        };
        /**
         * Server version information, in Major.Minor.Build format.
         */
        ServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the server. Can be 0-length.
           */
          ServerName: string;
          /**
           * Message template version of the server software.
           */
          MessageVersion: number;
          /**
           * Major version of server.
           */
          MajorVersion: number;
          /**
           * Minor version of server.
           */
          MinorVersion: number;
          /**
           * Build version of server.
           */
          BuildVersion: number;
          /**
           * Maximum time (in milliseconds) the server will wait between ping messages from client before shutting down.
           */
          MaxPingTime: number;
        };
        /**
         * Request for the server to start scanning for new devices.
         */
        StartScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops all actions currently being taken by all connected devices.
         */
        StopAllDevices?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops the all actions currently being taken by a device.
         */
        StopDeviceCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Request for the server to stop scanning for new devices.
         */
        StopScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Used for connection/application testing. Causes server to echo back the string sent. Sending string of 'Error' will result in a server error.
         */
        Test?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * String to be echo'd back from server. Setting this to 'Error' will cause an error to be thrown.
           */
          TestString: string;
        };
        /**
         * Sends speed and position command to the Fleshlight Launch Device denoted by the device index.
         */
        FleshlightLaunchFW12Cmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Speed at which to move to designated position.
           */
          Speed: number;
          /**
           * Position to which to move Fleshlight.
           */
          Position: number;
        };
        /**
         * Sends a raw byte string to a Kiiroo Onyx/Pearl device.
         */
        KiirooCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Command to send to Kiiroo device.
           */
          Command: string;
        };
        /**
         * Sends a vibrate command to a device that supports vibration.
         */
        SingleMotorVibrateCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device vibration speed (floating point, 0 < x < 1), stepping will be device specific.
           */
          Speed: number;
        };
        /**
         * Sends a raw byte string to a Kiiroo Onyx/Pearl device.
         */
        VorzeA10CycloneCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Rotation speed command for the Cyclone.
           */
          Speed: number;
          /**
           * True for clockwise rotation (in relation to device facing user), false for Counter-clockwise
           */
          Clockwise: boolean;
        };
      },
      ...{
        /**
         * List of all available devices known to the system.
         */
        DeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Array of device ids and names.
           */
          Devices: {
            /**
             * Name of the device
             */
            DeviceName: string;
            /**
             * Index used for referencing the device in device messages.
             */
            DeviceIndex: number;
            /**
             * A list of the messages a device will accept on this server implementation.
             */
            DeviceMessages: (
              | "FleshlightLaunchFW12Cmd"
              | "SingleMotorVibrateCmd"
              | "KiirooCmd"
              | "LovenseCmd"
              | "VorzeA10CycloneCmd"
            )[];
          }[];
        };
        /**
         * Notifies client that a device of a certain type has been added to the server.
         */
        DeviceAdded?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Name of the device
           */
          DeviceName: string;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * A list of the messages a device will accept on this server implementation.
           */
          DeviceMessages: (
            | "FleshlightLaunchFW12Cmd"
            | "SingleMotorVibrateCmd"
            | "KiirooCmd"
            | "LovenseCmd"
            | "VorzeA10CycloneCmd"
          )[];
        };
        /**
         * Notifies client that a device of a certain type has been removed from the server.
         */
        DeviceRemoved?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Signifies the server encountered an error while processing the message indicated by the id.
         */
        Error?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          ErrorMessage: string;
          ErrorCode: number;
        };
        /**
         * Log message from the server.
         */
        Log?: {
          /**
           * Used for non-direct-reply messages that can only be sent from server to client, using the reserved system message Id of 0.
           */
          Id: number;
          /**
           * Log level of message.
           */
          LogLevel:
            | "Off"
            | "Fatal"
            | "Error"
            | "Warn"
            | "Info"
            | "Debug"
            | "Trace";
          /**
           * Log message from server.
           */
          LogMessage: string;
        };
        /**
         * Signifies successful processing of the message indicated by the id.
         */
        Ok?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Connection keep-alive message.
         */
        Ping?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request for the server to send a list of devices to the client.
         */
        RequestDeviceList?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Request for server to stream log messages of a certain level to client.
         */
        RequestLog?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Maximum level of log message to receive.
           */
          LogLevel:
            | "Off"
            | "Fatal"
            | "Error"
            | "Warn"
            | "Info"
            | "Debug"
            | "Trace";
        };
        /**
         * Request server version, and relay client name.
         */
        RequestServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the client software.
           */
          ClientName: string;
        };
        /**
         * Server version information, in Major.Minor.Build format.
         */
        ServerInfo?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Name of the server. Can be 0-length.
           */
          ServerName: string;
          /**
           * Message template version of the server software.
           */
          MessageVersion: number;
          /**
           * Major version of server.
           */
          MajorVersion: number;
          /**
           * Minor version of server.
           */
          MinorVersion: number;
          /**
           * Build version of server.
           */
          BuildVersion: number;
          /**
           * Maximum time (in milliseconds) the server will wait between ping messages from client before shutting down.
           */
          MaxPingTime: number;
        };
        /**
         * Request for the server to start scanning for new devices.
         */
        StartScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops all actions currently being taken by all connected devices.
         */
        StopAllDevices?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Stops the all actions currently being taken by a device.
         */
        StopDeviceCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
        };
        /**
         * Request for the server to stop scanning for new devices.
         */
        StopScanning?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
        };
        /**
         * Used for connection/application testing. Causes server to echo back the string sent. Sending string of 'Error' will result in a server error.
         */
        Test?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * String to be echo'd back from server. Setting this to 'Error' will cause an error to be thrown.
           */
          TestString: string;
        };
        /**
         * Sends speed and position command to the Fleshlight Launch Device denoted by the device index.
         */
        FleshlightLaunchFW12Cmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Speed at which to move to designated position.
           */
          Speed: number;
          /**
           * Position to which to move Fleshlight.
           */
          Position: number;
        };
        /**
         * Sends a raw byte string to a Kiiroo Onyx/Pearl device.
         */
        KiirooCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Command to send to Kiiroo device.
           */
          Command: string;
        };
        /**
         * Sends a vibrate command to a device that supports vibration.
         */
        SingleMotorVibrateCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Device vibration speed (floating point, 0 < x < 1), stepping will be device specific.
           */
          Speed: number;
        };
        /**
         * Sends a raw byte string to a Kiiroo Onyx/Pearl device.
         */
        VorzeA10CycloneCmd?: {
          /**
           * User-set id for the message. 0 denotes system message and is reserved.
           */
          Id: number;
          /**
           * Index used for referencing the device in device messages.
           */
          DeviceIndex: number;
          /**
           * Rotation speed command for the Cyclone.
           */
          Speed: number;
          /**
           * True for clockwise rotation (in relation to device facing user), false for Counter-clockwise
           */
          Clockwise: boolean;
        };
      }[]
    ];
