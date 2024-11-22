import fs from 'fs';

const handleGreeting = async (m, gss) => {
  try {
    const textLower = m.body.toLowerCase();

    const triggerWords = [
      'send', 'share', 'snd', 'sent', 'save', 'ewhan', 'ewanna',
      'ewanawako', 'dpn', 'one', 'danna', 'dannako', 'ewannko', 'ewpn', 'dapan' ,
      'ewpn', 'oni', 'එවහන්', 'එවන්න' ,
      'එවනවකො' , 'දාපන්' , 'ඕනි' ,
      'දාන්න' , 'දාන්නකො' , 'එවන්නකො' , 'එවපන්' , 'ඕනෙ'
    ];

    if (triggerWords.includes(textLower)) {
      if (m.message && m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo) {
        const quotedMessage = m.message.extendedTextMessage.contextInfo.quotedMessage;

        if (quotedMessage) {
          // Check if it's an image
          if (quotedMessage.imageMessage) {
            const imageCaption = quotedMessage.imageMessage.caption;
            const imageUrl = await gss.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
            await gss.sendMessage(m.from, {
              image: { url: imageUrl },
              caption: imageCaption,
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: true,
              },
            });
          }

          // Check if it's a video
          if (quotedMessage.videoMessage) {
            const videoCaption = quotedMessage.videoMessage.caption;
            const videoUrl = await gss.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
            await gss.sendMessage(m.from, {
              video: { url: videoUrl },
              caption: videoCaption,
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: true,
              },
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export default handleGreeting;