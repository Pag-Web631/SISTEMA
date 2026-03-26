require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt_aqui'; // Cambia esto en producción

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB (usa MongoDB Atlas o local)
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cursosvirtual';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Modelos
const UserSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  role: String, // 'profesor' o 'estudiante'
  createdAt: { type: Date, default: Date.now }
});

const CourseSchema = new mongoose.Schema({
  name: String,
  professorId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  courseId: mongoose.Schema.Types.ObjectId,
  professorId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

const EnrollmentSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  courseId: mongoose.Schema.Types.ObjectId,
  enrolledAt: { type: Date, default: Date.now }
});

const QuestionnaireSchema = new mongoose.Schema({
  title: String,
  questions: Array,
  courseId: mongoose.Schema.Types.ObjectId,
  professorId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

const ResponseSchema = new mongoose.Schema({
  questionnaireId: mongoose.Schema.Types.ObjectId,
  studentId: mongoose.Schema.Types.ObjectId,
  answers: Array,
  score: Number,
  submittedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
const Task = mongoose.model('Task', TaskSchema);
const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);
const Questionnaire = mongoose.model('Questionnaire', QuestionnaireSchema);
const Response = mongoose.model('Response', ResponseSchema);

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token inválido' });
  }
};

// Rutas de autenticación
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (err) {
    res.status(400).json({ error: 'Error registrando usuario' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET);
    res.json({ token, user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Error en login' });
  }
});

// Rutas para cursos
app.get('/api/courses', authenticateToken, async (req, res) => {
  try {
    const courses = await Course.find({ professorId: req.user._id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo cursos' });
  }
});

app.post('/api/courses', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    const course = new Course({ name, professorId: req.user._id });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: 'Error creando curso' });
  }
});

// Rutas para tareas
app.get('/api/tasks', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ professorId: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo tareas' });
  }
});

app.post('/api/tasks', authenticateToken, async (req, res) => {
  try {
    const { title, description, courseId } = req.body;
    const task = new Task({ title, description, courseId, professorId: req.user._id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Error creando tarea' });
  }
});

// Rutas para estudiantes (solo profesores)
app.get('/api/students', authenticateToken, async (req, res) => {
  if (req.user.role !== 'profesor') return res.status(403).json({ error: 'Acceso denegado' });
  try {
    const students = await User.find({ role: 'estudiante' });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo estudiantes' });
  }
});

// Rutas para cuestionarios
app.get('/api/questionnaires', authenticateToken, async (req, res) => {
  try {
    const questionnaires = await Questionnaire.find({ professorId: req.user._id });
    res.json(questionnaires);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo cuestionarios' });
  }
});

app.post('/api/questionnaires', authenticateToken, async (req, res) => {
  try {
    const { title, questions, courseId } = req.body;
    const questionnaire = new Questionnaire({ title, questions, courseId, professorId: req.user._id });
    await questionnaire.save();
    res.status(201).json(questionnaire);
  } catch (err) {
    res.status(400).json({ error: 'Error creando cuestionario' });
  }
});

// Rutas para respuestas
app.get('/api/responses', authenticateToken, async (req, res) => {
  try {
    const responses = await Response.find({ studentId: req.user._id });
    res.json(responses);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo respuestas' });
  }
});

app.post('/api/responses', authenticateToken, async (req, res) => {
  try {
    const { questionnaireId, answers, score } = req.body;
    const response = new Response({ questionnaireId, studentId: req.user._id, answers, score });
    await response.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ error: 'Error guardando respuesta' });
  }
});

// Rutas para inscripciones
app.get('/api/enrollments', authenticateToken, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.user._id });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo inscripciones' });
  }
});

app.post('/api/enrollments', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.body;
    const enrollment = new Enrollment({ studentId: req.user._id, courseId });
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(400).json({ error: 'Error inscribiendo' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});