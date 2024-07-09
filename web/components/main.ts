import { logToConsole } from "./console";
import { Toy } from "./toy";
function main() {
  logToConsole("Console:");
  new Toy("element-grid");
}

main();
