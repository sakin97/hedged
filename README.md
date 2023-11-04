# hedged request with Node

```sh
pnpm install
pnpm build

# start target application server
pnpm start:server

# start client application server
pnpm start:client

# apatchebench using client server
# by normal(single) request
tests/scripts/normal.sh

# by hedged request
tests/scripts/hedged.sh
```
