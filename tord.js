let lastPlayer = null;

const players = (participants) =>
  participants
    .filter((p) => p.id.endsWith("@s.whatsapp.net"))
    .map((p) => p.id);

const naughtyTruths = [
  "What's the most embarrassing thing you've done in bed?",
  "Have you ever faked an orgasm?",
  "What’s your biggest turn on?",
  "Who in this group would you kiss?",
  "What's your wildest fantasy?",
  "What's a kink you haven't told anyone about?",
  "Have you ever sent nudes?",
  "What's the dirtiest text you've ever sent?",
  "Where’s the riskiest place you’ve had sex?",
  "Do you watch porn? What kind?",
  "Have you ever done a striptease?",
  "Ever done it in public?",
  "Do you like rough or gentle?",
  "Have you ever had a one-night stand?",
  "What's your body count?",
  "Have you had a friends-with-benefits?",
  "Have you ever hooked up with someone from a dating app?",
  "What turns you on instantly?",
  "Do you enjoy being dominated or dominating?",
  "What's the sexiest dream you’ve had?",
  // Add more here to reach 60+ naughty truths
];

const naughtyDares = [
  "Send a sexy emoji to someone in this group.",
  "Text your crush something flirty.",
  "Change your name to 'Horny [Name]' for 10 mins.",
  "Record yourself moaning and send it here.",
  "Lick your lips seductively on video.",
  "Send a kiss selfie to the group.",
  "Message a random contact ‘I’m horny’.",
  "Pretend to dirty talk for 30 seconds.",
  "Type your dirtiest thought right now.",
  "Do a sexy dance on video.",
  "Say 'I’m so hot right now' 3 times.",
  "Send a 😈 to your last crush.",
  "Send your last search in incognito mode.",
  "Show us your favorite sexy outfit (if safe).",
  "Send a fake naughty confession.",
  "Send a 🥵 selfie or gif.",
  "Send 'I'm feeling naughty' to your ex.",
  "Write a short, naughty story and send it here.",
  "Send a voice note saying 'I want you'.",
  "Pretend to flirt with the next person who messages.",
  // Add more here to reach 60+ naughty dares
];

const normalTruths = [
  "What's your biggest fear?",
  "Have you ever lied to your best friend?",
  "Who do you have a crush on?",
  "Have you ever cheated on a test?",
  "What’s your most embarrassing moment?",
  "What's something no one here knows about you?",
  "What’s your worst habit?",
  "Have you ever had a crush on a teacher?",
  "If you could change one thing about yourself, what would it be?",
  "What’s the dumbest thing you’ve ever done?",
  // Add more to make about 20
];

const normalDares = [
  "Do 10 jumping jacks.",
  "Sing a song for 30 seconds.",
  "Say the alphabet backwards.",
  "Change your profile pic to a meme.",
  "Post 'I love cheese' in your status.",
  "Send a selfie with a silly face.",
  "Do your best animal impression.",
  "Say something nice about the person above you.",
  "Type with your nose for the next message.",
  "Pretend to be a chicken for 15 seconds.",
  // Add more to make about 20
];

function getRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export const handler = async (m, { command, participants }) => {
  const playerList = players(participants);
  if (playerList.length === 0) {
    m.reply("No players found in the group!");
    return;
  }

  // Pick a player who wasn't picked last round
  let chosen;
  do {
    chosen = getRandom(playerList);
  } while (chosen === lastPlayer && playerList.length > 1);

  lastPlayer = chosen;

  const name = '@' + chosen.split("@")[0];

  if (/truth/i.test(command)) {
    const prompt = Math.random() < 0.8 ? getRandom(naughtyTruths) : getRandom(normalTruths);
    m.reply(`🗣 *Truth for* ${name}:\n${prompt}`, null, {
      mentions: [chosen],
    });
  } else {
    const prompt = Math.random() < 0.8 ? getRandom(naughtyDares) : getRandom(normalDares);
    m.reply(`🔥 *Dare for* ${name}:\n${prompt}`, null, {
      mentions: [chosen],
    });
  }
};

handler.command = /^(truth|dare)$/i;
handler.group = true;

export default handler;
