const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitter=document.getElementById('twitter');
const newQuote=document.getElementById('new-btn');
const loader =document.getElementById('loader');
  


  function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
  }
  function complete(){
    if (!loader.hidden){
      quoteContainer.hidden=false;
      loader.hidden=true;
    }

  }
async function getQuote(){
  loading();
	const proxyUrl="https://cors-anywhere.herokuapp.com/"
  const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try{
       const response=await fetch(proxyUrl+apiUrl);
         const data=await response.json();
         console.log(data);
         if(data.quoteText.length>120){
         	quoteText.classList.add('long-quote');
         }else{
         quoteText.classList.remove('long-quote');
     }
         quoteText.innerText=data.quoteText;
         if(data.quoteAuthor===""){
         	authorText.innerText="Unknown";
         }else{
         authorText.innerText=data.quoteAuthor;
           }
  }catch(error){
  	getQuote();
    console.log(error);
  }
  complete();
}
getQuote();

function tweetQuote(){
const quote= quoteText.innerText;
const author=quoteAuthor.innerText;
const twitterUrl=`https://twitter.com/intent/tweet/?text=\${quote}-\${author}`;
window.open(twitterUrl,'_blank');
}
twitter.addEventListener('click',tweetQuote);
newQuote.addEventListener('click',getQuote);
