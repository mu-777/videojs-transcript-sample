import * as React from 'react'
import {
  Box,
  Stack,
  Typography,
  CssBaseline
} from "@mui/material"
import {
  ThemeProvider,
  createTheme
} from '@mui/material/styles'
import './App.css'
import { WebVTTParser } from 'webvtt-parser';

import VideoPlayerView from './VideoPlayerView'
import TranscriptView from './TranscriptView'

// https://github.com/videojs/video.js/tree/main/docs/examples/elephantsdream
const srcData = {
  videoPath: "http://d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4",
  webvttPath: "https://raw.githubusercontent.com/videojs/video.js/main/docs/examples/elephantsdream/captions.en.vtt"
}


function App() {
  const theme = createTheme({
    typography: {
      fontSize: 14,
      fontFamily: '"Roboto"',
      fontWeightRegular: 300,
    },
  });

  const [currentVideoTime, setCurrentVideoTime] = React.useState(0);
  const [forceUpdateVideoTime, setForceUpdateVideoTime] = React.useState(0);
  const [webvtt, setWebvtt] = React.useState(null);
  React.useEffect(() => {
    fetch(srcData.webvttPath)
      .then((res) => res.text())
      .then((text) => {
        const parser = new WebVTTParser();
        setWebvtt(parser.parse(text, 'metadata'));
      });
  }, [srcData])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: '100%', height: '100%' }}>
        <Stack spacing={4} justifyContent="flex-start" alignItems="center">
          <Typography variant="h2">
            Video+Transcript Sample
          </Typography>
          <VideoPlayerView srcMp4Url={srcData.videoPath}
            currTimeUpdater={setCurrentVideoTime}
            forceUpdateTime={forceUpdateVideoTime} />
          <Stack spacing={2} justifyContent="flex-start" alignItems="center"
            sx={{ width: '100%' }}>
            <Typography variant="h3" sx={{ textAlign: "left", width: '100%' }}>
              Transcript
            </Typography>
            <TranscriptView webvtt={webvtt}
              currTime={currentVideoTime}
              forceUpdateTimeSetter={setForceUpdateVideoTime} />
          </Stack>
          <Stack spacing={1} justifyContent="flex-start" alignItems="center"
            sx={{ width: '100%' }}>
            <Typography variant="body2" sx={{ textAlign: "left", width: '100%' }}>
              Video by <a href="https://orange.blender.org/">Elephants Dream</a> (Licensed under CreativeCommons)
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "left", width: '100%' }}>
              Transcript by <a href="https://github.com/videojs/video.js/blob/main/docs/examples/elephantsdream/captions.en.vtt">video.js sample</a> (Licensed under the Apache License, Version 2.0.)
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  )
}

export default App