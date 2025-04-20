import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../context/AuthContext';

// Components
import AIConversation from '../components/ai/AIConversation';
import AISuggestions from '../components/ai/AISuggestions';
import ContextPanel from '../components/ai/ContextPanel';

const AIAssistant = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [contextData, setContextData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real implementation, these would be API calls
    // For MVP, we'll use mock data
    
    // Mock conversations
    setConversations([
      {
        id: 1,
        title: 'Sprint Planning Assistance',
        lastMessage: 'I need help planning the next sprint based on team capacity and priorities...',
        timestamp: new Date(),
        isActive: true
      },
      {
        id: 2,
        title: 'Task Dependency Analysis',
        lastMessage: 'Can you analyze the dependencies in our current sprint and identify potential bottlenecks?',
        timestamp: new Date(Date.now() - 86400000),
        isActive: false
      },
      {
        id: 3,
        title: 'Team Sentiment Report',
        lastMessage: 'Generate a report on team sentiment over the past month with key insights and recommendations.',
        timestamp: new Date(Date.now() - 86400000 * 2),
        isActive: false
      },
      {
        id: 4,
        title: 'Documentation Generator',
        lastMessage: 'Please create technical documentation for the new API endpoints based on our codebase.',
        timestamp: new Date(Date.now() - 86400000 * 4),
        isActive: false
      },
      {
        id: 5,
        title: 'Meeting Summarization',
        lastMessage: 'Summarize the key points and action items from our team retrospective meeting.',
        timestamp: new Date(Date.now() - 86400000 * 6),
        isActive: false
      }
    ]);
    
    // Set current conversation
    setCurrentConversation({
      id: 1,
      title: 'Sprint Planning Assistance',
      created: new Date()
    });
    
    // Mock messages for current conversation
    setMessages([
      {
        id: 1,
        sender: 'ai',
        content: "Hello Sarah! I'm your HTMS AI Assistant. I can help you with sprint planning, task management, team insights, and more. How can I assist you today?",
        timestamp: new Date(Date.now() - 300000)
      },
      {
        id: 2,
        sender: 'user',
        content: "I need help planning the next sprint based on team capacity and priorities. We have 10 high-priority tasks but I'm not sure if we can fit them all in.",
        timestamp: new Date(Date.now() - 240000)
      },
      {
        id: 3,
        sender: 'ai',
        content: "I'd be happy to help with your sprint planning, Sarah. I've analyzed your team's capacity and the high-priority tasks. Here's what I found:\n\n- Your team's total capacity for the next sprint is approximately 160 hours\n- The 10 high-priority tasks would require approximately 210 hours\n- 3 team members are at risk of overallocation (Alex, Maya, and James)\n- 2 tasks have external dependencies that might cause delays\n\nWould you like me to suggest an optimized sprint plan based on this analysis?",
        timestamp: new Date(Date.now() - 180000)
      },
      {
        id: 4,
        sender: 'user',
        content: "Yes, please suggest an optimized sprint plan. Also, can you identify which tasks we should prioritize and which ones could be moved to the next sprint?",
        timestamp: new Date(Date.now() - 120000)
      },
      {
        id: 5,
        sender: 'ai',
        content: "Based on my analysis, here's an optimized sprint plan that balances team capacity, task priorities, and dependencies:\n\n**Recommended Sprint Plan (7 tasks selected, 158 hours total):**\n- Implement Sentiment Analysis API (Alex, 16h)\n- Create Dashboard UI Components (Sarah, 24h)\n- Set Up CI/CD Pipeline for DTPE (Maya, 20h)\n- Implement User Authentication (James, 30h)\n- Create API Documentation (James, 16h)\n- Optimize Database Queries (Alex, 24h)\n- Fix Critical Bugs from Last Sprint (Sarah, 28h)\n\nThe following tasks are recommended for the next sprint due to capacity constraints and dependencies:\n- Implement Team Pulse Analytics (blocked by Sentiment Analysis API)\n- Create Mobile Responsive Views (lower priority than critical bugs)\n- Refactor Legacy Code (can be postponed with minimal impact)\n\nWould you like me to generate a detailed capacity report for each team member with this plan?",
        timestamp: new Date(Date.now() - 60000)
      }
    ]);
    
    // Mock suggestions
    setSuggestions([
      {
        id: 1,
        icon: 'chart-pie',
        title: 'Generate capacity report',
        description: 'Show detailed workload for each team member'
      },
      {
        id: 2,
        icon: 'exclamation-triangle',
        title: 'Analyze dependencies',
        description: 'Identify potential bottlenecks in the plan'
      },
      {
        id: 3,
        icon: 'calendar-alt',
        title: 'Create sprint schedule',
        description: 'Generate day-by-day task allocation'
      }
    ]);
    
    // Mock context data
    setContextData({
      sprint: {
        name: 'Sprint 4 (Apr 1 - Apr 15)',
        progress: 0.65,
        tasksTotal: 12,
        tasksCompleted: 8
      },
      teamCapacity: [
        { id: 1, name: 'Sarah Johnson', allocation: 0.85, tasks: 5 },
        { id: 2, name: 'Alex Chen', allocation: 0.65, tasks: 3 },
        { id: 3, name: 'Maya Patel', allocation: 0.95, tasks: 7 },
        { id: 4, name: 'James Wilson', allocation: 0.90, tasks: 6 }
      ],
      insights: [
        {
          id: 1,
          type: 'workload',
          title: 'Workload Imbalance',
          description: 'Maya and James are consistently overallocated in recent sprints. Consider redistributing tasks.'
        },
        {
          id: 2,
          type: 'velocity',
          title: 'Velocity Trend',
          description: 'Team velocity has increased by 12% over the last 3 sprints. Current capacity estimates are reliable.'
        }
      ],
      resources: [
        {
          id: 1,
          title: 'Sprint Planning Guide',
          description: 'Best practices for capacity planning'
        },
        {
          id: 2,
          title: 'Previous Sprint Report',
          description: 'Sprint 3 retrospective and metrics'
        }
      ]
    });
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        content: "I'll generate a detailed capacity report for each team member based on the optimized sprint plan.\n\n**Sarah Johnson (85% Allocated)**\n- Create Dashboard UI Components (24h)\n- Fix Critical Bugs from Last Sprint (28h)\n- Total: 52h of 60h capacity\n\n**Alex Chen (65% Allocated)**\n- Implement Sentiment Analysis API (16h)\n- Optimize Database Queries (24h)\n- Total: 40h of 60h capacity\n\n**Maya Patel (95% Allocated)**\n- Set Up CI/CD Pipeline for DTPE (20h)\n- Support tasks and meetings (36h)\n- Total: 56h of 60h capacity\n\n**James Wilson (90% Allocated)**\n- Implement User Authentication (30h)\n- Create API Documentation (16h)\n- Total: 46h of 50h capacity\n\nThis plan provides a more balanced workload while still addressing the highest priority items. Maya and James are still highly allocated, but this is an improvement from their previous allocation levels. Would you like me to suggest any further adjustments to this plan?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
      
      // Update suggestions based on new context
      setSuggestions([
        {
          id: 1,
          icon: 'exchange-alt',
          title: 'Suggest task reassignments',
          description: 'Optimize workload balance further'
        },
        {
          id: 2,
          icon: 'file-export',
          title: 'Export sprint plan',
          description: 'Save as PDF or share with team'
        },
        {
          id: 3,
          icon: 'tasks',
          title: 'Create tasks automatically',
          description: 'Generate all tasks in the system'
        }
      ]);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    // Add user message based on suggestion
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: suggestion.title,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse;
      
      if (suggestion.title === 'Generate capacity report') {
        aiResponse = {
          id: messages.length + 2,
          sender: 'ai',
          content: "I'll generate a detailed capacity report for each team member based on the optimized sprint plan.\n\n**Sarah Johnson (85% Allocated)**\n- Create Dashboard UI Components (24h)\n- Fix Critical Bugs from Last Sprint (28h)\n- Total: 52h of 60h capacity\n\n**Alex Chen (65% Allocated)**\n- Implement Sentiment Analysis API (16h)\n- Optimize Database Queries (24h)\n- Total: 40h of 60h capacity\n\n**Maya Patel (95% Allocated)**\n- Set Up CI/CD Pipeline for DTPE (20h)\n- Support tasks and meetings (36h)\n- Total: 56h of 60h capacity\n\n**James Wilson (90% Allocated)**\n- Implement User Authentication (30h)\n- Create API Documentation (16h)\n- Total: 46h of 50h capacity\n\nThis plan provides a more balanced workload while still addressing the highest priority items. Maya and James are still highly allocated, but this is an improvement from their previous allocation levels. Would you like me to suggest any further adjustments to this plan?",
          timestamp: new Date()
        };
      } else if (suggestion.title === 'Analyze dependencies') {
        aiResponse = {
          id: messages.length + 2,
          sender: 'ai',
          content: "I've analyzed the dependencies in the proposed sprint plan and identified the following potential bottlenecks:\n\n**Critical Path Dependencies:**\n1. **API Authentication Framework** → **Implement User Authentication** → **Implement Sentiment Analysis API**\n   - Risk Level: Medium\n   - Impact: Could delay completion of Sentiment Analysis API\n   - Mitigation: Ensure API Authentication Framework is fully tested before starting implementation\n\n2. **NLP Model Training** → **Implement Sentiment Analysis API**\n   - Risk Level: High\n   - Impact: Could block Sentiment Analysis API implementation\n   - Mitigation: Consider allocating additional resources to NLP Model Training or reducing scope\n\n**Skill Dependencies:**\n- Both Alex and James have tasks that require API expertise, creating potential resource contention\n- Maya is the only team member with CI/CD expertise, creating a single point of failure\n\nWould you like me to suggest a dependency mitigation plan?",
          timestamp: new Date()
        };
      } else {
        aiResponse = {
          id: messages.length + 2,
          sender: 'ai',
          content: "I've created a day-by-day sprint schedule to optimize task allocation and minimize context switching:\n\n**Week 1 (Apr 1 - Apr 5)**\n\n*Sarah:*\n- Mon-Wed: Fix Critical Bugs (21h)\n- Thu-Fri: Create Dashboard UI Components (14h)\n\n*Alex:*\n- Mon-Tue: Optimize Database Queries (16h)\n- Wed-Fri: Implement Sentiment Analysis API (16h)\n\n*Maya:*\n- Mon-Wed: Set Up CI/CD Pipeline (20h)\n- Thu-Fri: Support tasks (16h)\n\n*James:*\n- Mon-Thu: Implement User Authentication (30h)\n- Fri: Create API Documentation (8h)\n\n**Week 2 (Apr 8 - Apr 12)**\n\n*Sarah:*\n- Mon-Tue: Complete Dashboard UI Components (10h)\n- Wed-Fri: Support and testing (18h)\n\n*Alex:*\n- Mon-Tue: Complete Sentiment Analysis API (8h)\n- Wed-Fri: Complete Database Queries (8h)\n\n*Maya:*\n- Mon-Fri: Support tasks and meetings (20h)\n\n*James:*\n- Mon: Complete API Documentation (8h)\n- Tue-Fri: Support and testing (24h)\n\nThis schedule minimizes context switching while ensuring critical path tasks are completed early. Would you like me to make any adjustments to this schedule?",
          timestamp: new Date()
        };
      }
      
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
      
      // Update suggestions based on new context
      setSuggestions([
        {
          id: 1,
          icon: 'exchange-alt',
          title: 'Suggest task reassignments',
          description: 'Optimize workload balance further'
        },
        {
          id: 2,
          icon: 'file-export',
          title: 'Export sprint plan',
          description: 'Save as PDF or share with team'
        },
        {
          id: 3,
          icon: 'tasks',
          title: 'Create tasks automatically',
          description: 'Generate all tasks in the system'
        }
      ]);
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Left Panel - Conversations */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Conversations</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {conversations.map(conversation => (
              <div 
                key={conversation.id}
                className={`${
                  conversation.isActive 
                    ? 'bg-indigo-50 border-l-4 border-indigo-600' 
                    : 'hover:bg-gray-50'
                } p-3 rounded-lg mb-2 cursor-pointer`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{conversation.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {conversation.timestamp.toLocaleString(undefined, {
                        weekday: 'long',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      })}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
                <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                  {conversation.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <AIConversation 
              messages={messages} 
              loading={loading} 
              currentUser={currentUser}
            />
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="bg-white border-t border-gray-200 p-4">
          <AISuggestions 
            suggestions={suggestions} 
            onSuggestionClick={handleSuggestionClick}
          />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <textarea 
                className="w-full border border-gray-300 rounded-lg pl-4 pr-20 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                rows="2" 
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              ></textarea>
              <div className="absolute right-3 top-3 flex space-x-2">
                <button className="text-gray-500 hover:text-indigo-600">
                  <i className="far fa-smile"></i>
                </button>
                <button className="text-gray-500 hover:text-indigo-600">
                  <i className="fas fa-paperclip"></i>
                </button>
                <button 
                  className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={handleSendMessage}
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <div>
                <span>AI Assistant can access your project data to provide personalized help</span>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800">
                <i className="fas fa-cog mr-1"></i> Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Context & Insights */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Context & Insights</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contextData && (
            <ContextPanel data={contextData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
