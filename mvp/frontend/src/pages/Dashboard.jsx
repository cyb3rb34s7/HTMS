import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, updateTaskProgress } from '../store/slices/tasksSlice';
import { useAuth } from '../context/AuthContext';

// Components
import TaskCard from '../components/tasks/TaskCard';
import AIInsightCard from '../components/ai/AIInsightCard';
import TeamPulseWidget from '../components/team/TeamPulseWidget';
import WorkloadChart from '../components/charts/WorkloadChart';
import ProjectProgress from '../components/projects/ProjectProgress';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { tasks, loading, error } = useSelector(state => state.tasks);
  const [insights, setInsights] = useState([]);
  const [teamPulse, setTeamPulse] = useState(null);
  const [workload, setWorkload] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
    
    // In a real implementation, these would be API calls
    // For MVP, we'll use mock data
    
    // Mock AI insights
    setInsights([
      {
        id: 1,
        type: 'risk',
        title: 'Dependency Risk Detected',
        description: 'Task "Implement Sentiment Analysis API" is blocked by "NLP Model Training" which is behind schedule.',
        impact: 'high',
        actions: ['Reassign resources', 'Adjust timeline']
      },
      {
        id: 2,
        type: 'optimization',
        title: 'Workload Imbalance',
        description: 'Maya and James are consistently overallocated in recent sprints. Consider redistributing tasks.',
        impact: 'medium',
        actions: ['View team workload', 'Suggest rebalancing']
      },
      {
        id: 3,
        type: 'trend',
        title: 'Velocity Trend',
        description: 'Team velocity has increased by 12% over the last 3 sprints. Current capacity estimates are reliable.',
        impact: 'positive',
        actions: ['View velocity chart', 'Adjust capacity']
      }
    ]);
    
    // Mock team pulse data
    setTeamPulse({
      overallSentiment: 0.75, // 0 to 1 scale
      trend: 'increasing',
      riskMembers: 1,
      lastUpdated: new Date()
    });
    
    // Mock workload data
    setWorkload({
      teamMembers: [
        { id: 1, name: 'Sarah Johnson', allocation: 0.85, tasks: 5 },
        { id: 2, name: 'Alex Chen', allocation: 0.65, tasks: 3 },
        { id: 3, name: 'Maya Patel', allocation: 0.95, tasks: 7 },
        { id: 4, name: 'James Wilson', allocation: 0.90, tasks: 6 }
      ],
      overallBalance: 0.7 // 0 to 1 scale
    });
  }, [dispatch]);

  // Filter tasks for different sections
  const myTasks = tasks.filter(task => task.assignee?.id === currentUser?.id);
  const recentActivity = [...tasks].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5);
  const highPriorityTasks = tasks.filter(task => task.priority === 'high' || task.priority === 'critical');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {currentUser?.name}!</p>
      </div>
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Tasks and Activity */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Insights */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">AI Insights</h2>
            <div className="space-y-3">
              {insights.map(insight => (
                <AIInsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
          
          {/* My Tasks */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">My Tasks</h2>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View All
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-4">{error}</div>
            ) : myTasks.length === 0 ? (
              <div className="text-gray-500 text-center py-4">No tasks assigned to you</div>
            ) : (
              <div className="space-y-3">
                {myTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
            
            {recentActivity.length === 0 ? (
              <div className="text-gray-500 text-center py-4">No recent activity</div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map(task => (
                  <div key={task.id} className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                      {task.status === 'completed' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">{task.assignee?.name || 'Unassigned'}</span>
                        {' '}
                        {task.status === 'completed' ? 'completed' : 'updated'}
                        {' '}
                        <span className="font-medium">{task.title}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(task.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column - Team and Project */}
        <div className="space-y-6">
          
          {/* Team Pulse */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Team Pulse</h2>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View Details
              </button>
            </div>
            
            {teamPulse ? (
              <TeamPulseWidget data={teamPulse} />
            ) : (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            )}
          </div>
          
          {/* Team Workload */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Team Workload</h2>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                Optimize
              </button>
            </div>
            
            {workload ? (
              <WorkloadChart data={workload} />
            ) : (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            )}
          </div>
          
          {/* High Priority Tasks */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">High Priority</h2>
            
            {highPriorityTasks.length === 0 ? (
              <div className="text-gray-500 text-center py-4">No high priority tasks</div>
            ) : (
              <div className="space-y-3">
                {highPriorityTasks.slice(0, 3).map(task => (
                  <TaskCard key={task.id} task={task} compact />
                ))}
                
                {highPriorityTasks.length > 3 && (
                  <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-800 font-medium py-2">
                    View {highPriorityTasks.length - 3} more
                  </button>
                )}
              </div>
            )}
          </div>
          
          {/* Project Progress */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Project Progress</h2>
            
            <ProjectProgress 
              project={{
                name: 'HTMS Development',
                progress: 0.65,
                startDate: new Date('2025-04-01'),
                endDate: new Date('2025-04-15'),
                tasks: {
                  total: 12,
                  completed: 8
                }
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
