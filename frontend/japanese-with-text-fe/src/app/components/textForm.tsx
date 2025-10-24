import "../styles/textform.css"
import Form from "next/form"

export default function TextForm() {
	return (
		<Form className="text-form" action="/analyze">
			<textarea className="text-box" name="text" />
			<div className="analyze-button-container">
				<button className="action-button" type="submit">Analyze</button>
			</div>
		</Form>
	)
}
