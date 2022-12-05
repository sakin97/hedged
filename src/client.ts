import { request } from "undici";
import { setTimeout } from "timers/promises";
import express from "express";

// async function main() {
//   const { statusCode, headers, trailers, body } = await request(
//     "http://localhost:3000/ishealthy"
//   );

//   console.log("response received", statusCode);
//   console.log("headers", headers);

//   for await (const data of body) {
//     console.log("data", data);
//   }
// }

// main();

const app: express.Express = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(3001, () => {
	console.log("Start on port 3001.")
})

async function hedge(url: string, delay: number = 0) {
	await setTimeout(delay);
	return request(url);
}

app.get('/hedged', async (req: express.Request, res: express.Response) => {
	const url = 'http://localhost:3000/ishealthy';
	const requests = [
		hedge(url),
		hedge(url, 21),
		hedge(url, 42),
	]
	const {body} = await Promise.race(requests);
	res.send(await body.json())
})

app.get('/normal', async (req: express.Request, res: express.Response) => {
	const url = 'http://localhost:3000/ishealthy';
	const {body}= await request(url);
	res.json(await body.json())
})
