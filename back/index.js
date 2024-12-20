const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes");
const planningRouter = require("./routes/planningRoutes");
const { json, urlencoded } = require("express");
const cors = require("cors");
const GenericRouter = require("./routes/genericRouter");
const User = require("./models/user");
const Class = require("./models/schoolClass");
const ClassRoom = require("./models/classRoom");
const Course = require("./models/course");
const Subject = require("./models/subject");
const Unavailability = require("./models/unavailability");
const SubjectClass = require("./models/subjectClass");
const Graduating = require("./models/graduating");
const GenericService = require("./services/genericServices");
const SchoolClassService = require("./services/schoolClassServices");
const GenericController = require("./controllers/genericController");
const courseRouterCustom = require("./routes/courseRoutes");
const unavailabilitiesRouterCustom = require("./routes/unavailabilitiesRoutes");

const slotPreferencesRouter = require("./routes/slotPreferencesRoutes");
const notificationsRouter = require("./routes/notificationsRoutes");
const statsRouter = require("./routes/statsRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(json());

// User
const userService = new GenericService(User);
const userController = new GenericController(userService);
const userRouter = new GenericRouter(userController).getRouter();
// SchoolClass
const schoolClassService = new SchoolClassService(Class);
const schoolClassController = new GenericController(schoolClassService);
const schoolClassRouter = new GenericRouter(schoolClassController).getRouter();
// ClassRoom
const roomService = new GenericService(ClassRoom);
const roomController = new GenericController(roomService);
const roomRouter = new GenericRouter(roomController).getRouter();
// Course
const courseService = new GenericService(Course);
const courseController = new GenericController(courseService);
const courseRouter = new GenericRouter(courseController).getRouter();
// Subject
const subjectService = new GenericService(Subject);
const subjectController = new GenericController(subjectService);
const subjectRouter = new GenericRouter(subjectController).getRouter();
//SubjectClass
const subjectClassService = new GenericService(SubjectClass);
const subjectClassController = new GenericController(subjectClassService);
const subjectClassRouter = new GenericRouter(subjectClassController).getRouter();
// Unavailability
const unavailabilityService = new GenericService(Unavailability);
const unavailabilityController = new GenericController(unavailabilityService);
const unavailabilityRouter = new GenericRouter(unavailabilityController).getRouter();
//Graduatings
const graduatingService = new GenericService(Graduating);
const graduatingController = new GenericController(graduatingService);
const graduatingRouter = new GenericRouter(graduatingController).getRouter();


app.use("/api/planning", planningRouter);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/schoolClasses", schoolClassRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/stats", statsRouter);
app.use("/api/slotPreferences", slotPreferencesRouter);

app.use("/api/courses", (req, res, next) => {
	if (req.method === "POST" && req.path === "/validation") {
		return courseRouterCustom(req, res, next); // Utilise la route custom pour POST
	}
	if (req.method === "GET" && req.path === "/populated") {
		return courseRouterCustom(req, res, next); // Utilise la route custom pour GET
	}
	if (req.method === "GET" && req.path.includes("/status/")) {
		return courseRouterCustom(req, res, next); // Utilise la route custom pour GET
	}
	next();
});
app.use("/api/courses", courseRouter);

app.use("/api/subjects", subjectRouter);
app.use("/api/subjectClass", subjectClassRouter);


app.use("/api/unavailabilities", (req, res, next) => {
	if (req.method === "POST" || req.method === "GET") {
		return unavailabilitiesRouterCustom(req, res, next);
	}

	next();
});

app.use("/api/unavailabilities", unavailabilityRouter);

app.use("/api/graduating", graduatingRouter);
app.use("/api/notifications", notificationsRouter);


mongoose
	.connect(process.env.MONGO_URI, {})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch((err) => console.error("Erreur de connexion à MongoDB:", err));

app.get("/", (req, res) => {
	res.send("Bienvenue sur l'API !");
});

app.listen(PORT, () => {
	console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
