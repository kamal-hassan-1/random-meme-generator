import React from "react";
export default function Main() {
	const [meme, setMeme] = React.useState({
		imageSrc: "http://i.imgflip.com/1bij.jpg",
		topText: "One does not simply",
		bottomText: "Walk into Mordor",
	});

	const handleChange = (event) => {
		const { value, name } = event.currentTarget;
		setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
	};

	return (
		<main>
			<div className="form">
				<label>
					Top Text
					<input
						type="text"
						placeholder={meme.topText}
						value={meme.topText}
						name="topText"
						onChange={handleChange}
					/>
				</label>

				<label>
					Bottom Text
					<input
						type="text"
						placeholder={meme.bottomText}
						value={meme.bottomText}
						name="bottomText"
						onChange={handleChange}
					/>
				</label>
				<button>Get a new meme image 🖼</button>
			</div>
			<div className="meme">
				<img src={meme.imageSrc} />
				<span className="top">{meme.topText}</span>
				<span className="bottom">{meme.bottomText}</span>
			</div>
		</main>
	);
}
