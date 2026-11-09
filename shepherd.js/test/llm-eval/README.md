# LLM eval

Measures whether a coding agent with no prior context writes Shepherd code that
works. Solutions are loaded in a real browser with Playwright and graded on what
the page does. Nothing here reads or scores source code, and nothing is
non-deterministic except the agent that wrote the solution.

From `shepherd.js/`, after `pnpm build`:

| Command                                                          | What it does                                                  |
| ---------------------------------------------------------------- | ------------------------------------------------------------- |
| `node test/llm-eval/run.mjs test/llm-eval/reference`             | Grades the reference solutions. Must always be 8/8.           |
| `node test/llm-eval/run.mjs <solutionsDir> --json out.json`      | Grades a directory of solutions.                              |
| `node test/llm-eval/run.mjs --write-sandbox <dir>`               | Creates the directory a cold agent works in.                  |
| `node test/llm-eval/run.mjs --write-prompts <dir>`               | Writes only the task prompts.                                 |
| `node test/llm-eval/mistakes.mjs --json out.json`                | Records what each known mistake does. Needs no agent.         |

All of them take `--pkg <dir>` to test another build, such as an older package
extracted somewhere. `run.mjs` also takes `--task <id>`.

## Running it with cold agents

Run the same steps for each build you are comparing, with the same model and at
least 3 agents per task, because one run says little about a model's error rate.

1. `node test/llm-eval/run.mjs --write-sandbox <dir> --pkg <build>`. The sandbox
   has `node_modules/` holding exactly what `npm pack` publishes, the prompts in
   `prompts/`, and an empty `solutions/`.
2. Start a new agent for each prompt, with its working directory set to the
   sandbox, no access to this repository, and no network. Send it the prompt file
   as is, and add no hints. Have it write to `solutions/`. It may read anything
   in `node_modules/`.
3. `node test/llm-eval/run.mjs <dir>/solutions --pkg <build> --json out.json`.
   Grade against the same build the agent saw.

A solution is named `<task id>.<ext>`. A missing file counts as a failed task.

Compare `passed` and the first failed check of each task between builds. The check
names say which mistake happened, such as `default styling applied` for a
forgotten stylesheet. Also compare `console`, which holds what the page printed.

## Tasks

| Task              | The trap                                                                 |
| ----------------- | ------------------------------------------------------------------------ |
| `first-tour`      | The CSS import, button actions, `attachTo.on`, centered steps            |
| `modal-focus`     | `useModalOverlay`, `canClickTarget`, `cancelIcon`, `cancel` once         |
| `shared-defaults` | `defaultStepOptions` inheritance, and overriding it per step             |
| `async-targets`   | `beforeShowPromise`, `waitForElement`, `skipMissingElement`              |
| `events-persist`  | `advanceOn`, tour events, restart after a reload                         |
| `react-strict`    | The current `react-shepherd` API, and StrictMode's double effect         |
| `typed-json`      | The `Tour` type vs value, passing `tsc --strict`, data-driven steps      |
| `script-tag`      | No bundler: `shepherd.mjs` is a module and defines no global             |

## Mistakes

`mistakes.mjs` runs small programs that each contain one expected mistake, against
a build, with no agent involved. Each ends up as:

| Outcome          | Meaning                                                   |
| ---------------- | --------------------------------------------------------- |
| `WORKS`          | The tour behaves as the author meant, despite the mistake |
| `DIAGNOSED`      | It fails, and a message names the fix                     |
| `LOUD-UNHELPFUL` | It fails with an error that does not name the fix         |
| `SILENT`         | It fails with no error at all                             |
| `BROKEN`         | It fails, for a mistake with no message to judge          |

The `tsc` column means the compiler rejects the code. The `docs` column means the
shipped `AGENTS.md` mentions the fix, which says only that the text is there, not
that an agent reads it. The cold agent run measures that.
