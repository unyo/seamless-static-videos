document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('videoElement');
    const mediaSource = new MediaSource();
    videoElement.src = URL.createObjectURL(mediaSource);

    const videoUrls = [
        '1.webm',  // Replace with the actual URL of your first video
        '2.webm'  // Replace with the actual URL of your second video
    ];

    let sourceBuffer;
    let nextVideoContent = null; // To store the ArrayBuffer of the next video
    let videoIndex = 0; // Index to keep track of the current video being processed
    const N = 10; // Number of seconds before the end to start loading the next video

    mediaSource.addEventListener('sourceopen', async function() {
        sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8, vorbis"');
        loadAndAppendVideo(videoIndex);
    });

    async function loadAndAppendVideo(index) {
        const content = await fetch(videoUrls[index]).then(response => response.arrayBuffer());
        appendBuffer(sourceBuffer, content);
        videoIndex++;
    }

    function appendBuffer(sourceBuffer, content) {
        sourceBuffer.addEventListener('updateend', onVideoAppended, { once: true });
        sourceBuffer.appendBuffer(content);
    }

    function onVideoAppended() {
        if (videoIndex < videoUrls.length) {
            videoElement.addEventListener('timeupdate', onTimeUpdate);
            videoElement.addEventListener('ended', onVideoEnded, { once: true });
        }
    }

    async function onTimeUpdate() {
        const remainingTime = videoElement.duration - videoElement.currentTime;
        if (remainingTime <= N && !nextVideoContent && videoIndex < videoUrls.length) {
            videoElement.removeEventListener('timeupdate', onTimeUpdate); // Prevent multiple loads
            nextVideoContent = await fetch(videoUrls[videoIndex]).then(response => response.arrayBuffer());
        }
    }

    function onVideoEnded() {
        if (nextVideoContent) {
            appendBuffer(sourceBuffer, nextVideoContent);
            nextVideoContent = null; // Reset for the next cycle
        }
    }
});