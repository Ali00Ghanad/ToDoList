import React, { useEffect, useState } from 'react';
import { TiDelete } from "react-icons/ti";
import { FaCheck } from "react-icons/fa6";
import { GrPlan } from "react-icons/gr";

const App = () => {
  const [planList, setPlanList] = useState(() => {
    const storedPlans = localStorage.getItem('plans');
    return storedPlans ? JSON.parse(storedPlans) : [];
  });

  const [completedPlans, setCompletedPlans] = useState(() => {
    const storedCompleted = localStorage.getItem('completedPlans');
    return storedCompleted ? JSON.parse(storedCompleted) : [];
  });

  const [inpValue, setInpValue] = useState("");
  const [border, setBorder] = useState(4);
  const [specificCat, setSpecificCat] = useState("Other");

  useEffect(() => {
    localStorage.setItem('plans', JSON.stringify(planList));
    localStorage.setItem('completedPlans', JSON.stringify(completedPlans));
  }, [planList, completedPlans]);

  const deleteItem = (index) => {
    const updatedPlans = planList.filter((_, i) => i !== index);
    const updatedCompleted = completedPlans.filter((_, i) => i !== index);
    setPlanList(updatedPlans);
    setCompletedPlans(updatedCompleted);
  };

  const toggleComplete = (index) => {
    setCompletedPlans((prev) => {
      const newCompleted = [...prev];
      newCompleted[index] = !newCompleted[index];
      return newCompleted;
    });
  };

  const selectedCategory = (item, index) => {
    setBorder(index);
    setSpecificCat(item);
  };

  const addPlan = () => {
    if (inpValue.trim()) {
      setPlanList([{ text: inpValue, category: specificCat }, ...planList]);
      setCompletedPlans([false, ...completedPlans]);
      setInpValue("");
    }
  };

  const category = [
    { cat: 'Work', icon: <div className='w-[10px] h-[10px] bg-blue-500 rounded-full border-[1px]'></div> },
    { cat: 'Study', icon: <div className='w-[10px] h-[10px] bg-yellow-400 rounded-full'></div> },
    { cat: 'SelfCare', icon: <div className='w-[10px] h-[10px] bg-green-500 rounded-full'></div> },
    { cat: 'Exercise', icon: <div className='w-[10px] h-[10px] bg-red-500 rounded-full'></div> },
    { cat: 'Other', icon: <div className='w-[10px] h-[10px] bg-gray-400 rounded-full'></div> },
  ];

  return (
    <div className='md:w-[550px] w-screen h-screen md:h-auto flex justify-center items-center px-5 py-10 md:rounded-xl bg-white'>
      <div className='flex flex-col w-[90%]'>

        <div className='rounded-full bg-white border-[1px] border-purple-500'>
          <div className='flex'>
            <input
              value={inpValue}
              onChange={(e) => setInpValue(e.target.value)}
              className='bg-transparent px-4 border-none outline-none w-full'
              type="text"
              placeholder='Add Your Plan'
            />
            <button
              onClick={addPlan}
              className='bg-purple-500 px-6 py-2  font-bold rounded-full text-white'>
              Add
            </button>
          </div>
        </div>

        <div className='flex justify-center gap-x-7 mt-5 w-full flex-wrap'>
          {category.map((item, index) => (
            <div
              key={index}
              onClick={() => selectedCategory(item.cat, index)}
              style={{ borderBottom: border === index ? "solid #A352EF 1px" : "" }}
              className='flex items-center gap-x-1 cursor-pointer hover:border-b-[1px] border-purple-500 h-[25px]'>
              {item.icon}
              <p>{item.cat}</p>
            </div>
          ))}
        </div>

        <div className='flex flex-col justify-start mt-5'>
          <p className='text-purple-500 font-bold my-2'>My Plans</p>
          <div id='planList' className='border-[1px] border-purple-500 w-full h-[500px] rounded-lg overflow-y-auto flex items-center flex-col px-2 gap-y-2 py-4'>
            {planList.length > 0 ? (
              planList.map((item, index) => (
                <div key={index} className='w-[95%] relative gap-x-2 text-slate-800 gap-y-5 flex items-end border-b-[1px] border-purple-500 last-of-type:border-none flex-wrap py-5 '>
                  <div onClick={() => deleteItem(index)} className='cursor-pointer text-[25px] text-purple-600'>
                    <TiDelete />
                  </div>
                  <div className='w-[80%] break-words border-l-[1px] border-purple-300 pl-2'>
                    <p className='text-sm text-purple-500 text-[11px]'>{item.category}</p>
                    <p className={`${completedPlans[index] ? "line-through text-gray-400" : ""}`}>
                      {item.text}
                    </p>
                  </div>

                  <div
                    className={`w-[20px] h-[20px] absolute right-0 flex justify-center items-center rounded-full border-[1px] border-purple-500 cursor-pointer ${completedPlans[index] ? "bg-purple-500" : "bg-transparent"}`}
                    onClick={() => toggleComplete(index)}>
                    <FaCheck className='text-white text-[15px]' />
                  </div>
                </div>
              )).reverse()
            ) : (
              <div className='w-[95%] flex justify-center items-center flex-col h-full gap-y-5 text-purple-500 font-bold'>
                <GrPlan className='text-[40px]' />
                <p>Your List Is Empty</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;









// const App = () => {
//   const [planList, setPlanList] = useState(() => {
//     const storedPlans = localStorage.getItem('value');
//     return storedPlans ? JSON.parse(storedPlans) : [];
//   });

//   const [jobDone, setJobDone] = useState(false);
//   const [inpValue, setInpValue] = useState("");
//   const [border, setBorder] = useState(4);
//   const [completedPlan, setCompletedPlan] = useState(null);
//   const [specificCat, setSpecificCat] = useState("Other");
//   const [catContent, setCatContent] = useState("");

//   useEffect(() => {
//     localStorage.setItem('value', JSON.stringify(planList));
//   }, [planList]);

//   // ---- Functions ---- //

//   const deleteItem = (item) => {
//     setPlanList(planList.filter(res => res !== item));
//   };

//   const selectedCategory = (item, index) => {
//     setBorder(index);
//     setSpecificCat(item);
//   };

//   const category = [
//     {
//       cat: 'Work',
//       icon: <div className='w-[10px] h-[10px] bg-blue-500 rounded-full border-[1px]'></div>
//     },
//     {
//       cat: 'Study',
//       icon: <div className='w-[10px] h-[10px] bg-yellow-400 rounded-full'></div>
//     },
//     {
//       cat: 'SelfCare',
//       icon: <div className='w-[10px] h-[10px] bg-green-500 rounded-full'></div>
//     },
//     {
//       cat: 'Exercise',
//       icon: <div className='w-[10px] h-[10px] bg-red-500 rounded-full'></div>
//     },
//     {
//       cat: 'Other',
//       icon: <div className='w-[10px] h-[10px] bg-gray-400 rounded-full'></div>
//     },
//   ];

//   return (
//     <div className='w-[600px] flex justify-center items-center px-5 py-10 rounded-xl bg-white'>
//       <div className='flex flex-col w-[90%]'>

//         <div className='rounded-full bg-white border-[1px] border-purple-500'>
//           <div className='flex'>
//             <input
//               value={inpValue}
//               onChange={(e) => setInpValue(e.target.value)}
//               className='bg-transparent pl-4 border-none outline-none w-full'
//               type="text"
//               placeholder='Add Your Plan'
//             />
//             <button
//               onClick={() => {
//                 if (inpValue.trim()) {
//                   setPlanList([inpValue, ...planList]);
//                   setInpValue("");
//                   setCatContent(specificCat);
//                 }
//               }}
//               className='bg-purple-500 px-6 py-3 font-bold rounded-full text-white'>
//               Add
//             </button>
//           </div>
//         </div>

//         <div className='flex justify-center gap-x-7 mt-5'>
//           {
//             category.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => selectedCategory(item.cat, index)}
//                 style={{ borderBottom: border === index ? "solid #A352EF 1px" : "" }}
//                 className='flex items-center gap-x-1 cursor-pointer hover:border-b-[1px] border-purple-500 h-[25px]'>
//                 {item.icon}
//                 <p>{item.cat}</p>
//               </div>
//             ))
//           }
//         </div>

//         <div className='flex flex-col justify-start mt-5'>
//           <p className='text-purple-500 font-bold my-2'>My Plans</p>
//           <div id='planList' className='border-[1px] border-purple-500 w-full h-[500px] rounded-lg overflow-y-auto flex items-center flex-col gap-y-2 py-4'>
//             {
//               planList != "" ? (
//                 [...planList].reverse().map((item, index) => (
//                   <div key={index} className={`w-[95%] text-slate-800 gap-x-2 gap-y-5 flex items-center justify-between border-b-[1px] border-purple-400 last-of-type:border-none flex-wrap py-5 px-2`}>

//                     <div onClick={() => deleteItem(item)} className='cursor-pointer text-[20px]'>
//                       <TiDelete className='text-purple-700' />
//                     </div>
//                     <p className='break-words h-auto w-[80%]'>
//                       {
//                         completedPlan === index ?
//                           (<del>{item}</del>)
//                           :
//                           (<p>{item}</p>)
//                       }
//                     </p>

//                     <div
//                       className={`w-[20px] h-[20px] flex justify-center items-center rounded-full border-[1px] border-purple-500 cursor-pointer ${completedPlan === index ? "bg-purple-500" : "bg-transparent"}`}
//                       onClick={() => setCompletedPlan(completedPlan === index ? null : index)}>
//                         <FaCheck className='text-[12px] text-white'/>
//                     </div>
//                   </div>
//                 ))) :
//                 (
//                   <div className='w-[95%] flex justify-center items-center flex-col h-full gap-y-5 text-purple-500 font-bold'>
//                     <GrPlan className='text-[40px]' />
//                     <p>Your List Is Empty</p>
//                   </div>
//                 )
//             }
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default App;
