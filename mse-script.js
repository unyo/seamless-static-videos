document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('videoElement');
    const mediaSource = new MediaSource();
    videoElement.src = URL.createObjectURL(mediaSource);

    const videoUrls = [
        '1.webm',  // Replace with the actual URL of your first video
        '2.webm',  // Replace with the actual URL of your second video
        '3.webm'
    ];

    let sourceBuffer;
    let videoIndex = 0; // Index to keep track of the current video being processed

    mediaSource.addEventListener('sourceopen', async function() {
        sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8, vorbis"');
        await loadVideo(videoIndex);
    });

    async function loadVideo(index) {
        if (videoElement.duration) videoElement.pause()
        const content = await fetch(videoUrls[index]).then(response => response.arrayBuffer());
        appendBuffer(sourceBuffer, content);
    }

    function appendBuffer(sourceBuffer, content) {
        sourceBuffer.appendBuffer(content);
        sourceBuffer.addEventListener('updateend', onVideoAppended);
    }

    function onVideoAppended() {
        console.log('onVideoAppended')
        videoElement.currentTime = 0; // Reset playback to the beginning
        videoElement.addEventListener('timeupdate', onTimeUpdate);
        videoElement.play()
    }

    function onTimeUpdate() {
        const nearEnd = videoElement.duration - videoElement.currentTime <= 1; // 1 second before the video ends
        if (nearEnd && videoIndex < videoUrls.length - 1) {
            videoElement.pause();
            videoElement.removeEventListener('timeupdate', onTimeUpdate);
            //videoElement.currentTime = 0;
            videoIndex++;
            loadVideo(videoIndex);
        }
    }
});