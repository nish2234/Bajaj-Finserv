import React, { useState } from "react";
import './App.css'
function App() {
    const [jsonInput, setJsonInput] = useState("");
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
        setError(""); // Reset error when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate JSON input
        try {
            JSON.parse(jsonInput); // This will throw an error if jsonInput is not valid JSON
        } catch (e) {
            setError("Invalid JSON format. Please correct the input.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/bfhl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: jsonInput,
            });
            const data = await response.json();
            setResponse(data);
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to connect to the server. Please try again later.");
        }
    };

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedOptions((prev) =>
            prev.includes(value)
                ? prev.filter((option) => option !== value)
                : [...prev, value]
        );
    };

    const renderResponse = () => {
        if (!response) return null;
        return (
            <div>
                {selectedOptions.includes("Numbers") && response.numbers.length > 0 && (
                    <div>Numbers: {response.numbers.join(", ")}</div>
                )}
                {selectedOptions.includes("Alphabets") && response.alphabets.length > 0 && (
                    <div>Alphabets: {response.alphabets.join(", ")}</div>
                )}
                {selectedOptions.includes("Highest lowercase alphabet") &&
                    response.highest_lowercase_alphabet.length > 0 && (
                    <div>
                        Highest Lowercase Alphabet:{" "}
                        {response.highest_lowercase_alphabet.join(", ")}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="App">
            <h1>BFHL Challenge</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={jsonInput}
                    onChange={handleInputChange}
                    placeholder='Enter JSON input (e.g., { "data": ["A", "b", "1"] })'
                />
                {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
                <button type="submit">Submit</button>
            </form>
            {response && (
                <div>
                    <h2>Filter Results</h2>
                    <label>
                        <input
                            type="checkbox"
                            value="Numbers"
                            onChange={handleOptionChange}
                        />
                        Numbers
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Alphabets"
                            onChange={handleOptionChange}
                        />
                        Alphabets
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Highest lowercase alphabet"
                            onChange={handleOptionChange}
                        />
                        Highest lowercase alphabet
                    </label>
                    {renderResponse()}
                </div>
            )}
        </div>
    );
}

export default App;
