import { analyzeText } from "../_api/text_process_service"
import "../_styles/textform.css"
import Form from "next/form"

export default function TextForm() {

	return (
		<Form className="text-form" action={analyzeText}>
			<textarea className="text-box" name="text" />
			<div className="analyze-button-container">
				<button className="action-button" type="submit">Analyze</button>
			</div>
		</Form>
	)
}
