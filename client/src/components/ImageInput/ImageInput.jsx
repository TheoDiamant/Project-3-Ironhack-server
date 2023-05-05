import { useEffect, useRef, useState } from "react"
import "./ImageInput.css"

function ImageInput({imagesLoading, handleImages, imageURLs, setImageURLs}) {

    const deleteButtons = [...document.getElementsByClassName("removeImageButton")]
 
    const canvasRefs = useRef([null, null, null, null])
    const [imageURLsCopy, setImageURLsCopy] = useState([])
    const [triggered, setTriggered] = useState(false)

    useEffect(() => {
        loadCanvases()
        setImageURLsCopy(imageURLs)
    }, [imagesLoading])

    function loadCanvases() {
        imageURLs.forEach((url, index) => {
            const img = new Image()
            img.src = url
            img.onload = () => {
                const canvas = canvasRefs.current[index]
                const button = deleteButtons[index]
                
                const ctx = canvas.getContext("2d")
                
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                canvas.classList.add("fade-in")
                canvas.classList.remove("loading")
                button.style.display = "inline-block"
            }
        })
    }

    function handleFileInput(event) {
        if(triggered === true) {
            deleteButtons.forEach(button => {
                button.style.display = "none"
            })
            canvasRefs.current.forEach(canvas => {
                canvas.classList.remove("fade-in")
                const ctx = canvas.getContext("2d")
                ctx.clearRect(0, 0, canvas.width, canvas.height)
            })
        }
        else {
            setTriggered(true)
        }

        let files = [...event.target.files]
        
        if(files.length > 4) {
            files = files.slice(0, 4)
        }
        
        handleImages(files)
        for (let i = 0; i < files.length; i++) {
            canvasRefs.current[i].classList.add("loading")
        }
    }

    function handleClick(e) {
        e.preventDefault()
        const fileInput = document.getElementById("fileInput")
        fileInput.click()
    }

    function handleDelete(index, e) {
        e.preventDefault()

        const newURLs = imageURLs.filter(element => element !== imageURLsCopy[index])
        
        setImageURLs(newURLs)

        const canvas = canvasRefs.current[index]
        const button = deleteButtons[index]
        const ctx = canvas.getContext("2d")

        canvas.classList.remove("fade-in")
        button.style.display = "none"
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    return(
        <div className="imageInputDiv">
            <div>
                <div className="canvasDiv">
                    <canvas className="imageInputCanvas" ref={element => canvasRefs.current[0] = element}></canvas>
                    <button onClick={(e) => handleDelete(0, e)} className="removeImageButton">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="0" width="100" height="100" fill="#D70040" />
                            <line x1="0" y1="0" x2="100" y2="100" stroke="#FFF" strokeWidth="20" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="#FFF" strokeWidth="20" />
                        </svg>
                    </button>
                </div>
                <div className="canvasDiv">
                    <canvas className="imageInputCanvas" ref={element => canvasRefs.current[1] = element}></canvas>
                    <button onClick={(e) => handleDelete(1, e)} className="removeImageButton">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="0" width="100" height="100" fill="#D70040" />
                            <line x1="0" y1="0" x2="100" y2="100" stroke="#FFF" strokeWidth="20" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="#FFF" strokeWidth="20" />
                        </svg>
                    </button>
                </div>
            </div>
            <div>
                <div className="canvasDiv">
                    <canvas className="imageInputCanvas" ref={element => canvasRefs.current[2] = element}></canvas>
                    <button onClick={(e) => handleDelete(2, e)} className="removeImageButton">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="0" width="100" height="100" fill="#D70040" />
                            <line x1="0" y1="0" x2="100" y2="100" stroke="#FFF" strokeWidth="20" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="#FFF" strokeWidth="20" />
                        </svg>
                    </button>
                </div>
                <div className="canvasDiv">
                    <canvas className="imageInputCanvas" ref={element => canvasRefs.current[3] = element}></canvas>
                    <button onClick={(e) => handleDelete(3, e)} className="removeImageButton">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="0" width="100" height="100" fill="#D70040" />
                            <line x1="0" y1="0" x2="100" y2="100" stroke="#FFF" strokeWidth="20" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="#FFF" strokeWidth="20" />
                        </svg>
                    </button>
                </div>
            </div>
            <input multiple id="fileInput" className="hiddenImageInput" type="file" onChange={handleFileInput}/>
            <button className="fileInputButton" onClick={handleClick}><img src="https://static.vecteezy.com/system/resources/previews/000/421/494/original/upload-icon-vector-illustration.jpg" alt="" /></button>
        </div>
    )
}

export default ImageInput