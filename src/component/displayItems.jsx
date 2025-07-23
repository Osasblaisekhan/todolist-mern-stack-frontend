import React, { useEffect, useState } from 'react'
import { storeItems, getItems } from './localStorage';
import { v4 as uuid } from 'uuid';
import { FaEdit, FaTrashRestoreAlt  } from "react-icons/fa";
import Modal from './modal';


const DisplayItems = () => {
    const [isItems, setIsItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [formItems, setFormItems] = useState({name:'', email:'', items:[{itemName:'', price:'', picture:'', description:''}]});
    const [loading, setLoading] = useState(false);
    // Add a new item field in the modal (up to 3)
    const handleAddItemField = () => {
        setFormItems(prev => {
            if (prev.items.length >= 3) return prev;
            return {
                ...prev,
                items: [...prev.items, { itemName: '', price: '', picture: '', description: '' }]
            };
        });
    };

    // Remove an item field
    const handleRemoveItemField = (idx) => {
        setFormItems(prev => {
            const items = prev.items.filter((_, i) => i !== idx);
            return { ...prev, items: items.length ? items : [{itemName:'', price:'', picture:'', description:''}] };
        });
    };
    const [editId, setEditId] = useState(null);

    console.log(isItems);

    const handleAddItem = () => {
        setFormItems({name:'', email:'', items:[{itemName:'', price:'', picture:'', description:''}]});
        setEditId(null);
        setShowForm(true);
    }

    // Edit handler for card
    const handleEdit = (item) => {
        setFormItems(item);
        setEditId(item.id);
        setShowForm(true);
        setEditItemIndex(null);
    };

    // Edit handler for individual item in a card
    const [editItemIndex, setEditItemIndex] = useState(null);
    const handleEditCardItem = (card, itemIdx) => {
        setFormItems({
            name: card.name,
            email: card.email,
            items: [card.items[itemIdx]],
        });
        setEditId(card.id);
        setEditItemIndex(itemIdx);
        setShowForm(true);
    };

    // Delete handler for individual item in a card
    const handleDeleteCardItem = (cardId, itemIdx) => {
        const updated = isItems.map(card => {
            if (card.id !== cardId) return card;
            const newItems = card.items.filter((_, idx) => idx !== itemIdx);
            return { ...card, items: newItems.length ? newItems : [{itemName:'', price:'', picture:'', description:''}] };
        });
        storeItems(updated);
        setIsItems(updated);
    };

    // Delete handler
    const handleDelete = (id) => {
        const updated = isItems.filter(item => item.id !== id);
        storeItems(updated);
        setIsItems(updated);
    };

    // For top-level fields (name, email)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormItems((prev) => ({ ...prev, [name]: value }));
    };

    // For nested item fields
    const handleItemChange = (e, idx) => {
        const { name, value } = e.target;
        setFormItems((prev) => {
            const items = prev.items.map((item, i) =>
                i === idx ? { ...item, [name]: value } : item
            );
            return { ...prev, items };
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let updated;
            if (editId && editItemIndex !== null) {
                // Edit a single item in a card
                updated = isItems.map(card => {
                    if (card.id !== editId) return card;
                    const items = card.items.map((item, idx) => idx === editItemIndex ? formItems.items[0] : item);
                    return { ...card, items };
                });
            } else if (editId) {
                // Edit the whole card
                updated = isItems.map(item => item.id === editId ? { ...formItems, id: editId } : item);
            } else {
                // Add new
                const newEntry = { ...formItems, id: uuid() };
                updated = [...isItems, newEntry];
            }
            storeItems(updated);
            setIsItems(updated);
            setShowForm(false);
            setFormItems({name:'', email:'', items:[{itemName:'', price:'', picture:'', description:''}]});
            setEditId(null);
            setEditItemIndex(null);
        } catch (err) {
            alert('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        const Tasks = getItems();
        setIsItems(Tasks);
    }, [])
  return (
    <div className='relative top-[75px] flex items-center justify-center flex-col'>
        <div>
            {
                showForm ? (
                    <div>
                        <Modal
                            onClose={() => { setShowForm(false); setEditId(null); setEditItemIndex(null); }}
                            formItems={formItems}
                            onInputChange={handleInputChange}
                            onItemChange={handleItemChange}
                            onAddItemField={handleAddItemField}
                            onRemoveItemField={handleRemoveItemField}
                            onSubmit={handleFormSubmit}
                            isEdit={!!editId}
                            loading={loading}
                            editItemIndex={editItemIndex}
                        />
                    </div>
                ) : ''
            }
        </div>
        <div className='flex flex-col gap-4'>
            <div className='flex justify-end'>
                <button onClick={()=> handleAddItem()} className='bg-green-700 w-28 h-10 text-white font-bold' title='Add Items'>Add Items</button>
            </div>
            <div className='grid grid-cols-2 gap-7'>
                {
                    isItems.map((items, cardIdx) => {
                        console.log('yooo items', items);
                        return(
                            <div key={items.id} className='h-96 w-[650px] rounded shadow-2xl shadow-emerald-700 bg-white'>
                                <div className='w-full bg-blue-300 h-8 flex items-center justify-between px-1'>
                                    <h3 className='text-gray-600 font-semibold'><span className='text-white font-semibold text-[20px] mr-1'>Name:</span>{items.name}</h3>
                                    <h3 className='text-gray-600 font-semibold'><span className='text-white font-semibold text-[20px] mr-1'>Email:</span>{items.email}</h3>
                                    <div className='flex items-center justify-center gap-1'>
                                        <button title='Edit Item' onClick={() => handleEdit(items)}>
                                            <FaEdit size={17} color='yellow'/>
                                        </button>
                                        <button title='Delete Item' onClick={() => handleDelete(items.id)}>
                                            <FaTrashRestoreAlt size={17} color='red'/>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-2 items-center justify-between py-1 px-3">
                                    {
                                        items.items.map((item, itemIdx) => {
                                            const key = `${cardIdx}-${itemIdx}`;
                                            return (
                                                <div className='' key={itemIdx}>
                                                    <img className='w-52 h-62' src={item.picture} alt={item.itemName} />
                                                    <div className='flex items-center justify-between'>
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
                                                            <span className={checkedItems[key] ? 'text-blue-500 line-through' : ''}>Price:{item.price}frs</span>
                                                        </div>

                                                        <div className='flex gap-1 flex-col'>
                                                            <button title='Edit Item' onClick={() => handleEditCardItem(items, itemIdx)}>
                                                                <FaEdit size={20} color=''/>
                                                            </button>
                                                            <button title='Delete Item' onClick={() => handleDeleteCardItem(items.id, itemIdx)}>
                                                                <FaTrashRestoreAlt size={20} color='red'/>
                                                            </button>
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
