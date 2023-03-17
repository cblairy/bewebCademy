import { Box } from "@mui/system"

const Statement = (props: any) => {
    const { statement } = props;

    return(
        <Box sx={{
            width:"20vw",
            border: "5px solid black",
            height: "100%",
        }}
        >
            <p>{statement}</p>
        </Box>
    )
}

export default Statement;