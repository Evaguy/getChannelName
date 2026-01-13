function getChannelName(url) {
  try {
    const html = UrlFetchApp.fetch(url, {
      'muteHttpExceptions': true,
      'headers': {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }).getContentText();

    // search the name of the channel in different formats
    let channelName = null;
    
    // Format 1: "channelName":"..."
    let match = html.match(/"channelName":"([^"]+)"/);
    if (match) channelName = match[1];
    
    // Format 2: "author":"..."
    if (!channelName) {
      match = html.match(/"author":"([^"]+)"/);
      if (match) channelName = match[1];
    }
    
    // Format 3: "ownerChannelName":"..."
    if (!channelName) {
      match = html.match(/"ownerChannelName":"([^"]+)"/);
      if (match) channelName = match[1];
    }
    
    // Format 4: in videoDetails
    if (!channelName) {
      match = html.match(/"videoDetails"[^}]*"author":"([^"]+)"/);
      if (match) channelName = match[1];
    }
    
    // removes " - Topic"
    if (channelName) {
      channelName = channelName.replace(/ - Topic$/i, "").trim();
      // forces text instead of hyperlink using an "'"
      channelName = "'" + channelName;
    }
    
    return channelName ? channelName : "Non trouvé";
    
  } catch(e) {
    return "Erreur: " + e.message;
  }
}
