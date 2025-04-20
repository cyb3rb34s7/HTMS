// Backend API structure for HTMS MVP
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/htms', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Models
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'developer'], default: 'developer' },
  skills: [String],
  avatar: String,
  createdAt: { type: Date, default: Date.now }
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { 
    type: String, 
    enum: ['planning', 'design', 'development', 'testing', 'review', 'completed'], 
    default: 'planning' 
  },
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dueDate: Date,
  estimatedHours: Number,
  tags: [String],
  progress: { type: Number, default: 0 },
  dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['planning', 'active', 'completed'], default: 'planning' },
  createdAt: { type: Date, default: Date.now }
});

const sentimentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  sentiment: { type: Number, min: -1, max: 1 }, // -1 to 1 scale
  source: String, // e.g., 'slack', 'email', 'comment'
  anonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);
const Team = mongoose.model('Team', teamSchema);
const Project = mongoose.model('Project', projectSchema);
const Sentiment = mongoose.model('Sentiment', sentimentSchema);

// Authentication middleware
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

// Routes

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });
    
    await user.save();
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );
    
    res.status(201).send({ user: { id: user._id, name, email, role }, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );
    
    res.send({ 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }, 
      token 
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// User routes
app.get('/api/users', auth, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/api/users/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Task routes
app.post('/api/tasks', auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      reporter: req.userId
    });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/api/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({})
      .populate('assignee', 'name email avatar')
      .populate('reporter', 'name email avatar')
      .populate('dependencies', 'title status');
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/api/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignee', 'name email avatar')
      .populate('reporter', 'name email avatar')
      .populate('dependencies', 'title status');
    
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    
    res.send(task);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.patch('/api/tasks/:id', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    
    updates.forEach(update => task[update] = req.body[update]);
    task.updatedAt = Date.now();
    
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Team routes
app.post('/api/teams', auth, async (req, res) => {
  try {
    const team = new Team({
      ...req.body,
      lead: req.userId
    });
    await team.save();
    res.status(201).send(team);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/api/teams', auth, async (req, res) => {
  try {
    const teams = await Team.find({})
      .populate('members', 'name email avatar')
      .populate('lead', 'name email avatar');
    res.send(teams);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Project routes
app.post('/api/projects', auth, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/api/projects', auth, async (req, res) => {
  try {
    const projects = await Project.find({})
      .populate({
        path: 'teams',
        populate: {
          path: 'members',
          select: 'name email avatar'
        }
      });
    res.send(projects);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// DTPE (Dynamic Task Progression Engine) routes
app.get('/api/dtpe/task-progress/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    
    // In a real implementation, this would analyze GitHub/GitLab activity
    // For MVP, we'll simulate this with random data
    const stages = ['planning', 'design', 'development', 'testing', 'review', 'completed'];
    const currentStageIndex = stages.indexOf(task.status);
    
    const progressData = {
      task: task._id,
      title: task.title,
      currentStage: task.status,
      stageProgress: task.progress,
      completedStages: stages.slice(0, currentStageIndex),
      remainingStages: stages.slice(currentStageIndex + 1),
      predictedCompletion: new Date(Date.now() + 86400000 * 3), // 3 days from now
      commitActivity: [
        { date: new Date(Date.now() - 86400000 * 2), count: 3 },
        { date: new Date(Date.now() - 86400000), count: 5 },
        { date: new Date(), count: 2 }
      ],
      bottlenecks: currentStageIndex < 2 ? [] : [
        {
          type: 'dependency',
          description: 'Waiting on API documentation',
          impact: 'medium'
        }
      ]
    };
    
    res.send(progressData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Sentiment Analysis routes
app.post('/api/sentiment', auth, async (req, res) => {
  try {
    const sentiment = new Sentiment({
      ...req.body,
      user: req.userId
    });
    await sentiment.save();
    res.status(201).send(sentiment);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/api/sentiment/team/:teamId', auth, async (req, res) => {
  try {
    // In a real implementation, this would analyze communication channels
    // For MVP, we'll simulate this with random data
    
    const team = await Team.findById(req.params.teamId)
      .populate('members', 'name email avatar');
    
    if (!team) {
      return res.status(404).send({ error: 'Team not found' });
    }
    
    const teamMembers = team.members;
    const sentimentData = {
      team: team._id,
      teamName: team.name,
      overallSentiment: Math.random() * 0.5 + 0.3, // Random between 0.3 and 0.8
      sentimentTrend: [
        { date: new Date(Date.now() - 86400000 * 6), value: Math.random() * 0.6 + 0.2 },
        { date: new Date(Date.now() - 86400000 * 5), value: Math.random() * 0.6 + 0.2 },
        { date: new Date(Date.now() - 86400000 * 4), value: Math.random() * 0.6 + 0.2 },
        { date: new Date(Date.now() - 86400000 * 3), value: Math.random() * 0.6 + 0.2 },
        { date: new Date(Date.now() - 86400000 * 2), value: Math.random() * 0.6 + 0.2 },
        { date: new Date(Date.now() - 86400000), value: Math.random() * 0.6 + 0.2 },
        { date: new Date(), value: Math.random() * 0.6 + 0.2 }
      ],
      memberSentiment: teamMembers.map(member => ({
        user: member._id,
        name: member.name,
        avatar: member.avatar,
        sentiment: Math.random() * 0.8 - 0.2, // Random between -0.2 and 0.6
        trend: 'stable'
      })),
      riskFactors: [
        {
          type: 'workload',
          description: 'High workload detected for 2 team members',
          impact: 'medium'
        }
      ]
    };
    
    // Identify at-risk members
    sentimentData.atRiskMembers = sentimentData.memberSentiment
      .filter(m => m.sentiment < 0)
      .map(m => ({
        user: m.user,
        name: m.name,
        sentiment: m.sentiment,
        factors: ['High workload', 'Consecutive weekend work']
      }));
    
    res.send(sentimentData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Workload Optimization routes
app.get('/api/workload/team/:teamId', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId)
      .populate('members', 'name email avatar skills');
    
    if (!team) {
      return res.status(404).send({ error: 'Team not found' });
    }
    
    const tasks = await Task.find({ 
      assignee: { $in: team.members.map(m => m._id) }
    });
    
    // In a real implementation, this would analyze task assignments and capacity
    // For MVP, we'll simulate this with calculated data
    
    const teamMembers = team.members;
    const workloadData = {
      team: team._id,
      teamName: team.name,
      overallBalance: Math.random() * 0.3 + 0.6, // Random between 0.6 and 0.9
      memberWorkload: teamMembers.map(member => {
        const memberTasks = tasks.filter(t => 
          t.assignee && t.assignee.toString() === member._id.toString()
        );
        
        const totalEstimatedHours = memberTasks.reduce(
          (sum, task) => sum + (task.estimatedHours || 0), 0
        );
        
        const capacity = Math.floor(Math.random() * 40) + 20; // Random between 20 and 60 hours
        const allocation = Math.min(totalEstimatedHours / capacity, 1);
        
        return {
          user: member._id,
          name: member.name,
          avatar: member.avatar,
          skills: member.skills,
          capacity,
          allocation,
          activeTasks: memberTasks.length,
          focusArea: memberTasks.length > 0 
            ? memberTasks[0].tags[0] || 'General'
            : 'Unassigned'
        };
      }),
      recommendations: [
        {
          type: 'rebalance',
          description: 'Redistribute 2 tasks from Maya to Alex to balance workload',
          impact: 'high'
        },
        {
          type: 'skill-match',
          description: 'Assign API documentation to James based on skill match',
          impact: 'medium'
        }
      ]
    };
    
    res.send(workloadData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// AI Assistant routes
app.post('/api/ai/assistant/message', auth, async (req, res) => {
  try {
    const { message } = req.body;
    
    // In a real implementation, this would use a language model
    // For MVP, we'll simulate responses based on keywords
    
    let response;
    
    if (message.toLowerCase().includes('sprint plan')) {
      response = {
        text: "I've analyzed your team's capacity and the high-priority tasks. Here's what I found:\n\n" +
              "- Your team's total capacity for the next sprint is approximately 160 hours\n" +
              "- The 10 high-priority tasks would require approximately 210 hours\n" +
              "- 3 team members are at risk of overallocation (Alex, Maya, and James)\n" +
              "- 2 tasks have external dependencies that might cause delays\n\n" +
              "Would you like me to suggest an optimized sprint plan based on this analysis?",
        suggestions: [
          "Generate capacity report",
          "Analyze dependencies",
          "Create sprint schedule"
        ],
        contextData: {
          teamCapacity: 160,
          taskDemand: 210,
          overallocatedMembers: ["Alex", "Maya", "James"],
          dependencyRisks: 2
        }
      };
    } else if (message.toLowerCase().includes('team sentiment') || message.toLowerCase().includes('morale')) {
      response = {
        text: "I've analyzed the team sentiment over the past 2 weeks. Overall sentiment is positive (78%), which is a 12% improvement from last month. However, I've detected potential burnout signals for Maya and James based on their communication patterns and working hours. Would you like me to generate a detailed report with recommendations?",
        suggestions: [
          "Generate detailed sentiment report",
          "View burnout risk factors",
          "Schedule team check-in"
        ],
        contextData: {
          overallSentiment: 0.78,
          sentimentTrend: "+12%",
          atRiskMembers: ["Maya", "James"],
          recommendedActions: 3
        }
      };
    } else if (message.toLowerCase().includes('documentation') || message.toLowerCase().includes('docs')) {
      response = {
        text: "I can help generate documentation based on your codebase and existing comments. What type of documentation do you need? I can create API documentation, user guides, or technical specifications.",
        suggestions: [
          "Generate API documentation",
          "Create user guide",
          "Update technical specifications"
        ],
        contextData: {
          recentCodeChanges: 47,
          documentationGaps: ["API endpoints", "Authentication flow"],
          lastDocUpdate: "14 days ago"
        }
      };
    } else {
      response = {
        text: "I'm your HTMS AI Assistant. I can help with sprint planning, task management, team insights, and more. How can I assist you today?",
        suggestions: [
          "Help with sprint planning",
          "Analyze team workload",
          "Generate project report"
        ],
        contextData: {
          activeProjects: 2,
          pendingTasks: 15,
          upcomingDeadlines: 3
        }
      };
    }
    
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
