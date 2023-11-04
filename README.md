# hedged request with Node

This is a PoC of hedged request with Node.js.
https://medium.com/swlh/hedged-requests-tackling-tail-latency-9cea0a05f577

## How to run

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
