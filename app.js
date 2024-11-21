
const tweetInput = document.getElementById('tweetInput');
const postTweetBtn = document.getElementById('postTweetBtn');
const tweetsList = document.querySelector('.tweets-list');


let tweets = JSON.parse(localStorage.getItem('tweets')) || [];


function renderTweets() {
  tweetsList.innerHTML = ''; 
  tweets.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); 
  tweets.forEach((tweet, index) => {
    const tweetElement = document.createElement('div');
    tweetElement.classList.add('tweet');
    
    tweetElement.innerHTML = `
      <div class="tweet-text">${tweet.text}</div>
      <button class="like-button" onclick="toggleLike(${index})">
        ❤️ Like
      </button>
      <div class="like-count">Likes: ${tweet.likes}</div>
    `;
    
    tweetsList.appendChild(tweetElement);
  });
}


function postTweet() {
  const tweetText = tweetInput.value.trim();
  
  if (tweetText.length > 0 && tweetText.length <= 280) {
    const newTweet = {
      text: tweetText,
      timestamp: new Date().toISOString(),
      likes: 0,
    };
    
    tweets.push(newTweet);
    localStorage.setItem('tweets', JSON.stringify(tweets));
    tweetInput.value = ''; 
    renderTweets(); 
  } else {
    alert('Tweet must be between 1 and 280 characters!');
  }
}


function toggleLike(index) {
  tweets[index].likes += 1;
  localStorage.setItem('tweets', JSON.stringify(tweets));
  renderTweets(); 
}


postTweetBtn.addEventListener('click', postTweet);


renderTweets();
