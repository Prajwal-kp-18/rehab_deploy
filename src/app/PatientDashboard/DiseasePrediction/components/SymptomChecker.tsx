// 'use client';
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowRight, Search, Clock, AlertTriangle, ThermometerSun } from 'lucide-react';

// interface SymptomCheckerProps {
//   onSubmit: (symptoms: string[], additionalInfo: any) => void;
// }

// const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onSubmit }) => {
//   const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [additionalInfo, setAdditionalInfo] = useState({
//     duration: '',
//     severity: 'moderate',
//     bodyTemperature: '',
//     recentTravel: false,
//     recentMedication: '',
//   });

//   // List of common symptoms
//   const allSymptoms = [
//     'abdominal_pain',
//     'abnormal_menstruation',
//     'acidity',
//     'acute_liver_failure',
//     'altered_sensorium',
//     'anxiety',
//     'back_pain',
//     'belly_pain',
//     'blackheads',
//     'bladder_discomfort',
//     'blister',
//     'blood_in_sputum',
//     'bloody_stool',
//     'blurred_and_distorted_vision',
//     'breathlessness',
//     'brittle_nails',
//     'bruising',
//     'burning_micturition',
//     'chest_pain',
//     'chills',
//     'cold_hands_and_feets',
//     'coma',
//     'congestion',
//     'constipation',
//     'continuous_feel_of_urine',
//     'continuous_sneezing',
//     'cough',
//     'cramps',
//     'dark_urine',
//     'dehydration',
//     'depression',
//     'diarrhoea',
//     'distention_of_abdomen',
//     'dizziness',
//     'drying_and_tingling_lips',
//     'enlarged_thyroid',
//     'excessive_hunger',
//     'extra_marital_contacts',
//     'family_history',
//     'fast_heart_rate',
//     'fatigue',
//     'fluid_overload',
//     'headache',
//     'high_fever',
//     'hip_joint_pain',
//     'history_of_alcohol_consumption',
//     'increased_appetite',
//     'indigestion',
//     'inflammatory_nails',
//     'internal_itching',
//     'irregular_sugar_level',
//     'irritability',
//     'irritation_in_anus',
//     'itching',
//     'joint_pain',
//     'knee_pain',
//     'lack_of_concentration',
//     'lethargy',
//     'loss_of_appetite',
//     'loss_of_balance',
//     'loss_of_smell',
//     'malaise',
//     'mild_fever',
//     'mood_swings',
//     'movement_stiffness',
//     'mucoid_sputum',
//     'muscle_pain',
//     'muscle_wasting',
//     'muscle_weakness',
//     'nausea',
//     'neck_pain',
//     'nodal_skin_eruptions',
//     'obesity',
//     'pain_behind_the_eyes',
//     'pain_during_bowel_movements',
//     'pain_in_anal_region',
//     'painful_walking',
//     'palpitations',
//     'passage_of_gases',
//     'patches_in_throat',
//     'phlegm',
//     'polyuria',
//     'prominent_veins_on_calf',
//     'puffy_face_and_eyes',
//     'pus_filled_pimples',
//     'receiving_blood_transfusion',
//     'receiving_unsterile_injections',
//     'red_sore_around_nose',
//     'red_spots_over_body',
//     'redness_of_eyes',
//     'restlessness',
//     'runny_nose',
//     'rusty_sputum',
//     'scurring',
//     'shivering',
//     'silver_like_dusting',
//     'sinus_pressure',
//     'skin_peeling',
//     'skin_rash',
//     'slurred_speech',
//     'small_dents_in_nails',
//     'spinning_movements',
//     'stiff_neck',
//     'stomach_bleeding',
//     'stomach_pain',
//     'sunken_eyes',
//     'sweating',
//     'swelled_lymph_nodes',
//     'swelling_joints',
//     'swelling_of_stomach',
//     'swollen_blood_vessels',
//     'swollen_extremeties',
//     'swollen_legs',
//     'throat_irritation',
//     'toxiclook(typhos)',
//     'ulcers_on_tongue',
//     'unsteadiness',
//     'visual_disturbances',
//     'vomiting',
//     'watering_from_eyes',
//     'weakness_in_limbs',
//     'weakness_of_one_body_side',
//     'weight_gain',
//     'weight_loss',
//     'yellow_crust_ooze',
//     'yellow_urine',
//     'yellowing_of_eyes',
//     'yellowish_skin'
//   ];

//   // Filter symptoms based on search term
//   const filteredSymptoms = allSymptoms.filter(symptom => 
//     symptom.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSymptomToggle = (symptom: string) => {
//     setSelectedSymptoms(prev => 
//       prev.includes(symptom) 
//         ? prev.filter(s => s !== symptom) 
//         : [...prev, symptom]
//     );
//   };

//   const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target as HTMLInputElement;
//     setAdditionalInfo(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (selectedSymptoms.length === 0) {
//       alert('Please select at least one symptom');
//       return;
//     }
//     onSubmit(selectedSymptoms, additionalInfo);
//   };

//   return (
//     <div className="max-w-7xl mx-auto">
//       <motion.div 
//         className="bg-white rounded-2xl shadow-lg overflow-hidden"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-6 px-8">
//           <h2 className="text-2xl font-bold text-white">Symptom Checker</h2>
//           <p className="text-blue-50">Select your symptoms and provide additional details for accurate analysis</p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="p-8">
//           {/* Symptom Search */}
//           <motion.div 
//             className="mb-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.1 }}
//           >
//             <label className="block text-gray-700 font-medium mb-2 flex items-center">
//               <Search size={18} className="mr-2 text-blue-500" />
//               Search and Select Symptoms
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pl-10"
//                 placeholder="Type to search symptoms..."
//               />
//               <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
//             </div>
//           </motion.div>
          
//           {/* Symptom Selection */}
//           <motion.div 
//             className="mb-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             <div className="text-gray-700 font-medium mb-3">
//               {selectedSymptoms.length === 0 ? (
//                 <span className="text-gray-500">No symptoms selected</span>
//               ) : (
//                 <span>Selected Symptoms: <span className="text-blue-500 font-semibold">{selectedSymptoms.length}</span></span>
//               )}
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//               {filteredSymptoms.map((symptom, index) => (
//                 <motion.button
//                   key={symptom}
//                   type="button"
//                   onClick={() => handleSymptomToggle(symptom)}
//                   className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     selectedSymptoms.includes(symptom)
//                       ? 'bg-blue-500 text-white shadow-md'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 + (index % 10) * 0.03 }}
//                 >
//                   {symptom}
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
          
//           <div className="border-t border-gray-200 pt-6 mt-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Duration */}
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 <label className="block text-gray-700 font-medium mb-2 flex items-center">
//                   <Clock size={18} className="mr-2 text-blue-500" />
//                   Duration of Symptoms
//                 </label>
//                 <select
//                   name="duration"
//                   value={additionalInfo.duration}
//                   onChange={handleInfoChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 >
//                   <option value="">Select duration</option>
//                   <option value="today">Started today</option>
//                   <option value="few-days">Few days</option>
//                   <option value="week">About a week</option>
//                   <option value="weeks">Several weeks</option>
//                   <option value="month">A month or more</option>
//                 </select>
//               </motion.div>
              
//               {/* Severity */}
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <label className="block text-gray-700 font-medium mb-2 flex items-center">
//                   <AlertTriangle size={18} className="mr-2 text-blue-500" />
//                   Severity
//                 </label>
//                 <select
//                   name="severity"
//                   value={additionalInfo.severity}
//                   onChange={handleInfoChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 >
//                   <option value="mild">Mild - Noticeable but not interfering with daily activities</option>
//                   <option value="moderate">Moderate - Somewhat interfering with daily activities</option>
//                   <option value="severe">Severe - Significantly interfering with daily activities</option>
//                   <option value="very-severe">Very Severe - Unable to perform daily activities</option>
//                 </select>
//               </motion.div>
              
//               {/* Body Temperature */}
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <label className="block text-gray-700 font-medium mb-2 flex items-center">
//                   <ThermometerSun size={18} className="mr-2 text-blue-500" />
//                   Body Temperature (°C, if known)
//                 </label>
//                 <input
//                   type="text"
//                   name="bodyTemperature"
//                   value={additionalInfo.bodyTemperature}
//                   onChange={handleInfoChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   placeholder="e.g., 37.5"
//                 />
//               </motion.div>
              
//               {/* Recent Travel */}
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.6 }}
//               >
//                 <label className="flex items-center text-gray-700 font-medium cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="recentTravel"
//                     checked={additionalInfo.recentTravel}
//                     onChange={handleInfoChange}
//                     className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-500 mr-2"
//                   />
//                   Recent travel in the last 14 days
//                 </label>
//               </motion.div>
              
//               {/* Recent Medication */}
//               <motion.div 
//                 className="col-span-1 md:col-span-2"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.7 }}
//               >
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Recent Medication (if any)
//                 </label>
//                 <textarea
//                   name="recentMedication"
//                   value={additionalInfo.recentMedication}
//                   onChange={handleInfoChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   placeholder="List any medications you've taken recently"
//                   rows={2}
//                 />
//               </motion.div>
//             </div>
//           </div>
          
//           <motion.div 
//             className="mt-8 flex justify-end"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//           >
//             {/* <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center transition-all duration-300"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               disabled={selectedSymptoms.length === 0}
//             >
//               Analyze Symptoms <ArrowRight className="ml-2" size={18} />
//             </button> */}
//             <motion.button
//   type="submit"
//   className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center transition-all duration-300"
//   whileHover={{ scale: 1.05 }}
//   whileTap={{ scale: 0.95 }}
//   disabled={selectedSymptoms.length === 0}
// >
//   Analyze Symptoms <ArrowRight className="ml-2" size={18} />
// </motion.button>
//           </motion.div>
//         </form>
//       </motion.div>
      
//       <motion.div 
//         className="mt-6 text-center text-gray-500 text-sm"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.9 }}
//       >
//         <p>Note: This tool provides general information and is not a substitute for professional medical advice.</p>
//       </motion.div>
//     </div>
//   );
// };

// export default SymptomChecker;

'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

type SymptomCheckerProps = {
  onSubmit: (symptoms: string[]) => void;
};

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onSubmit }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const allSymptoms: string[] = [
    'abdominal_pain',
        'abnormal_menstruation',
        'acidity',
        'acute_liver_failure',
        'altered_sensorium',
        'anxiety',
        'back_pain',
        'belly_pain',
        'blackheads',
        'bladder_discomfort',
        'blister',
        'blood_in_sputum',
        'bloody_stool',
        'blurred_and_distorted_vision',
        'breathlessness',
        'brittle_nails',
        'bruising',
        'burning_micturition',
        'chest_pain',
        'chills',
        'cold_hands_and_feets',
        'coma',
        'congestion',
        'constipation',
        'continuous_feel_of_urine',
        'continuous_sneezing',
        'cough',
        'cramps',
        'dark_urine',
        'dehydration',
        'depression',
        'diarrhoea',
        'distention_of_abdomen',
        'dizziness',
        'drying_and_tingling_lips',
        'enlarged_thyroid',
        'excessive_hunger',
        'extra_marital_contacts',
        'family_history',
        'fast_heart_rate',
        'fatigue',
        'fluid_overload',
        'headache',
        'high_fever',
        'hip_joint_pain',
        'history_of_alcohol_consumption',
        'increased_appetite',
        'indigestion',
        'inflammatory_nails',
        'internal_itching',
        'irregular_sugar_level',
        'irritability',
        'irritation_in_anus',
        'itching',
        'joint_pain',
        'knee_pain',
        'lack_of_concentration',
        'lethargy',
        'loss_of_appetite',
        'loss_of_balance',
        'loss_of_smell',
        'malaise',
        'mild_fever',
        'mood_swings',
        'movement_stiffness',
        'mucoid_sputum',
        'muscle_pain',
        'muscle_wasting',
        'muscle_weakness',
        'nausea',
        'neck_pain',
        'nodal_skin_eruptions',
        'obesity',
        'pain_behind_the_eyes',
        'pain_during_bowel_movements',
        'pain_in_anal_region',
        'painful_walking',
        'palpitations',
        'passage_of_gases',
        'patches_in_throat',
        'phlegm',
        'polyuria',
        'prominent_veins_on_calf',
        'puffy_face_and_eyes',
        'pus_filled_pimples',
        'receiving_blood_transfusion',
        'receiving_unsterile_injections',
        'red_sore_around_nose',
        'red_spots_over_body',
        'redness_of_eyes',
        'restlessness',
        'runny_nose',
        'rusty_sputum',
        'scurring',
        'shivering',
        'silver_like_dusting',
        'sinus_pressure',
        'skin_peeling',
        'skin_rash',
        'slurred_speech',
        'small_dents_in_nails',
        'spinning_movements',
        'stiff_neck',
        'stomach_bleeding',
        'stomach_pain',
        'sunken_eyes',
        'sweating',
        'swelled_lymph_nodes',
        'swelling_joints',
        'swelling_of_stomach',
        'swollen_blood_vessels',
        'swollen_extremeties',
        'swollen_legs',
        'throat_irritation',
        'toxiclook(typhos)',
        'ulcers_on_tongue',
        'unsteadiness',
        'visual_disturbances',
        'vomiting',
        'watering_from_eyes',
        'weakness_in_limbs',
        'weakness_of_one_body_side',
        'weight_gain',
        'weight_loss',
        'yellow_crust_ooze',
        'yellow_urine',
        'yellowing_of_eyes',
        'yellowish_skin'
  ];

  const filteredSymptoms = allSymptoms.filter(symptom => 
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom');
      return;
    }
    onSubmit(selectedSymptoms);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <motion.h2 
        className="text-2xl font-bold text-blue-600 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Symptom Checker
      </motion.h2>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search symptoms..."
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {filteredSymptoms.map((symptom) => (
          <motion.button
            key={symptom}
            onClick={() => handleSymptomToggle(symptom)}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedSymptoms.includes(symptom)
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {symptom.replace(/_/g, ' ')}
          </motion.button>
        ))}
      </div>
      
      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
      >
        Submit Symptoms
      </button>
    </div>
  );
};

export default SymptomChecker;
