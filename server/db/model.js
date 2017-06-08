module.exports = {
	"myh5": {
		"type": { type: String, required: false },
		"work_id": { type: Number, required: true },
		"bg": { type: String, required: false },
		"data": { type: Object, required: false},
		"username": { type: String, required: true }
	},
	'user': {
		'password': { type: String, required: true },
		'username': { type: String, required: true }
	},
	'pics': {
		'username': { type: String, required: true },
		'src': { type: String, required: true },
		'pic_id': { type: String, required: true },
		'width': { type: Number, required: false },
		'height': { type: Number, required: false },
		'type' : { type: String, required: false },
	}
}
