(function (){
var text = "outside";
function logIt() {
  console.log(text);
  var text = "inside";
}
logIt()
})()

var a = "42";

var b = a * 1;
console.log(b);
