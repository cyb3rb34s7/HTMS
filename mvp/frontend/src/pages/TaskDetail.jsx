import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTaskById, updateTask } from '../store/slices/tasksSlice';

// Components
import TaskProgressTracker from '../components/tasks/TaskProgressTracker';
import AIInsightPanel from '../components/ai/AIInsightPanel';
import DependencyList from '../components/tasks/DependencyList';
import ActivityLog from '../components/tasks/ActivityLog';
import RelatedTasks from '../components/tasks/RelatedTasks';

const TaskDetail = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentTask, loading, error } = useSelector(state => state.tasks);
  const [progressData, setProgressData] = useState(null);
  const [aiInsights, setAiInsights] = useState(null);
  
  useEffect(() => {
    if (taskId) {
      dispatch(fetchTaskById(taskId));
      
      // In a real implementation, these would be API calls
      // For MVP, we'll use mock data
      
      // Mock DTPE data
      setProgressData({
        currentStage: 'development',
        stageProgress: 0.45,
        completedStages: ['planning', 'design'],
        remainingStages: ['testing', 'review', 'completed'],
        commitActivity: [
          { date: new Date(Date.now() - 86400000 * 6), count: 0 },
          { date: new Date(Date.now() - 86400000 * 5), count: 2 },
          { date: new Date(Date.now() - 86400000 * 4), count: 5 },
          { date: new Date(Date.now() - 86400000 * 3), count: 3 },
          { date: new Date(Date.now() - 86400000 * 2), count: 3 },
          { date: new Date(Date.now() - 86400000), count: 5 },
          { date: new Date(), count: 2 }
        ],
        predictedCompletion: new Date(Date.now() + 86400000 * 3)
      });
      
      // Mock AI insights
      setAiInsights({
        risks: [
          {
            type: 'dependency',
            title: 'Dependency Risk Detected',
            description: 'This task is blocked by "NLP Model Training" (Task #126). Based on current progress, this dependency may delay completion by 2 days.',
            impact: 'high',
            recommendation: 'Consider allocating additional resources to Task #126 or adjusting the timeline for this task.'
          }
        ],
        codeAnalysis: {
          complexity: 'medium',
          testCoverage: '65%',
          potentialIssues: [
            'API authentication not fully implemented',
            'Error handling needs improvement'
          ]
        },
        similarTasks: [
          { id: '129', title: 'Create Sentiment Dashboard UI', similarity: 0.85 },
          { id: '112', title: 'API Authentication Framework', similarity: 0.72 }
        ]
      });
    }
  }, [dispatch, taskId]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
        <button 
          className="mt-4 text-indigo-600 hover:text-indigo-800"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }
  
  if (!currentTask) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-900">Task not found</h2>
          <p className="mt-1 text-sm text-gray-500">
            The task you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <button 
            className="mt-4 text-indigo-600 hover:text-indigo-800"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Task Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {currentTask.tags?.[0] || 'Backend'}
                </span>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {currentTask.priority || 'High Priority'}
                </span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
              </button>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mt-2">
              {currentTask.title || 'Implement Sentiment Analysis API'}
            </h1>
            <p className="text-gray-600 mt-1">
              {currentTask.description || 'Create a robust API endpoint for sentiment analysis that integrates with the DTPE and provides real-time insights.'}
            </p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Edit Task
          </button>
        </div>
        
        {/* Task Meta */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500">Due Date</p>
            <p className="font-medium text-gray-800">
              {currentTask.dueDate ? new Date(currentTask.dueDate).toLocaleDateString() : 'Apr 8, 2025'}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500">Estimated Time</p>
            <p className="font-medium text-gray-800">
              {currentTask.estimatedHours || 16} hours
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500">Assignee</p>
            <div className="flex items-center mt-1">
              <img 
                src={currentTask.assignee?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"} 
                alt="Assignee" 
                className="w-5 h-5 rounded-full mr-2"
              />
              <p className="font-medium text-gray-800">
                {currentTask.assignee?.name || 'Alex Chen'}
              </p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500">Tags</p>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                API
              </span>
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                NLP
              </span>
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                ML
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Task Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Task Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Tracker */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Dynamic Task Progression
              </div>
            </h2>
            
            {progressData ? (
              <TaskProgressTracker data={progressData} />
            ) : (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            )}
            
            {progressData && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mt-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <span className="font-bold">Current Stage: Development</span>
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      Alex has committed 3 times to the feature branch in the last 2 days.
                      Based on commit patterns, development is progressing at expected pace.
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      Latest commit: a7d3f9c - "Add sentiment scoring function"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* AI Insights */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI Insights
              </div>
            </h2>
            
            {aiInsights ? (
              <AIInsightPanel insights={aiInsights} />
            ) : (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            )}
          </div>
          
          {/* Activity Log */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Activity Log</h2>
            
            <ActivityLog 
              activities={[
                {
                  id: 1,
                  user: { name: 'Alex Chen', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
                  action: 'pushed to feature/sentiment-api',
                  timestamp: new Date()
                },
                {
                  id: 2,
                  user: { name: 'Maya Patel', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
                  action: 'commented on this task',
                  timestamp: new Date(Date.now() - 86400000)
                },
                {
                  id: 3,
                  user: { name: 'System', avatar: '' },
                  action: 'flagged dependency risk',
                  timestamp: new Date(Date.now() - 86400000 * 1.5)
                },
                {
                  id: 4,
                  user: { name: 'Alex Chen', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
                  action: 'changed status to In Progress',
                  timestamp: new Date(Date.now() - 86400000 * 2)
                }
              ]}
            />
          </div>
        </div>
        
        {/* Right Column - Details and Related */}
        <div className="space-y-6">
          {/* Details */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Details</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Created by</p>
                <div className="flex items-center mt-1">
                  <img 
                    src="https://randomuser.me/api/portraits/men/75.jpg" 
                    alt="Creator" 
                    className="w-5 h-5 rounded-full mr-2"
                  />
                  <p className="font-medium text-gray-800">James Wilson</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Created on</p>
                <p className="font-medium text-gray-800">Apr 2, 2025</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="font-medium text-gray-800">Today at 9:45 AM</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Task ID</p>
                <p className="font-medium text-gray-800">#HTMS-127</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Sprint</p>
                <p className="font-medium text-gray-800">Sprint 4 (Apr 1 - Apr 15)</p>
              </div>
            </div>
          </div>
          
          {/* Dependencies */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                Dependencies
              </div>
            </h2>
            
            <DependencyList 
              dependencies={[
                {
                  id: '126',
                  title: 'NLP Model Training',
                  status: 'in-progress',
                  progress: 0.7
                },
                {
                  id: '112',
                  title: 'API Authentication Framework',
                  status: 'completed',
                  progress: 1
                }
              ]}
            />
          </div>
          
          {/* Related Tasks */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Related Tasks
              </div>
            </h2>
            
            <RelatedTasks 
              tasks={[
                {
                  id: '129',
                  title: 'Create Sentiment Dashboard UI',
                  status: 'to-do'
                },
                {
                  id: '130',
                  title: 'Implement Team Pulse Analytics',
                  status: 'to-do'
                }
              ]}
            />
          </div>
          
          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex space-x-2">
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  8 Comments
                </div>
              </button>
              <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  2 PRs
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
