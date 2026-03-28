import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Skill {
  _id: string;
  name: string;
  email?: string;
  category: string;
  level: number;
  years: number;
  color: string;
}

interface AdminSkillManagementProps {
  skills: Skill[];
  skillSearch: string;
  setSkillSearch: (v: string) => void;
  skillCategoryFilter: string;
  setSkillCategoryFilter: (v: string) => void;
  isAddingSkill: boolean;
  setIsAddingSkill: (v: boolean) => void;
  isEditingSkill: boolean;
  setIsEditingSkill: (v: boolean) => void;
  editSkillId: string | null;
  setEditSkillId: (v: string | null) => void;
  newSkill: { name: string; level: number; category: string; years: number; color: string };
  setNewSkill: (v: { name: string; level: number; category: string; years: number; color: string }) => void;
  skillProcessing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
}

const AdminSkillManagement: React.FC<AdminSkillManagementProps> = ({
  skills,
  skillSearch,
  setSkillSearch,
  skillCategoryFilter,
  setSkillCategoryFilter,
  isAddingSkill,
  setIsAddingSkill,
  isEditingSkill,
  setIsEditingSkill,
  editSkillId,
  setEditSkillId,
  newSkill,
  setNewSkill,
  skillProcessing,
  onSubmit,
  onEdit,
  onDelete,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [showAllSkills, setShowAllSkills] = useState(false);

  const toggleExpanded = (category: string) => {
    setExpandedCategories((prev: { [key: string]: boolean }) => ({ ...prev, [category]: !prev[category] }));
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Skills Management</h2>
        <button
          onClick={() => {
            if (isAddingSkill) {
              setIsEditingSkill(false);
              setEditSkillId(null);
              setNewSkill({ name: '', level: 0, category: 'frontend', years: 0, color: 'bg-blue-500' });
            }
            setIsAddingSkill(!isAddingSkill);
          }}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition ${isAddingSkill ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'}`}
        >
          {isAddingSkill ? 'Cancel' : '+ Add Skill'}
        </button>
      </div>

      {isAddingSkill && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-6 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">{isEditingSkill ? 'Edit Skill' : 'Create New Skill'}</h3>
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Skill Name</label>
              <input
                type="text"
                value={newSkill.name}
                onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                className="w-full px-3 py-2 border dark:border-gray-700 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="e.g. React"
                required
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
              <select
                value={newSkill.category}
                onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                className="w-full px-3 py-2 border dark:border-gray-700 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="design">Design</option>
                <option value="tools">Tools</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Proficiency Level ({newSkill.level}%)</label>
              <input
                type="range"
                min={0}
                max={100}
                value={newSkill.level}
                onChange={e => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg accent-blue-600"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Years</label>
              <input
                type="number"
                min={0}
                value={newSkill.years}
                onChange={e => setNewSkill({ ...newSkill, years: Number(e.target.value) })}
                className="w-full px-3 py-2 border dark:border-gray-700 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Badge Color</label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { value: 'bg-blue-500', title: 'Blue' },
                  { value: 'bg-green-500', title: 'Green' },
                  { value: 'bg-purple-500', title: 'Purple' },
                  { value: 'bg-yellow-500', title: 'Yellow' },
                  { value: 'bg-red-500', title: 'Red' }
                ].map((colorOption) => (
                  <button
                    key={colorOption.value}
                    type="button"
                    onClick={() => setNewSkill({ ...newSkill, color: colorOption.value })}
                    className={`h-9 rounded-lg border ${newSkill.color === colorOption.value ? 'border-black dark:border-white ring-2 ring-offset-1 ring-blue-500' : 'border-gray-300 dark:border-gray-700'} ${colorOption.value}`}
                    title={colorOption.title}
                  >
                    <span className="sr-only">{colorOption.title}</span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">Selected color: {newSkill.color.replace('bg-', '').replace('-500', '')}</p>
            </div>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                disabled={skillProcessing}
                className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 disabled:opacity-50"
              >
                {isEditingSkill ? (skillProcessing ? 'Saving...' : 'Save Skill') : (skillProcessing ? 'Adding...' : 'Add Skill')}
              </button>
              {isEditingSkill && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingSkill(false);
                    setEditSkillId(null);
                    setNewSkill({ name: '', level: 0, category: 'frontend', years: 0, color: 'bg-blue-500' });
                    setIsAddingSkill(false);
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </motion.div>
      )}

      <div className="mb-6 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search skills..."
          value={skillSearch}
          onChange={e => setSkillSearch(e.target.value)}
          className="flex-1 px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <select
          value={skillCategoryFilter}
          onChange={e => setSkillCategoryFilter(e.target.value)}
          className="px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <option value="All">All Categories</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="design">Design</option>
          <option value="tools">Tools</option>
        </select>        {skillCategoryFilter === 'All' && !showAllSkills && (
          <button
            onClick={() => setShowAllSkills(true)}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-500/20"
          >
            Display All Skills
          </button>
        )}
        {showAllSkills && (
          <button
            onClick={() => setShowAllSkills(false)}
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition"
          >
            Group by Category
          </button>
        )}      </div>

      {skills.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No skills added yet.</div>
      ) : skillCategoryFilter !== 'All' ? (
        // Single category view: show all filtered skills
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skills
            .filter(s => s.category === skillCategoryFilter && s.name.toLowerCase().includes(skillSearch.toLowerCase()))
            .map((skill) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col gap-4 group transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${skill.color}`}></div>
                    <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">{skill.name}</h3>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">{skill.category}</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase">{skill.years}y</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                  <div className={`${skill.color} h-full`} style={{ width: `${skill.level}%` }}></div>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold text-gray-600 dark:text-gray-300">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => onEdit(skill)} className="px-2.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition">
                    Update
                  </button>
                  <button onClick={() => onDelete(skill._id)} className="px-2.5 py-1.5 text-xs font-semibold text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition">
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
        </motion.div>
      ) : showAllSkills ? (
        // Display all skills in flat grid
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skills
            .filter(s => s.name.toLowerCase().includes(skillSearch.toLowerCase()))
            .map((skill) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col gap-4 group transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${skill.color}`}></div>
                    <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">{skill.name}</h3>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">{skill.category}</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase">{skill.years}y</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                  <div className={`${skill.color} h-full`} style={{ width: `${skill.level}%` }}></div>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold text-gray-600 dark:text-gray-300">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => onEdit(skill)} className="px-2.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition">
                    Update
                  </button>
                  <button onClick={() => onDelete(skill._id)} className="px-2.5 py-1.5 text-xs font-semibold text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition">
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
        </motion.div>
      ) : (
        // All categories view: group by category, limit to 6 per category
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {['frontend', 'backend', 'design', 'tools'].map(category => {
            const categorySkills = skills.filter(s => s.category === category && s.name.toLowerCase().includes(skillSearch.toLowerCase()));
            const isExpanded = expandedCategories[category] || false;
            const displayedSkills = isExpanded ? categorySkills : categorySkills.slice(0, 6);
            const hasMore = categorySkills.length > 6;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize">{category} Skills ({categorySkills.length})</h3>
                  {hasMore && (
                    <motion.button
                      onClick={() => toggleExpanded(category)}
                      className="px-3 py-1.5 text-sm font-semibold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isExpanded ? 'Show Less' : `See All (${categorySkills.length})`}
                    </motion.button>
                  )}
                </div>
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  <AnimatePresence>
                    {displayedSkills.map((skill) => (
                      <motion.div
                        key={skill._id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col gap-4 group transition-all hover:shadow-md"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${skill.color}`}></div>
                            <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">{skill.name}</h3>
                          </div>
                          <div className="flex gap-2 items-center">
                            <span className="text-[10px] font-bold text-gray-500 uppercase">{skill.category}</span>
                            <span className="text-[10px] font-bold text-gray-500 uppercase">{skill.years}y</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                          <div className={`${skill.color} h-full`} style={{ width: `${skill.level}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center text-xs font-semibold text-gray-600 dark:text-gray-300">
                          <span>Proficiency</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => onEdit(skill)} className="px-2.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition">
                            Update
                          </button>
                          <button onClick={() => onDelete(skill._id)} className="px-2.5 py-1.5 text-xs font-semibold text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition">
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default AdminSkillManagement;
