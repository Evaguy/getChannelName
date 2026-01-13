# getChannelName
Script that extract the artist name from a song on Youtube.
## why?
apparently you can export the title of a song on a google sheet, but not the artist/channel name.

that's why i've made this script using Apps Script!

## how?
it fetches YouTube's HTML, extracts the channel name via regex, removes " - Topic", adds a quote prefix to prevent auto-linking, and returns the clean artist name.

## how about the title?
i've said it before, you can export the title of a song on a google sheet, with this command 

(just replace "cell_id" with the cell containing the url) :

```
=SUBSTITUE(IMPORTXML(cell_id;"//meta[@name='title']/@content");" - YouTube Music";"")
```

that's the reason why this script only export the artist name (since i already know the song name).

## todo
* add the script lmao
* try to find a way to remove the "'" when the artist in exported in google sheet
* write a how-to guide (if im not lazy)
