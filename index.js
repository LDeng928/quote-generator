let currentQuote = '';
let currentAuthor = '';

// API call to get new quote
let quotesData;

const getQuotes = () => {
  return $.ajax({
    headers: {
      Accept: 'application/json',
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (jsonData) {
      if (typeof jsonData === 'string') {
        quotesData = JSON.parse(jsonData);
        console.log('quotesData');
        console.log(quotesData);
      }
    },
  });
};

// Generate a random quote
const generateRandomQuote = () => {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
};

// Single quote
const generateQuote = () => {
  randomQuote = generateRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  // Update the DOM
  $('#text').html(currentQuote);
  $('#author').html(currentAuthor);

  // Attribute
  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
};

$(document).ready(function () {
  getQuotes().then(() => {
    generateQuote();
  });
  $('#new-quote').click(function () {
    generateQuote();
  });
});
