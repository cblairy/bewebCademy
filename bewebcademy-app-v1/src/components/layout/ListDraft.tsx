import { Box } from "@mui/system";
import DraftCard from "./DraftCard"
import BeforeDraft from "../../models/beforeDraft"
import { useState, useEffect} from "react"
import { getBeforeDrafts } from "../../services/beforeDraft.service"



const ListDraft = () => {
    const [drafts, setDraft] = useState<BeforeDraft[]>([])
    
    useEffect(()=> {
        const fetchDraft = async() => {
            const data = await getBeforeDrafts().then((result:any)=> { return result })
            setDraft(data)
        }
        fetchDraft()
        
    },[])

    return(
        <Box> 
            {drafts.map((draft:Object)=> (
                <DraftCard draft={draft} /> 

            ))}

        </Box>
    )
}

export default ListDraft;