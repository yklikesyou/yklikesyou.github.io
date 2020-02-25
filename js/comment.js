const form = document.querySelector(".js-to-do"), //html에서 가져오고
  input = document.querySelector(".js-add-to-do"),
  list = document.querySelector(".js-list");

let toDos = [];

function persistToDos() {
  const stringToDo = JSON.stringify(toDos);
  localStorage.setItem("toDos", stringToDo);
}
// JSON = 데이터를 전달할때, js가 그걸 다룰 수 있도록 바꿔주는 기능
function saveToDo(text) {
  const toDoObject = {
    id: toDos.length + 1,
    value: text
  };
  toDos.push(toDoObject);
  persistToDos();
}

function handleDelete(event) {
  const target = event.target; // console.dir(event.target)으로 찾아봄. 어떤게 id를 포함하고 있는 객체인지
  const li = target.parentElement;
  const ul = li.parentElement;
  const toDoId = li.id;
  ul.removeChild(li);
  toDos = toDos.filter(function(toDo) {
    // filter() = array의 모든 아이템을 함수에 실행하고, true인 아이템들만 가지고 새로운 array를 만든다.
    return toDo.id !== parseInt(toDoId); // = toDo가 'li'의 id와 같지 않을때 return해줘!
  }); // parseInt는 string을 숫자로 바꿔줌
  persistToDos();
}

function addToDo(text) {
  //html에 생성
  const toDo = document.createElement("li");
  toDo.className = "toDo";
  toDo.id = toDos.length + 1;
  const deleteBtn = document.createElement("span");
  deleteBtn.innerHTML = "❌";
  deleteBtn.className = "toDo__button";
  deleteBtn.addEventListener("click", handleDelete);
  const label = document.createElement("label");
  label.innerHTML = text;
  toDo.appendChild(deleteBtn);
  toDo.appendChild(label);
  list.appendChild(toDo); // li안에 넣어
  saveToDo(text);
}

function onSubmit(event) {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addToDo(value);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem("toDos");
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      // forEach = 함수를 실행할 때, array에 담겨있는 것들 각각 한번씩 함수를 실행시켜줌. 즉, array를 위한 function같은 느낌.
      addToDo(toDo.value);
    });
  }
  return;
}

function init() {
  loadToDos();
}

form.addEventListener("submit", onSubmit);

init();
// filter와 forEach는 list에 있는 모든 item을 위한 함수를 실행시키는 것
