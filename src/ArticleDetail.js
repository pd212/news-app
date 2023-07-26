import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './ArticleDetail.css'; 
import './ArticleDetail.css';

const ArticleDetail = ({ articles }) => {
    const { id } = useParams();
    const article = articles[id];
  
    if (!article) {
      return <div>Article not found</div>;
    }
  
  return (
    <div className="article-detail">
      <h2>{article.title}</h2>
      {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
      <Link to="/">Back to News List</Link>
    </div>
  );
};

export default ArticleDetail;
