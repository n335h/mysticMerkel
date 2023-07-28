import axios from 'axios';
import { useState } from 'react';

// Create a new Axios instance with the base URL set to the server address
const api = axios.create({
  baseURL: 'http://localhost:8080', // Update this URL if your server is running on a different address
});

function App() {
  const [zodiac, setZodiac] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the prompt with the selected zodiac sign and user-entered prompt
    const completePrompt = `As an astrologer, you are predicting the daily horoscope for ${zodiac}. ${prompt}`;

    // Send a request to the server with the prompt using the new Axios instance
    api
      .post('/chat', { prompt: completePrompt })
      .then((res) => {
        // Update the response state with the server's response
        setResponse(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          value={zodiac}
          onChange={(e) => setZodiac(e.target.value)}
        >
          <option value="">Select Zodiac Sign</option>
          <option value="Aries">Aries</option>
          <option value="Taurus">Taurus</option>
          <option value="Gemini">Gemini</option>
          <option value="Cancer">Cancer</option>
          <option value="Leo">Leo</option>
          <option value="Virgo">Virgo</option>
          <option value="Libra">Libra</option>
          <option value="Scorpio">Scorpio</option>
          <option value="Sagittarius">Sagittarius</option>
          <option value="Capricorn">Capricorn</option>
          <option value="Aquarius">Aquarius</option>
          <option value="Pisces">Pisces</option>
        </select>
        <br />
       
        <button type="submit" disabled={!zodiac}>
          Submit
        </button>
      </form>
      <p>{response}</p>
    </div>
  );
}

export default App;
