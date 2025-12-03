import React, { useState } from 'react';
import { DaySchedule, Activity } from '../types';
import { 
  MapPinIcon, 
  EditIcon, 
  SaveIcon, 
  ChevronDownIcon, 
  ClockIcon, 
  PlusIcon, 
  TrashIcon,
  GripIcon 
} from './Icons';

interface DayCardProps {
  day: DaySchedule;
  isActive: boolean;
  onToggle: () => void;
  onUpdate: (updatedDay: DaySchedule) => void;
}

const DayCard: React.FC<DayCardProps> = ({ day, isActive, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDay, setEditedDay] = useState<DaySchedule>(day);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Sync prop changes to local state if not editing
  React.useEffect(() => {
    if (!isEditing) {
      setEditedDay(day);
    }
  }, [day, isEditing]);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    onUpdate(editedDay);
    setIsEditing(false);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsEditing(true);
    if (!isActive) onToggle();
  };

  const updateActivity = (index: number, field: keyof Activity, value: string) => {
    const newActivities = [...editedDay.activities];
    newActivities[index] = { ...newActivities[index], [field]: value };
    setEditedDay({ ...editedDay, activities: newActivities });
  };

  const handleAddActivity = () => {
    const newActivity: Activity = {
      id: `new-${Date.now()}`, // Simple ID generation
      time: '00:00',
      description: '新行程',
      location: '',
      note: ''
    };
    setEditedDay({
      ...editedDay,
      activities: [...editedDay.activities, newActivity]
    });
  };

  const handleDeleteActivity = (index: number) => {
    if (window.confirm('確定要刪除這個行程嗎？')) {
      const newActivities = editedDay.activities.filter((_, i) => i !== index);
      setEditedDay({ ...editedDay, activities: newActivities });
    }
  };

  // Drag and Drop Logic
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    
    // Create a copy of activities
    const newActivities = [...editedDay.activities];
    // Get the item being dragged
    const draggedItem = newActivities[draggedIndex];
    
    // Remove it from original position
    newActivities.splice(draggedIndex, 1);
    // Insert it at the new position
    newActivities.splice(index, 0, draggedItem);
    
    // Update state
    setEditedDay({ ...editedDay, activities: newActivities });
    // Update drag index to track the item in its new position
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className={`mb-6 rounded-xl transition-all duration-300 overflow-hidden ${isActive ? 'shadow-lg bg-white ring-1 ring-zen-pink/30' : 'shadow-sm bg-white/60 hover:bg-white'}`}>
      {/* Header Section */}
      <div 
        className="cursor-pointer p-5 flex items-center justify-between border-l-8 border-zen-blue"
        onClick={onToggle}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-zen-pink uppercase tracking-wider text-sm">Day {day.id.replace('day', '')}</span>
            <span className="text-gray-400 text-sm">|</span>
            <span className="text-gray-500 text-sm font-medium">{day.date} ({day.dayOfWeek})</span>
          </div>
          <h3 className="text-xl md:text-2xl font-serif text-zen-blue font-bold">{day.title}</h3>
        </div>
        
        <div className="flex items-center gap-3">
          {isEditing ? (
            <button 
              onClick={handleSave}
              className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
              aria-label="Save"
            >
              <SaveIcon className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={handleEditClick}
              className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-zen-pink hover:text-white transition-colors"
              aria-label="Edit"
            >
              <EditIcon className="w-5 h-5" />
            </button>
          )}
          <div className={`transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
            <ChevronDownIcon className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      {isActive && (
        <div className="p-5 pt-0 border-t border-gray-100 bg-white">
          <div className="mt-4 space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {editedDay.activities.map((activity, idx) => (
              <div 
                key={activity.id} 
                className={`relative flex items-start group transition-all duration-200 ${isEditing ? 'cursor-move' : ''} ${draggedIndex === idx ? 'opacity-40 scale-95' : 'opacity-100'}`}
                draggable={isEditing}
                onDragStart={() => handleDragStart(idx)}
                onDragEnter={() => handleDragEnter(idx)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
              >
                {/* Timeline Dot / Grip Handle */}
                <div className={`absolute left-0 mt-1.5 ml-0.5 h-4 w-4 rounded-full border-2 border-white shadow z-10 flex items-center justify-center ${isEditing ? 'bg-zen-pink cursor-move' : 'bg-zen-blue'}`}>
                  {isEditing && <GripIcon className="w-3 h-3 text-white" />}
                </div>
                
                <div className="ml-8 w-full">
                  {isEditing ? (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex gap-2 mb-2">
                        <input 
                          type="text" 
                          value={activity.time}
                          onChange={(e) => updateActivity(idx, 'time', e.target.value)}
                          className="w-20 p-2 text-sm border rounded focus:ring-2 focus:ring-zen-blue outline-none font-mono"
                          placeholder="時間"
                        />
                        <input 
                          type="text" 
                          value={activity.location || ''}
                          onChange={(e) => updateActivity(idx, 'location', e.target.value)}
                          className="flex-1 p-2 text-sm border rounded focus:ring-2 focus:ring-zen-blue outline-none"
                          placeholder="地點 (Google Map 關鍵字)"
                        />
                        <button 
                           onClick={() => handleDeleteActivity(idx)}
                           className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                           title="刪除"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea 
                        value={activity.description}
                        onChange={(e) => updateActivity(idx, 'description', e.target.value)}
                        className="w-full p-2 text-base font-bold border rounded focus:ring-2 focus:ring-zen-blue outline-none text-zen-blue mb-2"
                        rows={1}
                        placeholder="行程內容"
                      />
                      <textarea 
                        value={activity.note || ''}
                        onChange={(e) => updateActivity(idx, 'note', e.target.value)}
                        className="w-full p-2 text-sm text-gray-600 border rounded focus:ring-2 focus:ring-zen-blue outline-none"
                        rows={2}
                        placeholder="備註 / 貼心提醒"
                      />
                    </div>
                  ) : (
                    // View Mode
                    <div className="bg-zen-bg/30 p-4 rounded-lg hover:bg-zen-bg/60 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 font-mono font-bold text-zen-pink text-lg bg-white px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                             <ClockIcon className="w-4 h-4" /> {activity.time}
                          </span>
                          <h4 className="text-lg font-bold text-zen-text">{activity.description}</h4>
                        </div>
                        
                        {activity.location && (
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-zen-blue bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors self-start whitespace-nowrap"
                          >
                            <MapPinIcon className="w-4 h-4" />
                            <span>地圖</span>
                          </a>
                        )}
                      </div>
                      
                      {activity.note && (
                        <p className="text-gray-600 text-sm leading-relaxed border-l-4 border-gray-200 pl-3 italic">
                          {activity.note}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Button in Edit Mode */}
          {isEditing && (
             <div className="mt-6 ml-8">
               <button 
                 onClick={handleAddActivity}
                 className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-500 hover:border-zen-pink hover:text-zen-pink transition-colors flex items-center justify-center gap-2"
               >
                 <PlusIcon className="w-5 h-5" />
                 <span>新增行程</span>
               </button>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DayCard;