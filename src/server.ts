/**
 * This is dummy service server.
 * `/ishealthy` returns 200 OK in 15ms in 95% probability, 
 * and 115ms in 5% probability.
 */

import express from "express";
import { setTimeout } from "timers/promises";
const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Start on port 3000.");
});

app.get("/ishealthy", async (req: express.Request, res: express.Response) => {
  const rnd = Math.random() * 100;
  let waitTime = 0;

  if (rnd > 96) {
    waitTime = 100;
  }

  await setTimeout(waitTime + 15);

  res.json({
    body: {
      health: "healthy",
			waitTime: waitTime
    },
  });
});
