import React ,{ useState, useEffect } from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import News from './News';
import ArticleDetail from './ArticleDetail';
import axios from 'axios';
import Header from './Header';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const API_KEY = '1b7875c256ff49f6916b7bde3b31ee13';
    const API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`

    axios
      .get(API_URL)
      .then((response) => {
        setNewsData(response.data.articles);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<News />} />
          <Route path="/article/:id" element={<ArticleDetail articles={newsData} />} />
          <Route path='/login' element={ <Login /> }/>
          <Route path='/signup' element={ <Signup /> } />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
