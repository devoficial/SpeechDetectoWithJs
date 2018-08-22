window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
const clear = document.querySelector("#clear");
let p = document.createElement('p');
const words =  document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener("result", (e) => {
  const transcript = [...e.results]
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
    
  let colors = ["red", 'yellow',"black", "grey", "pink", "green","blue","white", "purple","brown"]
    colors.forEach(el => {
      let regex = new RegExp(el , "i");
      if(transcript.match(regex)){
        words.style.setProperty('--background-color',el);
      }
    });


    if(transcript.includes("clear all")){
      words.innerHTML = "";
    }
    p.textContent = transcript;
    if(e.results[0].isFinal){
      p = document.createElement('p');
      words.appendChild(p);
    }
  })

recognition.addEventListener("end", recognition.start)
recognition.start();
clear.addEventListener("click", (e) => words.innerHTML = "");