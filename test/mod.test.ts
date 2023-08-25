import process from "node:process";
import assert from "node:assert";
import NativeController from "./NativeController.ts";
import execStep from "../mod.ts";
const test = Deno.test;

test("echo", async () => {
  process.env.INPUT_RUN = `echo 'Hello world!'`;
  const c = new NativeController();
  await execStep(c);
});
