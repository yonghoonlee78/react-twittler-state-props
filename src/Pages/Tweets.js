import React, { useState, useEffect } from 'react';
import TweetComposer from '../components/TweetComposer';
import Tweet from '../components/Tweet';
import initialTweetsData from '../static/dummyData';
import './Tweets.css';

const LOCAL_STORAGE_KEY = 'tweets_data_v5'; 

const Tweets = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    console.group("useEffect: Tweets component mounted or re-mounted. (Key:", LOCAL_STORAGE_KEY + ")");

    let loadedAndCombinedTweets = [];

    try {
      const storedTweetsString = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log(`1. localStorage.getItem('${LOCAL_STORAGE_KEY}') 결과 문자열:`, storedTweetsString);

      if (storedTweetsString) {
        const parsedStoredTweets = JSON.parse(storedTweetsString);
        if (Array.isArray(parsedStoredTweets) && parsedStoredTweets.length > 0) {
          loadedAndCombinedTweets = parsedStoredTweets;
          console.log("2. Parsed storedTweets from local storage (Initial Load):", loadedAndCombinedTweets);
          console.log("   - Loaded from local storage. Length:", loadedAndCombinedTweets.length);
        } else {
          console.log("2. Local storage data is empty or invalid array after parsing.");
          // 데이터가 없거나 유효하지 않으면 더미 데이터로 시작
          loadedAndCombinedTweets = JSON.parse(JSON.stringify(initialTweetsData));
          console.log("3. Falling back to dummy data due to invalid local storage data:", loadedAndCombinedTweets);
        }
      } else {
        console.log("2. No data found in local storage for this key. Using dummy data.");
        loadedAndCombinedTweets = JSON.parse(JSON.stringify(initialTweetsData));
        console.log("3. Using initial dummy data:", loadedAndCombinedTweets);
      }
    } catch (error) {
      console.error("ERROR: Failed to load or parse tweets from local storage. Falling back to dummy data:", error);
      loadedAndCombinedTweets = JSON.parse(JSON.stringify(initialTweetsData));
    }

    // 데이터가 유효한 배열인지 다시 한번 확인
    if (!Array.isArray(loadedAndCombinedTweets) || loadedAndCombinedTweets.length === 0) {
        console.warn("WARN: No valid tweet data found after all attempts. Displaying empty feed.");
        setTweets([]);
        console.groupEnd();
        return;
    }

    // 로드된 트윗을 createdAt 기준으로 최신순으로 정렬
    const sortedTweets = [...loadedAndCombinedTweets].sort((a, b) => {
      const dateA = new Date(b.createdAt);
      const dateB = new Date(a.createdAt);

      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          return isNaN(dateA.getTime()) ? 1 : -1; 
      }
      return dateA.getTime() - dateB.getTime();
    });
    console.log("4. Sorted tweets:", sortedTweets);

    // 트윗 객체를 Tweet 컴포넌트에 맞는 형식으로 포맷팅
    const formattedTweets = sortedTweets.map((tweet, index) => {
        // user?.name, user?.profilePic 또는 username, picture 속성 사용 (유연한 처리)
        const userName = (tweet.user && tweet.user.name) || tweet.username;
        const userProfilePic = (tweet.user && tweet.user.profilePic) || tweet.picture;

        if (!tweet || typeof tweet.id === 'undefined' || !userName || !userProfilePic || !tweet.content || !tweet.createdAt) {
            console.error(`ERROR: Malformed tweet object found during formatting at index ${index} (Skipping):`, tweet);
            return null; // 유효하지 않은 트윗은 건너뛰기
        }

        const tweetDate = new Date(tweet.createdAt);
        const formattedDate = isNaN(tweetDate.getTime()) ? 
                              'Invalid Date' : 
                              tweetDate.toLocaleString('ko-KR', {
                                  year: 'numeric',
                                  month: 'numeric',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                  hour12: false
                              });

        return {
            id: tweet.id,
            user: {
                name: userName,
                profilePic: userProfilePic
            },
            content: tweet.content,
            date: formattedDate,
            createdAt: tweet.createdAt
        };
    }).filter(Boolean); // null 값 필터링

    console.log("5. Formatted tweets before setting state:", formattedTweets);
    console.log("   - Formatted tweets array length:", formattedTweets.length);

    setTweets(formattedTweets);
    console.groupEnd();
  }, []); // 빈 의존성 배열: 컴포넌트 마운트 시 한 번만 실행

  const handleAddTweet = (newTweetText) => {
    console.group("handleAddTweet: New tweet attempt.");
    const now = new Date();
    const newTweet = {
      id: Date.now(), 
      user: { name: 'Bob', profilePic: 'https://randomuser.me/api/portraits/men/98.jpg' }, // 항상 이 구조로 저장
      content: newTweetText, 
      date: now.toLocaleString('ko-KR', { 
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }),
      createdAt: now.toISOString(), 
    };
    console.log("handleAddTweet: New tweet created:", newTweet);


    setTweets(prevTweets => {
        console.log("handleAddTweet: prevTweets (current UI state BEFORE update):", prevTweets);
        
        // UI에 즉시 반영될 새로운 트윗 목록 (새로운 트윗이 가장 위에)
        const updatedTweetsForUI = [newTweet, ...prevTweets];
        console.log("handleAddTweet: updatedTweetsForUI (for setTweets):", updatedTweetsForUI);

        // 로컬 스토리지에 저장할 최종 트윗 목록을 만듭니다.
        // 현재 화면에 표시되는 트윗 목록 (updatedTweetsForUI)을 기준으로 저장합니다.
        // 이렇게 하면 항상 최신 상태의 트윗 목록이 저장됩니다.
        const tweetsToSave = [...updatedTweetsForUI]; 

        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tweetsToSave));
          const verifyStored = localStorage.getItem(LOCAL_STORAGE_KEY);
          console.log("VERIFY: handleAddTweet: Data in localStorage after saving:", verifyStored ? JSON.parse(verifyStored) : 'null');
          console.log("SUCCESS: handleAddTweet: All combined tweets successfully saved to local storage.");
          console.log("   - Tweets saved array length:", tweetsToSave.length);
        } catch (error) {
          console.error("ERROR: handleAddTweet: Failed to save tweets to local storage:", error);
        }
        
        console.groupEnd();
        return updatedTweetsForUI; // UI 업데이트를 위해 새로운 트윗이 포함된 배열 반환
    });
  };

  return (
    <div className="tweets-page">
      <TweetComposer onAddTweet={handleAddTweet} />
      <div className="tweet-feed-list">
        {tweets.map(tweet => (
          <Tweet
            key={tweet.id}
            user={tweet.user}
            content={tweet.content}
            date={tweet.date}
            createdAt={tweet.createdAt} 
          />
        ))}
      </div>
    </div>
  );
};

export default Tweets;