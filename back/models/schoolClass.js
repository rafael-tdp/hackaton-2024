const mongoose = require("mongoose");

const schoolClassSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	nbStudents: {
		type: Number,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	graduatingId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Graduating",
	},
	weekClasses: {
		type: [Number],
		required: true,
	},
});

module.exports = mongoose.model("SchoolClass", schoolClassSchema);