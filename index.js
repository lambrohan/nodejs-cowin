const express = require('express')
const notifier = require('node-notifier')

const axios = require('axios').default
let config = {
	method: 'get',
	url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=415509&date=13-05-2021',
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
		if (data.sessions && data.sessions.length > 1) {
			notifier.notify({
				title: 'Vaccine Available',
				message: 'Go and register dawg!',
			})
		}
	} catch (error) {
		console.error('error')
	}
}

setInterval(pingVaxServer, 5000)
