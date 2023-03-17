import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AlertSuccess from "./AlertSuccess";
import { useState } from "react";
import AlertError from "./AlertError";

const CopyToClipBoard = (props: any) => {
    const [copySuccess, setCopySuccess] = useState("");
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);

    const copyToClipBoard = async () => {
        try {
            await navigator.clipboard.writeText(
                props.toCopy.current.getValue()
            );
            setCopySuccess("Copié!");
            setOpen(true);
        } catch (err) {
            setCopySuccess("La copie a échoué: " + err);
            setOpenError(true);
        }
    };

    return (
        <IconButton
            onClick={copyToClipBoard}
            size="small"
            sx={{ color: "white" }}
        >
            <AlertSuccess message={copySuccess} open={open} setOpen={setOpen} />
            <AlertError
                message={copySuccess}
                open={openError}
                setOpen={setOpenError}
            />
            <ContentCopyIcon />
        </IconButton>
    );
};

export default CopyToClipBoard;
