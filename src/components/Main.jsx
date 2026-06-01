import { useState, useEffect } from "react";
export default function Main() {
	const [meme, setMeme] = useState({
		topText: "One does not simply",
		bottomText: "Walk into Mordor",
		imgSrc: "http://i.imgflip.com/1bij.jpg",
	});

	const [memeArray, setMemeArray] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("https://api.imgflip.com/get_memes");
				const body = await response.json();
				setMemeArray(body.data.memes);
			} catch (err) {
				console.error("Failed to fetch memes:", err);
			}
		})();
	}, []);

	const handleChange = (event) => {
		const { value, name } = event.currentTarget;
		setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
	};

	const handleNewImage = () => {
		if (memeArray.length === 0) return;

		const randomNumber = Math.floor(Math.random() * 100);
		setMeme((prevMeme) => {
			return { ...prevMeme, imgSrc: memeArray[randomNumber].url };
		});
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
				<button onClick={handleNewImage}>Get a new meme image 🖼</button>
			</div>
			<div className="meme">
				<img src={meme.imgSrc} />
				<span className="top">{meme.topText}</span>
				<span className="bottom">{meme.bottomText}</span>
			</div>
		</main>
	);
}
