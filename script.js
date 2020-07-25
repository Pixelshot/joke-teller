require('dotenv').config();

console.log(process.env.API_KEY);

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Enable/Disable button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// Passing Joke to VoiceRSS API
const tellMe = (joke) => {
  console.log('Tell me: ', joke);
  VoiceRSS.speech({
    key: process.env.API_KEY,
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
};

// Get Jokes from Joke API
const getJokes = async () => {
  let joke;
  const apiUrl =
    'https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    // Disable button
    toggleButton();
  } catch (error) {
    console.log('Error: ', error);
  }
};

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
