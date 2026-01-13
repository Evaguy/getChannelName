function getChannelName(url) {
  try {
    const html = UrlFetchApp.fetch(url, {
      'muteHttpExceptions': true,
      'headers': {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }).getContentText();
    
    // Chercher le nom de la chaîne dans différents formats
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
    
    // Format 4: Dans videoDetails
    if (!channelName) {
      match = html.match(/"videoDetails"[^}]*"author":"([^"]+)"/);
      if (match) channelName = match[1];
    }
    
    // Enlever " - Topic" à la fin
    if (channelName) {
      channelName = channelName.replace(/ - Topic$/i, "").trim();
      // Forcer le retour en texte brut en ajoutant un espace invisible ou apostrophe
      channelName = "'" + channelName;
    }
    
    return channelName ? channelName : "Non trouvé";
    
  } catch(e) {
    return "Erreur: " + e.message;
  }
}

function getArtistFromTitle(url) {
  try {
    const html = UrlFetchApp.fetch(url, {
      'muteHttpExceptions': true,
      'headers': {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }).getContentText();
    
    // Extraire le titre
    const match = html.match(/<title>([^<]+)<\/title>/);
    if (match) {
      const fullTitle = match[1].replace(" - YouTube Music", "").trim();
      // Extraire l'artiste (avant le premier " - ")
      let artist = fullTitle.split(" - ")[0].trim();
      // Enlever " - Topic" à la fin
      artist = artist.replace(/ - Topic$/i, "").trim();
      // Forcer le texte brut
      artist = "'" + artist;
      return artist;
    }
    
    return "Non trouvé";
    
  } catch(e) {
    return "Erreur: " + e.message;
  }
}
