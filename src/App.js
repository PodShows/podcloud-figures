import yargs from "yargs"
import { ServerCommand, RegisterCommand } from "./Commands"

const App = {
  run() {
    yargs
      .command(ServerCommand)
      .command(RegisterCommand)
      .help()
      .recommendCommands()
      .showHelpOnFail(true)
      .demandCommand(1, "")
      .parse()
  }
}

export default App
