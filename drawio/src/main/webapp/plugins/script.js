alert("run script.js");

function state() { console.log("State Changed!"); }

function inject(){
    document.body.style.backgroundColor = 'blue';
}

// this includes the function as text and the barentheses make it run itself.
var actualCode = "("+inject+")()"; 

document.documentElement.setAttribute('onreset', actualCode);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');
