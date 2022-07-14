import "./Loading.css"
import hotdog from "./hotdog-1.1s-800px.png"


const Loading = () => {
    return (
        <div className="loading-container">
        <img className="hotdog-loader" src={hotdog} alt="Hot Dog Icon - Icon@pngkey.com" />
        </div>
    )
        
    
}

export default Loading