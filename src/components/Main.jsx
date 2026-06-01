import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";

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

	const memeRef = useRef(null);

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

	const handleMemeDownload = async (event) => {
		event.preventDefault();
		if (memeRef.current === null) return;
		try {
			const url = await toPng(memeRef.current, { cacheBust: true });
			const link = document.createElement("a");
			link.download = `meme-${Date.now()}.png`;
			link.href = url;
			link.click();
		} catch (error) {
			console.error("Error downloading the meme", error);
		}
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
			<div
				className="meme"
				ref={memeRef}>
				<img
					src={meme.imgSrc}
					crossOrigin="anonymous"
				/>
				<span className="top">{meme.topText}</span>
				<span className="bottom">{meme.bottomText}</span>
			</div>
			<button
				onClick={handleMemeDownload}
				className="downloadBtn">
				Download your meme :)
			</button>
		</main>
	);
}
