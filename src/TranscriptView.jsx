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

  const listRef = React.useRef(null);
  const [selectedItemEl, setSelectedItemEl] = React.useState(null);
  const [isMouseOnList, setIsMouseOnList] = React.useState(false);
  React.useEffect(() => {
    if (listRef.current) {
      const selected = listRef.current.querySelector('.Mui-selected');
      if (selected) {
        setSelectedItemEl(selected);
      }
    }
  }, [currTime]);

  React.useEffect(() => {
    const upOffset = 3;
    if (!isMouseOnList && selectedItemEl && (selectedItemEl.tabIndex > (upOffset - 1))) {
      const focusedIndex = selectedItemEl.tabIndex - (upOffset - 1);
      const focusedItemEl = listRef.current.querySelector(`#${getListItemId(focusedIndex)}`);
      focusedItemEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedItemEl])

  const getListItemId = (index) => {
    return `listitem-id-${index}`;
  }

  const mouseOnListUpdateHandler = React.useCallback((isOn) => {
    setIsMouseOnList(isOn)
  }, [setIsMouseOnList])

  const timeUpdateHandler = React.useCallback((startTime) => {
    forceUpdateTimeSetter(startTime)
  }, [forceUpdateTimeSetter])

  return (
    <Box sx={{ width: '100%' }}>{
      (!webvtt)
        ? <CircularProgress />
        : <List ref={listRef} sx={{ width: '100%', maxHeight: "500px", overflow: "scroll" }}
          onMouseEnter={() => mouseOnListUpdateHandler(true)}
          onMouseLeave={() => mouseOnListUpdateHandler(false)}
        >
          {webvtt.cues.map((cue, index) => {
            return (
              <ListItemButton
                id={getListItemId(index)} key={index} tabIndex={index} dense={true}
                selected={cue.startTime <= currTime && currTime < ((webvtt.cues[index + 1])?.startTime || currTime + 1)}
                onClick={() => { timeUpdateHandler(cue.startTime) }}
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