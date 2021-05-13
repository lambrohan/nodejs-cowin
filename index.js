const notifier = require('node-notifier')
const pincode = '416001'
const date = '16-05-2021'

const axios = require('axios').default
let config = {
	method: 'get',
	url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`,
	headers: {
		'User-Agent': 'PostmanRuntime/7.26.10',
		Accept: '*/*',
		Connection: 'keep-alive',
	},
}

async function pingVaxServer() {
	try {
		const { data } = await axios(config)
		console.log(
			new Date().toLocaleTimeString(),
			data.sessions.map((s) => ({
				center: s.name,
				capicity: s.available_capacity,
			}))
		)
		if (data.sessions && data.sessions.length) {
			notifier.notify({
				title: 'Vaccine Available',
				message: 'Go and register!',
			})
		}
	} catch (error) {
		console.error('error')
	}
}

setInterval(pingVaxServer, 5000)
