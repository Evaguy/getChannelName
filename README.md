# getChannelName
Script that extract the artist name from a song on Youtube without using any kind of API !
## why?
apparently, when i was trying to extract metadata from a url for a project, you can export the title of a song on a google sheet, but not the artist/channel name.

that's why i've made this script using Apps Script!

also, for some reasons this only works for youtube music. trying to use the script on a normal youtube link doesn't work, so now i gotta see what's wrong or what do i need to add in the script so that it works...

## how?
it fetches YouTube's HTML, extracts the channel name via regex, removes " - Topic", adds a quote prefix to prevent auto-linking, and returns the clean artist name.

finally, you just need to call it like this, in your google sheet :

(just replace "cell_id" with the cell containing the url) :

```
=getChannelName(cell_id)
```

## how about the title?
i've said it before, you can export the title of a song on a google sheet, with this command 

(again, replace "cell_id" so that it works) :

```
=SUBSTITUE(IMPORTXML(cell_id;"//meta[@name='title']/@content");" - YouTube Music";"")
```

that's the reason why this script only export the artist name (since i already know the song name).

## todo
* fix normal youtube link issue
* find a way to remove the "'" when the artist in exported in google sheet
* write a how-to guide (if im not lazy)
