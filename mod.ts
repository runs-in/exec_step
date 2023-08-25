import * as core from "@actions/core";
import { pEvent } from "p-event";
import RunsInController from "./RunsInController.ts";

const shellAliases = {
  __proto__: null,
  bash: "bash -euo pipefail {0}",
};

async function execStep(c: RunsInController): Promise<void> {
  const rawShell = core.getInput("shell");
  const shell = shellAliases[rawShell] ?? rawShell ?? "bash -e {0}";

  const run = core.getInput("run");

  if (core.getInput("uses")) {
    throw new DOMException("Not supported yet", "NotSupportedError");
  }

  await c.writeFile("/tmp/run-me", run);
  const cmd = shell.replace("{0}", "/tmp/run-me").split(" ");
  const cp = await c.spawn(cmd[0], cmd.slice(1), { stdio: "inherit" });
  await pEvent(cp, "exit");
}

export default execStep;
