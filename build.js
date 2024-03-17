import * as esbuild from "esbuild"
import {typecheckPlugin} from "@jgoz/esbuild-plugin-typecheck"

const plugins = []
if (process.argv.indexOf("-c") > -1) {
  plugins.push(typecheckPlugin())
}

const config = {
  entryPoints: ["src/index.ts", "src/admin/**/*.tsx"],
  bundle: true,
  platform: "node",
  packages: "external",
  format: "esm",
  outdir: "dist",
  plugins
}

if (process.argv.indexOf("-w") > -1) {
  void (await esbuild.context(config)).watch()
}

if (process.argv.indexOf("-b") > -1) {
  await esbuild.build(config)
}