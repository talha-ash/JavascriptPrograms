var a = 1;

function h() {
  if (a) var a = 9;//never run
  console.log(a);
}
h();

///////////////////////////////