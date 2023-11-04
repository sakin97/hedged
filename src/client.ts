/** 
 * This is dummy service client.
 * `/normal` sends 1 request to `/ishealthy`.
 * `/hedged` sends 3 requests to `/ishealthy` with 0ms, 21ms, 42ms delay,
 *  and returns the fastest response.
 */

import { request } from "undici";
import { setTimeout } from "timers/promises";
import express from "express";

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
	const {body} = await Promise.any(requests);
	res.send(await body.json())
})

app.get('/normal', async (req: express.Request, res: express.Response) => {
	const url = 'http://localhost:3000/ishealthy';
	const {body}= await request(url);
	res.json(await body.json())
})
