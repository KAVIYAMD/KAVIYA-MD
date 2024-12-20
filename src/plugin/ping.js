const ping = async (m, sock) => {
  const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';

  if (cmd === "ping") {
    const start = new Date().getTime();
    await m.React('😼');
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    const text = `*KAVIYA-MD SPEED: ${responseTime.toFixed(2)} s 😼📵*`;
    sock.sendMessage(m.from, { text }, { quoted: m });
  }
}

export default ping;
