console.log("App.js is running");

// JSX - Javascript XML

// var template = <p>This is JSX from app.js using babel. Done by srikar</p>;
let appRoot = document.getElementById("app");
let random = "";
// ReactDOM.render(template, appRoot);

let app = {
	title: "NoteApp",
	subtitle: "Put your life in the hands of a computer",
	options: []
};

const removeAll = function () {
	app.options = [];
	reRender();
};

const addOption = function(e) {
	e.preventDefault();
	e.persist();
	let option = e.target.elements.newOption.value;
	if(option){
		app.options.push(option);
		e.target.elements.newOption.value = "";
		reRender();
	}
};

const makeDecision = function() {
	let number = Math.floor(Math.random() * app.options.length);
	random = app.options[number];
	reRender();
};


const reRender = function(){
	const templateTwo = (
		<div>
			<h1>{app.title}</h1>
			{app.subtitle&&<p>{app.subtitle}</p>}
			<p>{app.options.length ? "Here are your options!" : "No Options"}</p>
			<button disabled={app.options.length === 0} onClick={makeDecision}>What should i do?</button>
			<button onClick={removeAll}>Remove all</button>
			{random && <p>{random}</p>}
			<ol>
				{
					app.options.map((option) => <li key={option}>{option}</li>)
				}
			</ol>
			<form onSubmit={addOption}>
				<input name="newOption" type="text" autoComplete="off" placeholder="Input your task"></input>
				<button>Add option</button>
			</form>
		</div>
	);
	ReactDOM.render(templateTwo, appRoot);
};
reRender();



