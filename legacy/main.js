// HTML selectors
const tempDiv = document.querySelector(".temp");
const keyDiv = document.querySelector(".key");
const dynamicViewDiv = document.querySelector(".dyn-view");

let flag; // used to toggle the conversion state

// List of messages which are randomly displayed before the results
var randomMessages = [
  "But, in a cipher none can read.",
  "Smile. it's the cipher key to decipher the man.",
  "Whumphus needs a cipher.",
  "Reduce yourself to a cipher.",
  "Carry your unwritten poems as ciphers on your face.",
  "All ciphers are nobel.",
  "A ciphers is better than a mystery.",
  "Is it dark or just an unsolved cipher.",
  "Your cipher is going to space.",
];

// Loaders/Spinner for loading awaits
const loader = `<div class='d-flex justify-content-center align-items-center loader-container-1'><div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div></div>`;

const loader2 = `
<div class='loader-container-2 text-center bg-secondary p-4 rounded-lg'>
    <div class="loader">
        <svg viewBox="0 0 80 80">
            <circle id="test" cx="40" cy="40" r="32"></circle>
        </svg>
    </div>

    <div class="loader triangle">
        <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
    </div>

    <div class="loader">
        <svg viewBox="0 0 80 80">
            <rect x="8" y="8" width="64" height="64"></rect>
        </svg>
    </div>
    <br><br>
    <div class="loading-text text-center text-primary"><h5>Converting<span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span></h5></div>
</div>
`;

const loader3= `
<div class="placeholder">
	        <div class="loader-3">
	          <div class="loader1 theme-change-div bg-dark"></div>
	          <div class="loader2 theme-change-div bg-dark"></div>
	          <div class="loader3 theme-change-div bg-dark"></div>
	        </div>
		</div>
`;

const loaderCustom=`  
<div class="loader-container-1 my-2 p-2 px-3 text-primary rounded " id="custom-loader" style="width: fit-content !important;">
<i class="fas fa-hourglass-start fa-2x"></i>
</div>`

// {Hint} Code-Scheme => 2 6 12 20 30 42. . . .

var codeScheme = {}; // stores the key to encode the string to numbers
var decodeScheme = {}; // stores the key to decode the nmbers to string

//Sets the key into the codeScheme Object (runs on window load)
function setCodeScheme() {
  var inc = 2;
  var c;

  for (var i = 1; i <= 26; i++) {
    c = i * inc;
    inc += 1;
    codeScheme[c] = String.fromCharCode(i + 64).toLowerCase();
  }
  codeScheme[" "] = " ";

  // console.log(codeScheme);
}

//Sets the key into the decodeScheme Object ( runs on window load)
function setDecodeScheme() {
  var inc = 2;
  var c;

  for (var i = 1; i <= 26; i++) {
    c = i * inc;
    inc += 1;
    decodeScheme[String.fromCharCode(i + 64).toLowerCase()] = c;
  }
  decodeScheme[" "] = " ";

  // console.log(decodeScheme);
}

// Converts string into cipher(code)
function encode(str) {
  //str -> 'demo string'

  var result = [];
  var splittedStr = str.split(" ");

  for (var i = 0; i < splittedStr.length; i++) {
    if (i > 0) {
      result.push(" ");
    }
    for (var j = 0; j < splittedStr[i].length; j++) {
      result.push(decodeScheme[splittedStr[i][j].toLowerCase()]);
      result.push("-");
      // console.log(decodeScheme[splittedStr[i][j].toLowerCase()]);
    }
    result.pop();
  }

  //console.log(result);
  return result.join("").toString();
}

// Converts cipher(code) back to string
function decode(numCode) {
  //numCode -> '20-30-182-240  210-462-182-12-240-20-30'
  var tempRes = [];
  var result = [];
  var splittedNumCode = numCode.toString().split(" ");

  //console.log(typeof(splittedNumCode));
  //console.log(splittedNumCode);

  for (var i = 0; i < splittedNumCode.length; i++) {
    if (splittedNumCode[i] == "") {
      delete splittedNumCode[i];
    } else {
      tempRes.push(splittedNumCode[i].split("-"));
    }
  }

  for (var i = 0; i < tempRes.length; i++) {
    if (i > 0) {
      result.push(" ");
    }
    for (var j = 0; j < tempRes[i].length; j++) {
      result.push(codeScheme[tempRes[i][j]]);
    }
  }

  //console.log(result);
  return result.join("");
}

//Sets the conversion flow { string->cipher || cipher->string } (runs on window load)
function setConversion() {
  if (flag == true) {
    localStorage.setItem("conversionTo", "cipher");
  } else if (flag == false) {
    localStorage.setItem("conversionTo", "text");
  } else {
    localStorage.setItem("conversionTo", "text");
  }
}

// On the basis of the conversion flow, dynamically displays the selected view
// And also handles respective conversions
function showDynamicView() {
  var randomMsg =
  randomMessages[Math.floor(Math.random() * randomMessages.length)];
  dynamicViewDiv.classList.add("no-before");
  dynamicViewDiv.classList.add("no-after");
  if (localStorage.getItem("conversionTo") == "text") {
    dynamicViewDiv.innerHTML = loaderCustom;

    setTimeout(() => {
      //  requirs -> ${numCode} and ${decode(numCode)}
      dynamicViewDiv.innerHTML = "";
      dynamicViewDiv.innerHTML = `
            <div class="form-group">
                <div class='d-flex justify-content-between align-items-start'>
                    <p class='h3'><span class="badge badge-dark p-2"> Cipher &nbsp; <i class="fas fa-arrow-right fa-md"></i> &nbsp; Text </span> </p>
                    <p class='h3' id='reset-choice-icon'><span class='badge badge-dark p-2'><i class='fas fa-sync-alt text-white bg-dark'></i></span></p>
                </div>
                <br>
                <div class="input-group mb-3">
                    <input type="text" class="form-control target-cipher" placeholder="Enter cipher..." aria-label="Enter cipher" aria-describedby="basic-addon2 required">
                    <div class="input-group-append">
                        <button class="btn btn-primary" id='to-text-button' type="submit"><i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
            <br>
            <div class='rounded-lg text-light p-4' id='resDiv' style='background-color: #323C47;'>
                <h2 class='text-center text-light p-4'>${randomMsg}</h2>
            </div>
            `;

      localStorage.setItem("targetCipher", "");
      const resDiv = document.querySelector("#resDiv");

      $("#reset-choice-icon").on("click", () => {
        //location.reload();
        showDynamicView();
      });

      $(".target-cipher").on("change", function () {
        localStorage.setItem("targetCipher", $(this).val());
      });

      $("#to-text-button").on("click", () => {
        //console.log(localStorage.getItem("targetCipher"));

        if (
          localStorage.getItem("targetCipher") == "" ||
          localStorage.getItem("targetCipher") == " "
        ) {
          alert("Target cannot be empty");
          resDiv.innerHTML = `<h2 class='text-center text-danger'>Error</h2>`;
          resDiv.innerHTML += `<h3>
                        Cipher   <span class="badge badge-dark text-white block-badge p-3">Cannot be empty</span>
                        <br>
                        Text   <span class="badge badge-dark text-white block-badge p-3">Error404 🥺 </span> 
                        </h3>`;
        } else {
          resDiv.innerHTML = loader2;
          setTimeout(() => {
            resDiv.innerHTML = `<h2 class='text-center text-success'><u>Results</u></h2><br>`;
            resDiv.innerHTML += `
                      <div>

                      <h3>Cipher</h3> 
                      <div class='my-2 rounded-lg bg-dark' >
                      <h4 class='text-start text-info p-4' id='cpy-text-1'> ${localStorage.getItem("targetCipher")}</h4>
                      </div>

                      <br>

                      <h3>Text</h3> 
                      <div class='my-2 rounded-lg bg-dark' >
                      <h4 class='text-start text-info p-4' id='cpy-cipher-1'> ${decode(localStorage.getItem("targetCipher"))}</h4>
                      </div>

                      </div>`;
                      
                      $('#cpy-text-1').on('click',(e)=>{
                        //console.log(e.target.id);
                        copyToClipboard(e.target.id)
                        $('.copied-msg').css('animation','copied-msg 2s ease-out')
                          setTimeout(()=>{
                            $('.copied-msg').css('animation','none')
                          },2100)
                      });

                      $('#cpy-cipher-1').on('click',(e)=>{
                        //console.log(e.target.id);
                        copyToClipboard(e.target.id)
                        $('.copied-msg').css('animation','copied-msg 2s ease-out')
                          setTimeout(()=>{
                            $('.copied-msg').css('animation','none')
                          },2100)
                      });
          }, 2500);
        }
      });
    }, 2500);
  } else if (localStorage.getItem("conversionTo") == "cipher") {
    dynamicViewDiv.innerHTML = loaderCustom;

    setTimeout(() => {
      //  requirs -> ${str} and ${encode(str).split(' ').join(`&nbsp`)}
      dynamicViewDiv.innerHTML = "";
      dynamicViewDiv.innerHTML = `
            <div class="form-group">
                <div class='d-flex justify-content-between align-items-center'>
                    <p class='h3'><span class="badge badge-dark p-2"> Text &nbsp; <i class="fas fa-arrow-right fa-md"></i> &nbsp; Cipher </span> </p>
                    <p class='h3' id='reset-choice-icon'><span class='badge badge-dark p-2'><i class='fas fa-sync-alt text-white bg-dark'></i></span></p>
                </div>
                <br>
                <div class="input-group mb-3">
                    <input type="text" class="form-control target-text" placeholder="Enter text..." aria-label="Enter text" aria-describedby="basic-addon2" required>
                    <div class="input-group-append">
                        <button class="btn btn-primary " id='to-cipher-button' type="submit"><i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
            <br>
            <div class='rounded-lg text-light p-4' id='resDiv' style='background-color: #323C47;'>
                <h2 class='text-center text-light p-4'>${randomMsg}</h2>
            </div>
            `;

      localStorage.setItem("targetText", "");
      const resDiv = document.querySelector("#resDiv");

      $("#reset-choice-icon").on("click", () => {
        //location.reload();
        showDynamicView();
      });

      $(".target-text").on("change", function () {
        localStorage.setItem("targetText", $(this).val());
      });

      $("#to-cipher-button").on("click", () => {
        //console.log(localStorage.getItem("targetText"));

        if (
          localStorage.getItem("targetText") == "" ||
          localStorage.getItem("targetText") == " "
        ) {
          alert("Target cannot be empty");
          resDiv.innerHTML = `<h2 class='text-center text-danger'>Error</h2>`;
          resDiv.innerHTML += `<h3>
                    Text   <span class="badge badge-dark text-white block-badge p-3">Cannot be empty</span>
                    <br>
                    Cipher   <span class="badge badge-dark text-white block-badge p-3">Error404 🥺</span> 
                    </h3>`;
        } else {
          resDiv.innerHTML = loader2;
          setTimeout(() => {
            resDiv.innerHTML = `<h2 class='text-center text-success'><u>Results</u></h2><br>`;
            resDiv.innerHTML += `
                        <div>

                        <h3>Text</h3>  
                        <div class='my-2 rounded-lg bg-dark' >
                        <h4 class='text-start text-info p-4' id='cpy-text-2'> ${localStorage.getItem("targetText")}</h4>
                        </div>
                        
                        <br>
                        
                        <h3>Cipher</h3> 
                        <div class='my-2 rounded-lg bg-dark' >
                        <h4 class='text-start text-info p-4' id='cpy-cipher-2'> ${encode(localStorage.getItem("targetText")).split(" ").join(' ')}</h4>
                        </div> 
                        </div>`;

                        $('#cpy-text-2').on('click',(e)=>{
                          //console.log(e.target.id);
                          copyToClipboard(e.target.id)
                          $('.copied-msg').css('animation','copied-msg 2s ease-out')
                          setTimeout(()=>{
                            $('.copied-msg').css('animation','none')
                          },2100)
                        });

                        $('#cpy-cipher-2').on('click',(e)=>{
                          //console.log(e.target.id);
                          copyToClipboard(e.target.id)
                          $('.copied-msg').css('animation','copied-msg 2s ease-out')
                          setTimeout(()=>{
                            $('.copied-msg').css('animation','none')
                          },2100)
                        });
          }, 2500);
        }
      });
    }, 2500);
  }
}

// Example implementation function (to demonstrate the working to the user) (runs on window load)
function exampleImplement() {
  str = "ciphers are fun"; //for demonstration
  numCode = "12-90-272-72-30-342-380 2-342-30 42-462-210"; //for demonstration
  tempDiv.innerHTML += `
    <div class='p-4 text-light rounded-lg' style='background:#323C47;'>
      <h3>Text</h3>   
      <div class='my-2 rounded-lg bg-dark' >
      <h4 class='text-start text-info p-4'> ${str}</h4>
      </div>
      <br>
      <h3>Cipher</h3>   
      <div class='my-2 rounded-lg bg-dark' >
      <h4 class='text-start text-info p-4'> ${encode(str).split(" ").join(`&nbsp`)}</h4>
      </div>
    </div>
    
    
    <div class="row m-2">
      <div class="col"><hr class='bg-dark rounded' /></div>
      <div class="col-auto d-flex align-items-center"><i class='theme-change-icon fas fa-arrow-circle-up fa-lg'></i>&nbsp;<i class='theme-change-icon fas fa-arrow-circle-down fa-lg'></i></div>
      <div class="col"><hr class='bg-dark rounded' /></div>
    </div>
    
    <div class='p-4 text-light rounded-lg' style='background:#323C47;'>
    <h3>Cipher</h3>   
    <div class='my-2 rounded-lg bg-dark' >
    <h4 class='text-start text-info p-4'>  ${numCode}</h4>
    </div>
    <br>
    <h3>Text</h3>   
    <div class='my-2 rounded-lg bg-dark' >
    <h4 class='text-start text-info p-4'> ${decode(numCode)}</h4>
    </div>
    </div>
    
    <br>
    
    <p class='text-secondary m-2'>Note: Provide the exact ciphers to decode precisely. Spaces and special symbols must be included.</p>
     `;
}

// On load function calls
window.onload = setCodeScheme();
window.onload = setDecodeScheme();
window.onload = setConversion();
window.onload = exampleImplement();

// All click functionalities
$("#toggle").on("click", () => {
  $("#toggle i").toggleClass("fa-chevron-circle-up");
  $('#toggle').toggleClass('btn-primary btn-info');
  setTimeout(() => {
    if (document.getElementById("toggle").ariaExpanded == "true") {
      //console.log('disabled key')
      $("#toggle2").attr("disabled", "disabled");
      $("#toggle2").addClass("btn-secondary");
    }
    if (document.getElementById("toggle").ariaExpanded == "false") {
      //console.log('enabled key')
      $("#toggle2").removeAttr("disabled");
      $("#toggle2").removeClass("btn-secondary");
    }
  }, 100);
});

$("#toggle2").on("click", () => {
  $("#toggle2 i").toggleClass("fa-chevron-circle-up");
  $('#toggle2').toggleClass('btn-primary btn-info');
  setTimeout(() => {
    if (document.getElementById("toggle2").ariaExpanded == "true") {
      //console.log('disabled example')
      $("#toggle").attr("disabled", "disabled");
      $("#toggle").addClass("btn-secondary");
    }
    if (document.getElementById("toggle2").ariaExpanded == "false") {
      //console.log('enabled example')
      $("#toggle").removeAttr("disabled");
      $("#toggle").removeClass("btn-secondary");
    }
  }, 100);
});

$(".cta").on("click", () => {
  showDynamicView();
});

$("#code-toggler").on("click", () => {
  flag = !flag;
  setConversion();
  console.log(
    "Conversion has been set to: " + localStorage.getItem("conversionTo")
  );

  showDynamicView();
});

// Handles feedback submission and responses
const handleSubmit = (e) => {
  const modalBody = document.querySelector(".modal-body");
  const modalHeader = document.querySelector(".modal-header h5");
  const modalFooter = document.querySelector(".modal-footer p");
  e.preventDefault();
  let myForm = document.getElementById("feedback-form");
  let formData = new FormData(myForm);
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      //console.log("Form successfully submitted");
      modalHeader.innerHTML = `Response`;
      modalBody.innerHTML = `<h4 class='text-success text-center'>Successfully submitted</h4>`;
      modalFooter.innerHTML = `Thank you for submitting your feedback.`;
    })
    .catch((error) => {
      console.log(error);
      modalHeader.innerHTML = `Response`;
      modalBody.innerHTML = `<h4 class='text-danger text-center'>Error sending response</h4>`;
      modalFooter.innerHTML = `Please try again later..`;
    });
};
if (handleSubmit) {
  document
    .querySelector("#feedback-form")
    .addEventListener("submit", handleSubmit);
}



function changeTheme(){
    const divs = document.querySelectorAll('.theme-change-div');
    const texts = document.querySelectorAll('.theme-change-text');
    const icons = document.querySelectorAll('.theme-change-icon');


    $('body').toggleClass('body-bg-change')
    
    for(let i=0; i<divs.length;i++){
       divs[i].classList.toggle('bg-dark');
       divs[i].classList.toggle('bg-light');
    }
    for(let i=0; i<texts.length;i++){
       texts[i].classList.toggle('text-light');
        
    }
    for(let i=0; i<icons.length;i++){
       icons[i].classList.toggle('text-light');
        
    }
}

 setTimeout(()=>{
  $('#beta').css('display','block')
  setTimeout(() => {
    $('#beta').css('opacity','1')
  }, 500);
 },3000)

 $('#dark-mode-btn').on('click', ()=>{
   
     if($('#moon-icon').css('display')=='none'){ 
       $('#moon-icon').css('display','block');
       $('#sun-icon').css('display','none');
       localStorage.setItem('isDark',true);
       $('#theme-info').text('Dark-Mode');
     }
     else if($('#sun-icon').css('display')=='none'){
       $('#sun-icon').css('display','block');
       $('#moon-icon').css('display','none');
       localStorage.setItem('isDark',false);
       $('#theme-info').text('Light-Mode');
     }
     changeTheme();
 
});


function checkTheme(){
  if(localStorage.getItem('isDark')=='true'){
    const allDivs= document.querySelectorAll('div');
    for(var i=0;i<allDivs.length;i++){
      allDivs[i].style.transition='none';
     }

    changeTheme();
    $('#moon-icon').css('display','block');
    $('#sun-icon').css('display','none');
    $('#theme-info').text('Dark-Mode');
  }else{
    $('#sun-icon').css('display','block');
    $('#moon-icon').css('display','none');
    $('#theme-info').text('Light-Mode');
  }
  
}

window.onload=checkTheme();


function updateStatus(){
  if(navigator.onLine){
    // $('main').css('display','none');
    $('.internet-status-container').css('display','block');
    $('.internet-status').css('color','green');
    $('.internet-status').html('<img src="./img/online.png" style="height:50px; width=:50px; "/><h4>Back online</h4><br><button class="btn btn-success btn-sm"><a href="./index.html">Refresh</a></button>');
  }else{
    // $('main').css('display','none');
    $('body').before('<div class="rounded-bottom bg-dark  mx-3 mx-md-4 mx-sm-4 mt-0 p-2 text-center text-danger">Your are currently offline</div>')
    $('.internet-status-container').css('display','block');
    $('.internet-status').css('color','red');
    $('.internet-status').html('<img src="./img/offline.png" style="height:50px; width=:50px; "/><h4>You are offline</h4><br><button class="btn btn-secondary btn-sm"><a href="./index.html">Try again</a></button>');
  }
}

window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);

setInterval(() => {
  $('#custom-loader i').toggleClass('fa-hourglass-start fa-hourglass-end') 
}, 1500);

// Handles *click to copy*
function copyToClipboard(id) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(`#${id}`).text()).select();
  document.execCommand("copy");
  $temp.remove();
}