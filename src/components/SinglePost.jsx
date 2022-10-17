import { useParams } from 'react-router-dom'
import { useHistory } from "react-router"

export default function SinglePost(props) {
    
    const {id} = useParams()
    return (
        <div>
            <h1>Hello</h1>
            <h1>{id}</h1>
        </div>
    )
}