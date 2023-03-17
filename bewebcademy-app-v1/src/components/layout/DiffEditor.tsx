import { DiffEditor as MonacoDiffEditor } from '@monaco-editor/react';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

const DiffEditor = (props: any) => {
    const [diffEditor, setDiffEditor] = useState<any>()

    useEffect(() => {
        setDiffEditor(<MonacoDiffEditor
            height="75vh"
            width="75vw"
            original={decodeURI(props.result)}
            modified={props.editorValue}
            language={props.language}
            theme="vs-dark"
        />
        )

    }, [props.result, props.editorValue, props.language])

    return (
        <Box >
            {diffEditor}
        </Box>
    )
}

export default DiffEditor