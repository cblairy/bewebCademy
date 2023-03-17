import Editor from "@monaco-editor/react";
import { Box } from "@mui/system";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { IconButton } from "@mui/material";

const EditorMo = (props: any) => {
  const { language, displayName, value, onChange, help } = props;

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
    <Box
      sx={{
        color: "#ffffff",
        borderRadius: 0,
        border: "5px solid #1d1d1b",
      }}
    >
      <Box
        display="flex"
        justifyContent={"space-between"}
        flexDirection="row"
        sx={{ backgroundColor: "#db1144" }}
      >
        <Box sx={{ width: "100%" }}>
          <h3>{displayName}</h3>
        </Box>
        <Box>
          <IconButton sx={{ color: "white", height: "100%" }} onClick={() => openInNewTab(help)} >
            <QuestionMarkIcon />
          </IconButton>
        </Box>
      </Box>
      <Box bgcolor={"#1d1d1b"}>
        <Editor
          height="37.9vh"
          theme="vs-dark"
          path={displayName}
          defaultLanguage={language}
          value={value}
          onChange={(value) => onChange(value)}
        />
      </Box>
    </Box>
  );
}

export default EditorMo;