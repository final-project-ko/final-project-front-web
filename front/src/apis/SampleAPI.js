import {useEffect} from "react";
import axios from "axios";


export const NYTimes = async () => {

       const response = await fetch('https://newsapi.org/v2/top-headlines?country=kr&apiKey=b2f485cd2f274a5ba62325da31653420');
       const data = await response.json();

       // data 안에 뉴스 api 는 articles 배열로 뉴스가 들어있기 때문에 추출해줌
    const articles = data.articles;

    const newsData = [];

    for (let i = 0; i < 10; i++) {
        const article = articles[i];
        const articleData = {
            title : article.title,
            description : article.description,
            url : article.url,
            urlToImage : article.urlToImage
        };
        newsData.push(articleData);
    }
    sendNewsServer(newsData);

    return newsData;

}


// 받아 오는 데이터 백엔드로 보내는 로직
const sendNewsServer = (newsData) => {
    
}