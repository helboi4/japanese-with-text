import DictEntry from "../_types/dictEntry";

export default function DictEntryDisplay({ entry }: { entry: DictEntry }) {
	const wordKanji: string[] | null = entry.word_kanji ? entry.word_kanji : null;
	const wordKana: string[] | null = entry.word_kana ? entry.word_kana : null;
	const senses = entry.senses;

	return (
		<div className="entry-content">
			<h2 className="key-word">{wordKanji ? wordKanji : wordKana}</h2>
			<h3 className="reading">Reading: {wordKana}</h3>
			<ol className="sense-list">
				{senses.map((sense, index) => (
					<li key={index} className="sense-list-item">
						<p className="definition">{sense.definitions.join("; ")}</p>
						{sense.extra_info && <p>{sense.extra_info}</p>}
					</li>
				))
				}
			</ol>
		</div>
	)
}

