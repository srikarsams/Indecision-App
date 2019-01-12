import React from "react";
import AddOption from "./AddOption.js";
import Header from "./Header.js";
import Action from "./Action.js";
import Options from "./Options.js";
import OptionModal from "./OptionModal.js";

export default class NoteApp extends React.Component {
	state = {
		options: [],
		selectedOption: undefined
	};
	handleDeleteOptions = () => {
		this.setState(() => ({options : []}));
	}
	handleDeleteOption = (optionToBeRemoved) => {
		this.setState((prevState) => ({
			options: prevState.options.filter((option) => option !== optionToBeRemoved)
		}));
	}
	handlePick = () => {
		let randomNum = Math.floor(this.state.options.length * Math.random()) ;
		let option = this.state.options[randomNum];
		if(option){
			this.setState(() => ({
				selectedOption: option
			}));
		}
	}
	handleAddOption = (option) => {
		if (!option){
			return "Enter valid value to add an item";
		} else if (this.state.options.indexOf(option) > -1){
			return "Value already exists";
		}else{
			this.setState((prevState) => ({options : prevState.options.concat([option])}));
		}	
	}
	handleSelectedOption = (option) => {
		if(selectedOption){
			this.setState((option) => ({
				selectedOption: option
			}));
		}
	}
	handleModalView = () => {
		this.setState(() => ({
			selectedOption: undefined
		}));
	}
	componentDidMount() {
		try {
			let json = localStorage.getItem("options");
			let options = JSON.parse(json);

			if(options) {
				this.setState(() => ({
					options
				}));
			}
		} catch(e) {
			// Do nothing;
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length != this.state.options.length){
			let json = JSON.stringify(this.state.options);
			localStorage.setItem("options", json);
		}
	}
	render() {
		let title = "Indecision App";
		let subtitle = "Put your life in the hands of a computer..";
		return (
			<div>
					<Header title={title} subtitle={subtitle}/>
					<div className="container">
					<Action 
						hasOptions={this.state.options.length > 0} 
						handlePick={this.handlePick}
					/>
					<div className="widget">
						<Options 
							handleDeleteOptions={this.handleDeleteOptions}
							options={this.state.options}
							handleDeleteOption={this.handleDeleteOption}
						/>
						<AddOption 
						handleAddOption={this.handleAddOption}
						/>
					</div>
					</div>
				<OptionModal 
					selectedOption={this.state.selectedOption}
					handleModalView={this.handleModalView}
				/>
			</div>
		);
	}
}