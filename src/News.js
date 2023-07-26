import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./News.css";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ArticleDetail from './ArticleDetail';
import { db } from './firebase';


const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  useEffect(() => {
    const API_KEY = '1b7875c256ff49f6916b7bde3b31ee13';
    const API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;

    axios
      .get(API_URL)
      .then((response) => {
        setNewsData(response.data.articles);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }, []);
  const handleFavoriteClick = (articleId) => {
    const user = db.auth().currentUser;
    if (user) {
      // Check if the article is already a favorite
      const isFavorite = userFavorites.includes(articleId);

      // Update the favorites array in Firestore
      const favoritesRef = db.collection('users').doc(user.uid);
      if (isFavorite) {
        favoritesRef.update({
          favorites: db.FieldValue.arrayRemove(articleId),
        });
      } else {
        favoritesRef.update({
          favorites: db.FieldValue.arrayUnion(articleId),
        });
      }
    }
  };

  return (
    <div className="news-container">
    {/* <h1>Latest News</h1> */}
    <div className="news-grid">
      {newsData.map((article, index) => (
        <Link to={`/article/${index}`} key={index} className="news-item">
           {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
          <h3>{article.title}</h3>
          {/* <p>{article.description}</p> */}
          <button onClick={() => handleFavoriteClick(index)}>{userFavorites.includes(index) ? 'Remove from Favorites' : 'Add to Favorites'}</button>
          <Link to={`/article/${index}`}>Read more</Link>
          {/* <Button onClick={<ArticleDetail />}>read more</Button> */}
        </Link>
      ))}
    </div>
  </div>
  );
};

export default News;
