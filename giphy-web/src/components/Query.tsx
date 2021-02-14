import React, { useEffect, useState } from "react";
import "../styles/main.css";

enum ImagePosition {
    center_top = "center_top",
    center_bottom = "center_bottom",
    below = "below"
}


const Query = () => {
    const [queryInput, setQueryInput] = useState("");
    const [imageURLs, setImageURLs] = useState([""]);
    const [textOverlay, setTextOverlay] = useState("");
    const [imagePositon, setImagePositon] = useState("below");

    useEffect(() => {
        console.log("Query input: ", queryInput);
    }, [queryInput]);

    useEffect(() => {
        console.log("URLS: ", imageURLs);
    }, [imageURLs]);

    const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryInput(e.target.value);
    }
    const onChangeTextOverlay = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextOverlay(e.target.value);
    }
    const onClickSearch = async () => {
        if(queryInput){
            const req = await fetch(`https://api.giphy.com/v1/stickers/search?q=${queryInput}&limit=10&rating=g&api_key=1bkG7ky5cmw5SLyvNfElcR1iYVzs38Zq`);
            const res = await req.json();
    
            let currentImgURLs = [...imageURLs];
            for (let i = 0; i < 3; i++) {
                if (res.data[i]) {
                    let url = res.data[i].images.downsized_medium.url;
                    currentImgURLs.push(url);
                }
            }
            setImageURLs(currentImgURLs);
            console.log(res);
            return res;
        }
      
    }

    const onSelectImagePositionOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // console.log("EVENT: ", e.target.value);
        setImagePositon(e.currentTarget.value);
    }

    return (
        <div>
            <label htmlFor="queryInput">Search text: </label>
            <input type="text" id="queryInput" value={queryInput} onChange={onChangeQuery} />
            <button onClick={() => onClickSearch()}>Search</button>
            <label htmlFor="imageText">Text: </label>
            <input type="text" id="imageText" onChange={onChangeTextOverlay}/>
            <select onChange={onSelectImagePositionOption} >
                <option value={ImagePosition.below} className="testClass">{ImagePosition.below}</option>
                <option value={ImagePosition.center_bottom}>{ImagePosition.center_bottom}</option>
                <option value={ImagePosition.center_top}>{ImagePosition.center_top}</option>
            </select>

            <div className="container">
                {imageURLs.filter(imgURL => imgURL.length > 0).map(imgURL => (
                    
                    <div className="imageContainer">
                        <img src={imgURL} />
                        <div className={imagePositon}>{textOverlay}</div>
                    </div>

                ))}
            </div>

        </div>
    )
}

export default Query;