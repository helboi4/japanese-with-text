import "./_styles/home.css"
import TextForm from "./_components/textForm";

export default function Home() {
	return (
		<section className="main-content">
			<div className="cta">
				<h2>↓ Paste your Japanese text here! ↓</h2>
			</div>
			<TextForm></TextForm>
		</section>
	);
}
