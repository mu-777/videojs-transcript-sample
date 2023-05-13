import * as React from 'react'
import videojs from 'video.js';
import 'video.js/dist/video-js.css';


const VideoPlayerView = ({
  srcMp4Url,
  currTimeUpdater,
  forceUpdateTime,
}) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  const options = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    muted: false,
  }

  React.useEffect(() => {
    if (!playerRef.current) {
      playerRef.current = videojs(videoRef.current, options, () => {
        const player = playerRef.current;
        player.src({ src: srcMp4Url, type: 'video/mp4' });
        player.on("timeupdate", ()=>{
          currTimeUpdater(player.currentTime());
        });
      });
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src({ src: srcMp4Url, type: 'video/mp4' });
    }
  }, [videoRef, srcMp4Url]);

  React.useEffect(()=>{
    playerRef.current.currentTime(forceUpdateTime);
  }, [forceUpdateTime])

  // https://zenn.dev/jun1026/articles/cf8b9ec24237bc
  // React.useEffect(() => {
  //   const player = playerRef.current;
  //   return () => {
  //     if (player && !player.isDisposed()) {
  //       player.dispose();
  //       playerRef.current = null;
  //     }
  //   };
  // }, [playerRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js" />
    </div>
  );
}

export default React.memo(VideoPlayerView);