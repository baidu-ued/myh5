module.exports = {
    "user": {
        "user_name": { type: String, required: true },
        "password": { type: String, required: true },
    },
    "h5": {
        "work_id": { type: Number, required: true },
        "data": { type: Object, required: true },
        "user_name": { type: String, required: true }
    },
	"myh5" : {
		"type" : { type: String, required: false },
		"work_id": { type: Number, required: true },
	}
}
