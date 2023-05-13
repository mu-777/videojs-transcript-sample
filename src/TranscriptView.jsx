import * as React from 'react'
import {
  Box,
  List,
  ListItemButton,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material"
import {
  styled
} from '@mui/material/styles';

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

const TranscriptView = ({
  webvtt,
  currTime,
  forceUpdateTimeSetter,
}) => {
  const TimeTypography = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
  }));
  const ScriptTypography = styled(Typography)(({ theme }) => ({
  }));

  return (
    <Box sx={{ width: '100%' }}>{
      (!webvtt)
        ? <CircularProgress />
        : <List sx={{ width: '100%', maxHeight: "500px", overflow: "scroll" }}>
          {webvtt.cues.map((cue, index) => {
            return (
              <ListItemButton
                key={index}
                selected={cue.startTime <= currTime && currTime < ((webvtt.cues[index + 1])?.startTime || currTime+1)}
                onClick={()=>{forceUpdateTimeSetter(cue.startTime)}}
                >
                <Stack
                  direction="row" justifyContent="flex-start"
                  alignItems="flex-start" spacing={2} >
                  <TimeTypography variant="body2">{formatTime(cue.startTime)}</TimeTypography>
                  <ScriptTypography variant="body1">{cue.text}</ScriptTypography>
                </Stack>
              </ListItemButton>
            );
          })}
        </List>
    }</Box>
  );
}

export default React.memo(TranscriptView);