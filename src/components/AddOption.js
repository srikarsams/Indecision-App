import React from "react";

export default class AddOption extends React.Component {
	state = {
		error: undefined
	}
	appendOption = (e) => {
		e.preventDefault();
		const err = this.props.handleAddOption(e.target.elements.addTheOption.value.trim());
		this.setState(() => ({error: err}));
		if (!err) {
			e.target.elements.addTheOption.value = "";
		}

	};
	render() {
		return (
			<div>
				{this.state.error && <p className="add-option-error">{this.state.error}</p>}
				<form className="add-option" onSubmit={this.appendOption}>
					<input className="add-option__input" type='text' autoComplete="off" name='addTheOption' />
					<button className="button">Add Option</button>
				</form>
			</div>
		);
	}
}