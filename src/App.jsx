import React from 'react'
import Form from './component/nav';
import DisplayItems from './component/displayItems';

const App = () => {
  return (
    <div className=''>
      <Form />
      <DisplayItems />
    </div>
  )
}

export default App





// import React, { useState } from 'react'

// const App = () => {
//       const [isChecked, setIsChecked] = useState(false);

//     const handleCheckboxChange = (event) => {
//         setIsChecked(event.target.checked);
//         console.log(event.target.checked); // Logs 'true' when checked, 'false' when unchecked
//     };
//   return (
//     <div>
//       <h2 className='text-white bg-amber-700 font-bold text-4xl text-center hidden md:block md:text-center hover:bg-black hover:text-yellow-500 hover:transition ease-in animate'>Hello world </h2>
//        <input 
//                 type="checkbox" 
//                 id="myCheckbox" 
//                 checked={isChecked} 
//                 onChange={()=> setIsChecked((prev)=> !prev)} 
//             />
//           <label htmlFor="myCheckbox" className={isChecked ? 'line-through text-[blue] font-bold text-4xl':'text-amber-300 font-bold text-4xl'}>Check me!</label>
//     </div>
//   )
// }

// export default App
