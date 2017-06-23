module.exports = {
	"admin" : {
		pic_type : { type: Array, required: false }
	},
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
		'username': { type: String, required: false },
		'src': { type: String, required: true },
		'id': { type: String, required: true },
		'sourceId': { type: String, required: false },
		'width': { type: Number, required: false },
		'height': { type: Number, required: false },
		'type' : { type: String, required: false },
		'createTime' : { type: String, required: false },
	},
	'music': {
		'username': { type: String, required: false },
		'src': { type: String, required: true },
		'type' : { type: String, required: false },
	}
}
