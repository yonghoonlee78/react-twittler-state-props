import { useEffect, useState } from "react";
import Tweet from '../components/Tweet'; 
import initialTweetsData from '../static/dummyData';
import './MyPage.css';

const LOCAL_STORAGE_KEY = 'tweets_data_v5';

function MyPage() {
  const currentUser = localStorage.getItem("currentUser");
  const [bobTweets, setBobTweets] = useState([]);

  useEffect(() => {
    console.group("MyPage Debug Log");

    let allLoadedTweets = [];

    try {
      const storedTweetsString = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log(`1. MyPage - localStorage.getItem('${LOCAL_STORAGE_KEY}') 결과 문자열:`, storedTweetsString);

      if (storedTweetsString && storedTweetsString !== 'null') {
        const parsedStoredTweets = JSON.parse(storedTweetsString);
        if (Array.isArray(parsedStoredTweets) && parsedStoredTweets.length > 0) {
          allLoadedTweets = parsedStoredTweets;
          console.log("2. MyPage - 로컬 스토리지에서 파싱된 트윗:", allLoadedTweets);
        } else {
          console.log("2. MyPage - 로컬 스토리지 데이터가 비어있거나 유효하지 않습니다.");
        }
      } else {
        console.log("2. MyPage - 로컬 스토리지에 데이터가 없습니다. 더미 데이터를 확인합니다.");
        // 처음 방문시 더미 데이터를 localStorage에 저장
        if (initialTweetsData && initialTweetsData.length > 0) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialTweetsData));
          allLoadedTweets = initialTweetsData;
        }
      }
    } catch (error) {
      console.error("ERROR: MyPage - 로컬 스토리지에서 트윗 로드/파싱 실패:", error);
      // 에러 발생시 더미 데이터 사용
      allLoadedTweets = initialTweetsData || [];
    }

    // 더미 데이터와 저장된 데이터 병합 (중복 제거)
    const uniqueCombinedTweetsMap = new Map();

    // 더미 데이터 먼저 추가
    if (initialTweetsData && Array.isArray(initialTweetsData)) {
      initialTweetsData.forEach(tweet => {
        if (tweet && tweet.id) {
          uniqueCombinedTweetsMap.set(tweet.id, tweet);
        }
      });
    }

    // 저장된 데이터로 덮어쓰기/추가
    if (Array.isArray(allLoadedTweets)) {
      allLoadedTweets.forEach(tweet => {
        if (tweet && tweet.id) {
          uniqueCombinedTweetsMap.set(tweet.id, tweet);
        }
      });
    }

    const finalTweets = Array.from(uniqueCombinedTweetsMap.values());
    console.log("3. MyPage - 병합된 트윗:", finalTweets);

    // Bob 필터링
    const filteredBobTweets = finalTweets.filter(tweet => {
      const name = tweet?.user?.name || tweet?.username;
      if (typeof name === 'string') {
        const cleanName = name.replace(/\s+/g, '').toLowerCase();
        return cleanName === 'bob';
      }
      return false;
    });

    console.log("4. MyPage - 필터링된 Bob 트윗:", filteredBobTweets);

    // 정렬 및 포맷팅
    const sortedBobTweets = [...filteredBobTweets]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(tweet => {
        const name = tweet?.user?.name || tweet?.username;
        const profilePic = tweet?.user?.profilePic || tweet?.picture;

        if (!name || !profilePic || !tweet.content || !tweet.createdAt) {
          console.error("잘못된 트윗 형식:", tweet);
          return null;
        }

        const tweetDate = new Date(tweet.createdAt);
        const formattedDate = isNaN(tweetDate.getTime())
          ? 'Invalid Date'
          : tweetDate.toLocaleString('ko-KR', {
              year: 'numeric', month: 'numeric', day: 'numeric',
              hour: '2-digit', minute: '2-digit', second: '2-digit',
              hour12: false
            });

        return {
          id: tweet.id,
          user: { name, profilePic },
          content: tweet.content,
          date: formattedDate,
          createdAt: tweet.createdAt,
        };
      })
      .filter(Boolean);

    setBobTweets(sortedBobTweets);
    console.groupEnd();
  }, []);

  return (
    <div className="my-page">
      <div className="profile-header">
        <img
          src="https://randomuser.me/api/portraits/men/98.jpg"
          alt="Bob Profile"
          className="profile-pic"
        />
        <div className="profile-info">
          <h1>Bob Profile</h1>
          <p>28 팔로워 100 팔로잉</p>
        </div>
      </div>

      <div className="profile-tweets-section">
        <h2>Bob의 메시지</h2>
        {bobTweets && bobTweets.length > 0 ? (
          bobTweets.map(tweet => (
            <Tweet
              key={tweet.id}
              user={tweet.user}
              content={tweet.content}
              date={tweet.date}
              createdAt={tweet.createdAt}
            />
          ))
        ) : (
          <p>Bob의 메시지를 불러오는 중이거나 메시지가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default MyPage;