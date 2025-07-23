import React from 'react'

const Modal = ({ onClose, formItems, onInputChange, onItemChange, onAddItemField, onRemoveItemField, onSubmit, isEdit, loading, editItemIndex }) => {
  console.log('yooo form item', formItems)
  return (
    <div className="w-full h-full fixed inset-0 flex flex-col items-end animate-fadein z-50" style={{ backgroundColor: 'rgba(198, 205, 216, 0.5)' }}>
      <button
        className='m-4 px-4 py-2 bg-red-500 text-white rounded font-bold hover:bg-red-700 transition-all duration-200'
        onClick={onClose}
        title='close modal'
      >
        Close
      </button>
      <div className='flex flex-1 items-start justify-center w-full mt-8'>
        <div className="bg-gray-600 rounded-lg shadow-lg p-8 min-w-[350px] min-h-[200px] max-h-[80vh] flex flex-col items-center justify-center transform transition-transform duration-300 scale-90 animate-modalpop overflow-y-auto">
          <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
            <h2 className="text-white text-xl font-bold mb-2">{isEdit ? 'Edit Item' : 'Add Item'}</h2>
            <input
              type="text"
              placeholder="Name"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              name="name"
              value={formItems.name}
              onChange={onInputChange}
              required
            />
            <input
              type="email"
              placeholder="email"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              name="email"
              value={formItems.email}
              onChange={onInputChange}
              required
            />
            <div>
              <h2>Items</h2>
              <div>
                {formItems.items.map((item, index) => (
                  <div key={index} className={`flex flex-col gap-2 mb-2 border-b border-gray-400 pb-2 relative ${editItemIndex === 0 && isEdit ? 'bg-yellow-100' : ''}`}>
                    <input
                      type="text"
                      placeholder="Item Name"
                      className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      name="itemName"
                      value={item.itemName}
                      onChange={e => onItemChange(e, index)}
                      required
                    />
                    {formItems.items.length > 1 && (
                      <button
                        type="button"
                        className="absolute right-0 top-0 text-red-500 font-bold px-2 py-1 hover:text-red-700"
                        onClick={() => onRemoveItemField(index)}
                        title="Remove Item"
                      >
                        &times;
                      </button>
                    )}
                    <input
                      type="number"
                      placeholder="Price"
                      className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      name="price"
                      value={item.price}
                      onChange={e => onItemChange(e, index)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Image URL"
                      className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      name="picture"
                      value={item.picture}
                      onChange={e => onItemChange(e, index)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      name="description"
                      value={item.description}
                      onChange={e => onItemChange(e, index)}
                      required
                    />
                  </div>
                ))}
                {formItems.items.length < 3 && (
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-3 py-1 rounded mt-2 hover:bg-blue-700 transition-all"
                    onClick={onAddItemField}
                  >
                    + Add Another Item
                  </button>
                )}
              </div>
            </div>
            <button type="submit" className="bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition-all flex items-center justify-center" disabled={loading}>
              {loading && (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              )}
              {isEdit ? 'Update Item' : 'Add Item'}
            </button>
          </form>
        </div>
      </div>
      <style>{`
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadein {
          animation: fadein 0.3s ease;
        }
        @keyframes modalpop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-modalpop {
          animation: modalpop 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </div>
  )
}

export default Modal
