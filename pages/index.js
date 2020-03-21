import {Layout, Row, Col, PageHeader, Input, Button} from 'antd';

class CalculatorPage extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    expression: null,
	    result_text: "",
	  };
	}

	submit_form() {
		var xhr = new XMLHttpRequest()

		// Handles the xhr response
		xhr.addEventListener("load", () => {
			// Updates the flavour text
			var response = JSON.parse(xhr.responseText)

			if("result" in response) {
				this.setState({result_text: "Calculated Result is: " + response["result"]})
			}

			else if("validation_error" in response) {
				this.setState({result_text: response["validation_error"]})	
			}

			else {
				this.setState({result_text: "Something went wrong. Please try again later."})
			}
		})

		// Opens the request (url is hard-coded)
		xhr.open("POST", "https://bastor.pythonanywhere.com/api/v1/evaluate_expression")

		// Make sure the header specifies we are sending a json payload over
		xhr.setRequestHeader('Content-Type', 'application/json');

		// Stringify the data payload
		xhr.send(JSON.stringify({ expression: this.state.expression }))
	}

	render() {
		return (
			<Layout>
				<PageHeader
					className="site-page-header"
					title="Math expression calculator"
				/>
				<Row justify="space-around" type="flex">
					<Col span={12} md={12} xs={24}>
						<Input
							placeholder="Input a mathematical expression"
							onChange={e => this.setState({expression: e.target.value})}
							onPressEnter={this.submit_form.bind(this)}
						/>
						<Button type="default" onClick={this.submit_form.bind(this)}>Submit</Button>
					</Col>
				</Row>
				<Row justify="space-around" type="flex">
					<div>{this.state.result_text}</div>
				</Row>
			</Layout>
		)
	}
}

export default CalculatorPage
