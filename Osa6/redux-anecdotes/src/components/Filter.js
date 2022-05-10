import { useDispatch } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = () => {

    const dispatch = useDispatch()

    const handleChange = (e) => {
        e.preventDefault()
        dispatch(changeFilter(e.target.value))
    }

    return(
        <>
            <input onChange={(e) => handleChange(e)}></input>
        </>
    )
}

export default Filter