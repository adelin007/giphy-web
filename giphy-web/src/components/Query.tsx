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
    const [imagesURLToDisplay, setImagesURLToDisplay] = useState([""]);
    const [textOverlay, setTextOverlay] = useState("");
    const [imagePositon, setImagePositon] = useState("below");
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        // console.log("imagesURLToDisplay: ", imagesURLToDisplay);
    }, [imagesURLToDisplay]);


    useEffect(() => {
        // console.log("Query input: ", queryInput);
    }, [queryInput]);

    useEffect(() => {
        // console.log("IMG index: ", imageIndex);
        let imgToDisplay = imageURLs.filter((img, index) => index > imageIndex && index <= imageIndex + 3);
        setImagesURLToDisplay(imgToDisplay);
    }, [imageIndex]);

    useEffect(() => {
        let imgToDisplay = imageURLs.filter((img, index) => index >= imageIndex && index <= imageIndex + 2);
        setImagesURLToDisplay(imgToDisplay);
    }, [imageURLs]);

    const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryInput(e.target.value);
    }
    const onChangeTextOverlay = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextOverlay(e.target.value);
    }
    const onClickSearch = async () => {
        if (queryInput) {
            const req = await fetch(`https://api.giphy.com/v1/stickers/search?q=${queryInput}&limit=10&rating=g&api_key=1bkG7ky5cmw5SLyvNfElcR1iYVzs38Zq`);
            const res = await req.json();
            let imgUrls = res.data.map((img: any) => img.images.downsized_medium.url);
            setImageURLs(imgUrls);
            setImageIndex(0);
        }

    }

    const onSelectImagePositionOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setImagePositon(e.currentTarget.value);
    }

    const onClickNext = () => {
        let currImgIndex = imageIndex;
        if(currImgIndex + 3 < imageURLs.length - 1){
            currImgIndex += 3;
            setImageIndex(currImgIndex);
        } else if(imageURLs.length > currImgIndex){
            setImageIndex(imageURLs.length - 2)
        }
      
    }
    const onClickPrevious = () => {
        let currImgIndex = imageIndex;
        if(currImgIndex - 3 > 0){
            currImgIndex -= 3;
            setImageIndex(currImgIndex);
        } else {
            setImageIndex(0);
        }
        
    }

    return (
        <div>
            <label htmlFor="queryInput">Search text: </label>
            <input type="text" id="queryInput" value={queryInput} onChange={onChangeQuery} />
            <button onClick={() => onClickSearch()}>Search</button>
            <label htmlFor="imageText">Text: </label>
            <input type="text" id="imageText" onChange={onChangeTextOverlay} />
            <select onChange={onSelectImagePositionOption} >
                <option value={ImagePosition.below} className="testClass">{ImagePosition.below}</option>
                <option value={ImagePosition.center_bottom}>{ImagePosition.center_bottom}</option>
                <option value={ImagePosition.center_top}>{ImagePosition.center_top}</option>
            </select>
            <div className="container">
                {imagesURLToDisplay.filter(url => url && url.length > 0).map((imgURL, index) => (
                <div className="imageContainer">
                    <img src={imgURL} style={{width: "100%", height: "100%"}}/>
                    <div className={imagePositon}>{textOverlay}</div>
                </div>
                   
                ))}
            </div>
            <div style={{marginTop: "100px"}}>
                <button style={{marginRight: "20px"}} disabled={!imageURLs || imageURLs.length < 2} onClick={() => onClickPrevious()}>PREVIOUS</button>
                <button disabled={!imageURLs || imageURLs.length < 2} onClick={() => onClickNext()}> NEXT</button>
            </div>
           
   
        </div>
    )
}

export default Query;