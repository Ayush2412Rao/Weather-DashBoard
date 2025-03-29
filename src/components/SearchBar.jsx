import { useState } from "react";
const SearchBar = ({ onSearch }) =>{
    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(city.trim()==="") return null;
        onSearch(city);
        setCity("");
    };
    return (
        <form onSubmit={handleSubmit} className="flex space-x-2 p-4">
            <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City Name...."
            className="p-2 border rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Search
            </button>
        </form>
    );
};
export default SearchBar;
