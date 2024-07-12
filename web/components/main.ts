import { logToConsole } from "./console";
import { Toy } from "./toy";
import * as Message from "./schema/messages";
function main() {
  logToConsole("Console:");
  new Toy("element-grid");
}

main();
