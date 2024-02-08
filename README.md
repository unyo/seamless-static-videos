# Chrome static file gapless playback

This file was generated with ChatGPT, apparently Chrome can patch together .webm files but not .mp4 files
https://stackoverflow.com/a/24152971/2077884

Having read through the MSE stuff a while back, I thought that it would be able to handle .mp4 files w/ h.264 aac,
but apparently that's not the case. If you try and replace the .webm with .mp4, it'll throw an error
`MediaSource error: This SourceBuffer has been removed from the parent media source`.

## Credits

WebM Video files obtained from: 
https://www.webmfiles.org/demo-files/

Blender Foundation | www.blender.org
(c) copyright 2006, Blender Foundation / Netherlands Media Art Institute / www.elephantsdream.org
(c) copyright 2008, Blender Foundation / www.bigbuckbunny.org