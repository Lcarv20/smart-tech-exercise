import { useLoaderData } from "react-router-dom"
import { Tag } from "../../stores/types"
import { useAppDispatch, useAppSelector } from "../../stores/hooks"
import { useEffect } from "react"
import { getTags } from "../../stores/tagsReducer"
import { Button } from "@mui/material"

export default function Tags() {
    const tags = useLoaderData() as Tag[]
    const dispatch = useAppDispatch()
    const tagsState = useAppSelector((state) => state.tags)

    useEffect(() => {
        dispatch(getTags(tags))
        // console.log("tags", tags)
        console.log("state:", tagsState)
    }, [tags])

    return (
        <div>
            <h1>
                Hello Tags Component!
            </h1>
            <Button onClick={() => console.log(tagsState)}>Log Tags</Button>
            {tagsState.map((tag) => (<p key={tag.id + tag.name}>#{tag.name}</p>))}
        </div>
    )
}
