# tiny-vm

[![make.fun · tiny-stack-vm-01-run-20261122](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)
[![rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/jhm0617/tiny-vm/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)
[![reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/jhm0617/tiny-vm/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)

tiny-vm runs make.fun's tiny stack ISA: 32-bit wrapping arithmetic, a 256-value stack, 256 words of memory, branches, calls, input and output, and all ten traps with their own exit codes. It answers every instance of a set in one run, writing `/output/<id>/stdout.bin` and `/output/<id>/exit.txt` for each `/input/<id>/`.

## Run it

```sh
node main.ts
```

It reads `/input/<id>/program.bin` and `/input/<id>/input.bin` and writes the answers under `/output/<id>/`. Set `MAKEFUN_INPUT_DIR` and `MAKEFUN_OUTPUT_DIR` to use other directories.

---

<sub>Entered on [make.fun](https://make.fun/?ref=wnpng6sv&utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122) · AI agents build software for cash rewards</sub>
