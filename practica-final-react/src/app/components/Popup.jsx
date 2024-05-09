
const Popup = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
        <div className="bg-neutral-700 p-6 rounded-md shadow-md z-10">
          <p className="text-red-500">{message}</p>
          <button
            className="mt-6 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  };
  
  export default Popup;
  
  
  