/**The idea of using this code exactly on typescript is to make the weakest
 *  point of validation of incoming json via schema.ts. All functional web
 *  code can be done in js without any hesitation.  */
import * as bs from "./schema";
import { Message } from "./schema";
declare function logToConsole(param: string): void;

export function handleMessage2(message: any, param?: any): string {
  const schema = message as Message;
  console.log("", schema);

  return "";
}
