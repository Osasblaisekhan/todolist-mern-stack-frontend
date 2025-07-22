import React, { useEffect, useState } from 'react'
import { storeItems, getItems } from './localStorage';
import { FaEdit, FaTrashRestoreAlt  } from "react-icons/fa";


const DisplayItems = () => {
    const [isItems, setIsItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [formItems, setFormItems] = useState({name:'', email:'', maggi:'', salt:'', rice:'', picture:''});
    console.log(formItems);
    console.log(isItems)
    useEffect(()=>{
        const Tasks = getItems();
        setIsItems(Tasks);
    }, [getItems])
  return (
    <div className='relative top-[75px] flex items-center justify-center'>
        <div className='flex flex-col gap-4'>
            <div className='flex justify-end'>
                <button className='bg-green-700 w-28 h-10 text-white font-bold' title='Add Items'>Add Items</button>
            </div>
            <div className='grid grid-cols-2 gap-7'>
                {
                    isItems.map((items, cardIdx) => {
                        console.log('yooo items', items);
                        return(
                            <div key={items.id} className='h-56 w-[600px] rounded shadow-2xl shadow-emerald-700 bg-white'>
                                <div className='w-full bg-blue-300 h-8 flex items-center justify-between px-1'>
                                    <h3 className='text-gray-600 font-semibold'><span className='text-white font-semibold text-[20px] mr-1'>Name:</span>{items.name}</h3>
                                    <h3 className='text-gray-600 font-semibold'><span className='text-white font-semibold text-[20px] mr-1'>Email:</span>{items.email}</h3>
                                    <div className='flex items-center justify-center gap-1'>
                                        <button title='Edit Item'>
                                            <FaEdit size={17} color='yellow'/>
                                        </button>
                                        <button title='Delete Item'>
                                            <FaTrashRestoreAlt size={17} color='red'/>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-2 items-center justify-between py-1 px-3">
                                    {
                                        items.items.map((item, itemIdx) => {
                                            const key = `${cardIdx}-${itemIdx}`;
                                            console.log('yoo key', key)
                                            return (
                                                <div className='image' key={itemIdx}>
                                                    <img className='w-40 h-32' src={item.picture} alt={item.itemName} />
                                                    <div className='flex gap-2'>
                                                        <div className='mt-1'>
                                                            <input
                                                                type="checkbox"
                                                                checked={!!checkedItems[key]}
                                                                onChange={() => setCheckedItems(prev => ({
                                                                    ...prev,
                                                                    [key]: !prev[key]
                                                                }))}
                                                            />
                                                        </div>
                                                        <div className='flex flex-col gap-1'>
                                                            <span className={checkedItems[key] ? 'text-blue-500 line-through' : ''}>ItemName:{item.itemName}</span>
                                                            <span className={checkedItems[key] ? 'text-blue-500 line-through' : ''}>Price:{item.price}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>



                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}
 
   

export default DisplayItems
