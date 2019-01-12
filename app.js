"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoteApp = function (_React$Component) {
	_inherits(NoteApp, _React$Component);

	function NoteApp(props) {
		_classCallCheck(this, NoteApp);

		var _this = _possibleConstructorReturn(this, (NoteApp.__proto__ || Object.getPrototypeOf(NoteApp)).call(this, props));

		_this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
		_this.handlePick = _this.handlePick.bind(_this);
		_this.handleAddOption = _this.handleAddOption.bind(_this);
		_this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
		_this.state = {
			options: []
		};
		return _this;
	}

	_createClass(NoteApp, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			try {
				var json = localStorage.getItem("options");
				var options = JSON.parse(json);

				if (options) {
					this.setState(function () {
						return {
							options: options
						};
					});
				}
			} catch (e) {
				// Do nothing;
			}
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate(prevProps, prevState) {
			if (prevState.options.length != this.state.options.length) {
				var json = JSON.stringify(this.state.options);
				localStorage.setItem("options", json);
			}
		}
	}, {
		key: "handleDeleteOptions",
		value: function handleDeleteOptions() {
			this.setState(function () {
				return { options: [] };
			});
		}
	}, {
		key: "handleDeleteOption",
		value: function handleDeleteOption(optionToBeRemoved) {
			this.setState(function (prevState) {
				return {
					options: prevState.options.filter(function (option) {
						return option !== optionToBeRemoved;
					})
				};
			});
		}
	}, {
		key: "handlePick",
		value: function handlePick() {
			var randomNum = Math.floor(this.state.options.length * Math.random());
			alert(this.state.options[randomNum]);
		}
	}, {
		key: "handleAddOption",
		value: function handleAddOption(option) {
			if (!option) {
				return "Enter valid value to add an item";
			} else if (this.state.options.indexOf(option) > -1) {
				return "Value already exists";
			} else {
				this.setState(function (prevState) {
					return { options: prevState.options.concat([option]) };
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var title = "NoteApp";
			var subtitle = "Put your life in the hands of a computer..";
			return React.createElement(
				"div",
				null,
				React.createElement(Header, { title: title, subtitle: subtitle }),
				React.createElement(Action, {
					hasOptions: this.state.options.length > 0,
					handlePick: this.handlePick
				}),
				React.createElement(Options, {
					handleDeleteOptions: this.handleDeleteOptions,
					options: this.state.options,
					handleDeleteOption: this.handleDeleteOption
				}),
				React.createElement(AddOption, {
					handleAddOption: this.handleAddOption
				})
			);
		}
	}]);

	return NoteApp;
}(React.Component);

var Header = function Header(props) {
	return React.createElement(
		"div",
		null,
		React.createElement(
			"h1",
			null,
			props.title
		),
		React.createElement(
			"h2",
			null,
			props.subtitle
		)
	);
};

var Action = function Action(props) {
	return React.createElement(
		"div",
		null,
		React.createElement(
			"button",
			{ disabled: !props.hasOptions, onClick: props.handlePick },
			"What should i do??"
		)
	);
};

var Options = function Options(props) {
	return React.createElement(
		"div",
		null,
		React.createElement(
			"button",
			{ onClick: props.handleDeleteOptions },
			"Remove All"
		),
		props.options.length === 0 && React.createElement(
			"p",
			null,
			"Please add an option to get started.."
		),
		props.options.map(function (option) {
			return React.createElement(Option, { handleDeleteOption: props.handleDeleteOption, key: option, option: option });
		})
	);
};

var AddOption = function (_React$Component2) {
	_inherits(AddOption, _React$Component2);

	function AddOption(props) {
		_classCallCheck(this, AddOption);

		var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

		_this2.appendOption = _this2.appendOption.bind(_this2);
		_this2.state = {
			error: undefined
		};
		return _this2;
	}

	_createClass(AddOption, [{
		key: "appendOption",
		value: function appendOption(e) {
			e.preventDefault();
			var err = this.props.handleAddOption(e.target.elements.addTheOption.value.trim());
			this.setState(function () {
				return { error: err };
			});
			if (!err) {
				e.target.elements.addTheOption.value = "";
			}
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				this.state.error && React.createElement(
					"p",
					null,
					this.state.error
				),
				React.createElement(
					"form",
					{ onSubmit: this.appendOption },
					React.createElement("input", { type: "text", autoComplete: "off", name: "addTheOption" }),
					React.createElement(
						"button",
						null,
						"Submit"
					)
				)
			);
		}
	}]);

	return AddOption;
}(React.Component);

var Option = function Option(props) {
	return React.createElement(
		"div",
		null,
		props.option,
		React.createElement(
			"button",
			{
				onClick: function onClick(e) {
					props.handleDeleteOption(props.option);
				}
			},
			"Remove"
		)
	);
};

ReactDOM.render(React.createElement(NoteApp, null), document.getElementById("app"));
