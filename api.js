// API client para sincronización con backend
// Para producción, cambia esta URL a tu servidor desplegado
const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : 'https://tu-servidor-produccion.com/api';
const STORAGE_PREFIX = 'cursosvirtual_'; // Prefijo para datos persistentes

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('token');
    this.isOnline = navigator.onLine;
    
    // Detectar cambios de conexión
    window.addEventListener('online', () => {
      this.isOnline = true;
      console.log('Conexión restaurada - sincronizando datos...');
      this.syncOfflineData();
    });
    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('Modo offline activado');
    });
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Guardar datos localmente de forma permanente
  savePersistentData(key, data) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
    } catch (e) {
      console.error('Error guardando datos locales:', e);
    }
  }

  // Obtener datos locales permanentes
  getPersistentData(key) {
    try {
      const data = localStorage.getItem(STORAGE_PREFIX + key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error leyendo datos locales:', e);
      return null;
    }
  }

  // Sincronizar datos offline cuando se restaura conexión
  async syncOfflineData() {
    // Esta función sincroniza con el backend cuando vuelve la conexión
    try {
      console.log('Sincronizando con servidor...');
      // Implementar sincronización si es necesario
    } catch (error) {
      console.error('Error sincronizando:', error);
    }
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      // Fallback to localStorage if offline
      return this.fallbackToLocal(endpoint, options);
    }
  }

  async fallbackToLocal(endpoint, options) {
    // Implementar lógica de fallback para offline usando localStorage
    console.log('Offline mode: using localStorage for', endpoint);

    const method = options.method || 'GET';
    const body = options.body ? JSON.parse(options.body) : null;

    if (endpoint === '/login' && method === 'POST') {
      // Simular login con localStorage
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const usuario = usuarios.find(u => u.email.toLowerCase() === body.email && u.password === body.password);
      if (usuario) {
        // Verificar rol esperado
        if (body.expectedRole && usuario.role !== body.expectedRole) {
          throw new Error('Rol incorrecto para este usuario');
        }
        return {
          token: 'local-token-' + Date.now(),
          user: {
            _id: usuario.email, // Usar email como ID temporal
            fullName: usuario.fullName,
            email: usuario.email,
            role: usuario.role
          }
        };
      }
      throw new Error('Credenciales inválidas');
    }

    if (endpoint === '/register' && method === 'POST') {
      // Simular registro con localStorage
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      if (usuarios.find(u => u.email === body.email)) {
        throw new Error('Usuario ya existe');
      }
      usuarios.push({
        fullName: body.fullName,
        email: body.email,
        password: body.password,
        role: body.role
      });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      return { message: 'Usuario registrado' };
    }

    if (endpoint === '/courses') {
      if (method === 'GET') {
        return this.getPersistentData('courses') || [];
      } else if (method === 'POST') {
        const cursos = this.getPersistentData('courses') || [];
        const newCourse = { 
          _id: Date.now().toString(), 
          name: body.name,
          profesorId: this.getProfessorId(),
          createdAt: new Date().toISOString()
        };
        cursos.push(newCourse);
        this.savePersistentData('courses', cursos);
        return newCourse;
      }
    }

    if (endpoint === '/tasks') {
      if (method === 'GET') {
        return this.getPersistentData('tasks') || [];
      } else if (method === 'POST') {
        const tareas = this.getPersistentData('tasks') || [];
        const newTask = { 
          _id: Date.now().toString(), 
          title: body.title, 
          description: body.description || '', 
          courseId: body.courseId,
          profesorId: this.getProfessorId(),
          createdAt: new Date().toISOString()
        };
        tareas.push(newTask);
        this.savePersistentData('tasks', tareas);
        return newTask;
      }
    }

    if (endpoint === '/students' && method === 'GET') {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      return usuarios.filter(u => u.role === 'estudiante');
    }

    if (endpoint === '/questionnaires') {
      if (method === 'GET') {
        return this.getPersistentData('questionnaires') || [];
      } else if (method === 'POST') {
        const cuestionarios = this.getPersistentData('questionnaires') || [];
        const newQuestionnaire = {
          _id: Date.now().toString(),
          title: body.title,
          questions: body.questions || [],
          courseId: body.courseId,
          profesorId: this.getProfessorId(),
          createdAt: new Date().toISOString()
        };
        cuestionarios.push(newQuestionnaire);
        this.savePersistentData('questionnaires', cuestionarios);
        return newQuestionnaire;
      }
    }

    if (endpoint === '/responses') {
      if (method === 'GET') {
        return this.getPersistentData('responses') || [];
      } else if (method === 'POST') {
        const respuestas = this.getPersistentData('responses') || [];
        const newResponse = {
          _id: Date.now().toString(),
          questionnaireId: body.questionnaireId,
          studentId: localStorage.getItem('userEmail'),
          answers: body.answers || [],
          score: body.score,
          submittedAt: new Date().toISOString()
        };
        respuestas.push(newResponse);
        this.savePersistentData('responses', respuestas);
        return newResponse;
      }
    }

    // Para otros endpoints, devolver array vacío o null
    return [];
  }

  getProfessorId() {
    return localStorage.getItem('userId') || localStorage.getItem('userEmail') || 'unknown';
  }

  // Métodos públicos de la API
  async login(email, password, expectedRole) {
    const data = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, expectedRole })
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async register(fullName, email, password, role) {
    return await this.request('/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password, role })
    });
  }

  async getCourses() {
    return await this.request('/courses');
  }

  async createCourse(name) {
    return await this.request('/courses', {
      method: 'POST',
      body: JSON.stringify({ name })
    });
  }

  async deleteCourse(courseId) {
    return await this.request(`/courses/${courseId}`, {
      method: 'DELETE'
    });
  }

  async getTasks() {
    return await this.request('/tasks');
  }

  async createTask(title, description, courseId) {
    return await this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description, courseId })
    });
  }

  async deleteTask(taskId) {
    return await this.request(`/tasks/${taskId}`, {
      method: 'DELETE'
    });
  }

  async getStudents() {
    return await this.request('/students');
  }

  async getQuestionnaires() {
    return await this.request('/questionnaires');
  }

  async createQuestionnaire(title, questions, courseId) {
    return await this.request('/questionnaires', {
      method: 'POST',
      body: JSON.stringify({ title, questions, courseId })
    });
  }

  async deleteQuestionnaire(questId) {
    return await this.request(`/questionnaires/${questId}`, {
      method: 'DELETE'
    });
  }

  async getResponses() {
    return await this.request('/responses');
  }

  async submitResponse(questionnaireId, answers, score) {
    return await this.request('/responses', {
      method: 'POST',
      body: JSON.stringify({ questionnaireId, answers, score })
    });
  }

  async getEnrollments() {
    return await this.request('/enrollments');
  }

  async enrollInCourse(courseId) {
    return await this.request('/enrollments', {
      method: 'POST',
      body: JSON.stringify({ courseId })
    });
  }
}

// Instanciar API global si no existe
if (typeof window.api === 'undefined') {
  window.api = new ApiClient();
  console.log('API instanciada globalmente');
}