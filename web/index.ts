/**The idea of using this code exactly on typescript is to make the weakest
 *  point of validation of incoming json via schema.ts. All functional web
 *  code can be done in js without any hesitation.  */
import { ButtplugMessageSchema } from "./schema";
declare function logToConsole(param: string): void;

export function handleMessage2(message: any, param?: any): string {
  const schema = message as ButtplugMessageSchema;
  console.log("", schema.LinearCmd?.DeviceIndex);

  return "";
}