# node-greek-subs-cli
Download Greek subtitles through the terminal!

A cli tool that given a video path or a search query will search greek subtitles for it. Then it will download and unzip the subtitle with the most similar name to the search query based on [Levenshtein distance
](https://en.wikipedia.org/wiki/Levenshtein_distance).

## Install
`$ npm install -g greek-subs-cli`

## Usage
```
$ greek-subs --help

  Download greek subs like never before.

  Usage
    $ greek-subs <input>

  Options
    --timer, -t  Measure process time execution

  Examples
    $ greek-subs "Spiderman 1 2002 1080p x264.mkv"
    $ greek-subs "/home/Videos/Spiderman 1 (2002) 1080p x264"

```

## Related
- [greek-subs](https://www.npmjs.com/package/greek-subs) - Greek subtitles module