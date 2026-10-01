// The whole vocabulary of the extension lives here: what Jev is asked, and the fixed
// sentences each answer turns into. Editing `says` changes the translation without
// re-asking Jev. Editing `criteria` changes the question, so saved results for it are
// ignored and posts get classified again.
//
// Each kind of post belongs to a group of kinds that are easy to confuse. When Jev
// is sure about the group but split inside it, the group's own sentence is used, so
// "I have an opinion." still appears when it can't tell an AI take from a prediction.
// When a kind has several wordings, one is picked per post, always the same for that post.

export const GROUPS = {
  job_news: { says: 'Brace yourself: job news.' },
  leaving: { says: "I don't work there any more. Plot twist." },
  job_search: { says: 'I need a job. Please, anything.' },
  recognition: { says: 'I did a thing. Applause, please.' },
  company: { says: 'My company did a thing. Golf clap.' },
  event: { says: 'I was at an event. There was a lanyard.' },
  takes: { says: 'I have a hot take, unprompted.' },
  advice: { says: "Here's advice you've heard before." },
  stories: { says: "Here's a suspiciously tidy moral." },
  thanks: { says: 'Cue the thank-you speech.' },
  asks: { says: 'I want something from you.' },
  status: { says: "Look how well I'm doing." },
  // Handled separately: still translated, never skipped, just gentler.
  keep: { says: null },
};

export const PURPOSES = {
  // ---------- job news ----------
  new_job: {
    group: 'job_news',
    criteria: {
      what: 'The author announces that they themselves are starting a new job or joining a new company.',
      not_for: 'Welcoming someone else who has joined the author’s team or company (that is team_welcome).',
    },
    says: ['I got a new job. Cue the confetti emoji.', 'I started a new job. New badge, who dis?'],
  },
  promotion: {
    group: 'job_news',
    criteria: 'The author was promoted or given a new title at the company they already work for.',
    says: ['I got promoted. Same desk, fancier title.', 'I have a new job title now. Still me.'],
  },
  internship: {
    group: 'job_news',
    criteria: 'The author is starting or has finished an internship, placement or apprenticeship.',
    says: ['I got an internship. Send coffee.'],
  },
  career_change: {
    group: 'job_news',
    criteria: 'The author is moving into a different field or kind of work, or going freelance.',
    says: ['I changed careers. Bold, honestly.', 'I do something different now. Ask me how.'],
  },
  founding: {
    group: 'job_news',
    criteria: 'The author announces they have started a new company or gone out on their own.',
    says: ['I started a company. Wish me luck, and funding.'],
  },
  work_anniversary: {
    group: 'job_news',
    criteria: 'The author marks an anniversary at their company or a number of years in their career.',
    says: ['I still work here. Somehow.', "I've worked here a while. Send cake."],
  },

  // ---------- leaving ----------
  leaving_job: {
    group: 'leaving',
    criteria: 'The author has left, or is leaving, a job by choice.',
    says: ['I left my job. It was time.', "I don't work there any more. Long story, short post."],
  },
  laid_off: {
    group: 'leaving',
    criteria: 'The author was laid off, made redundant or let go.',
    says: ["I was laid off. It's not me, it's the market.", 'I lost my job. Open to opportunities, allegedly excited.'],
  },
  retirement: {
    group: 'leaving',
    criteria: 'The author is retiring.',
    says: ['I retired. Finally.'],
  },

  // ---------- job search ----------
  job_hunting: {
    group: 'job_search',
    criteria: 'The author is looking for work, says they are open to work, or asks for job leads or referrals.',
    says: ['I need a job. Please, anything.', "I'm looking for work. DMs open."],
  },

  // ---------- recognition ----------
  award: {
    group: 'recognition',
    criteria: 'The author or their team received an award, an honour, or a place on a ranked list.',
    says: ['I won an award. There was a trophy.', 'Someone gave me an award. I acted surprised.'],
  },
  press: {
    group: 'recognition',
    criteria: 'The author or their company was featured, quoted or interviewed by a newspaper, magazine or website.',
    says: ['I was in the news. Briefly.', 'Someone wrote about me. I read it seven times.'],
  },
  certification: {
    group: 'recognition',
    criteria: 'The author completed a course, certificate, bootcamp or exam.',
    says: ['I finished a course. There was a quiz.', 'I got a certificate. My name is spelled right.'],
  },
  graduation: {
    group: 'recognition',
    criteria: 'The author graduated or finished a degree.',
    says: ['I graduated. Debt included.'],
  },

  // ---------- company ----------
  product_launch: {
    group: 'company',
    criteria: 'Announces that a new product, app, service or company has launched or is now available.',
    says: ['We launched something. It mostly works.', 'We shipped a thing. Bugs are features now.'],
  },
  feature_update: {
    group: 'company',
    criteria: 'Announces a new feature, update or improvement to a product that already exists.',
    says: ['We updated our product. Buttons moved.', "Our product does one more thing. You won't notice."],
  },
  fundraising: {
    group: 'company',
    criteria: 'Announces that a company raised money from investors, such as a seed or Series A round.',
    says: ["We raised money. Don't ask about runway."],
  },
  acquisition: {
    group: 'company',
    criteria: 'Announces that a company was bought, bought another company, or merged with one.',
    says: ['One company bought another. Synergy, apparently.'],
  },
  company_milestone: {
    group: 'company',
    criteria: 'Celebrates a company result: revenue, users, growth, a ranking or a company birthday.',
    says: ['Our company is doing well. Trust the chart.', 'Our numbers went up. Direction: good.'],
  },
  partnership: {
    group: 'company',
    criteria: 'Announces a partnership, integration or collaboration between companies.',
    says: ["We're working with another company. Logos, side by side."],
  },
  customer_win: {
    group: 'company',
    criteria: 'Announces a new customer, client, contract or deal.',
    says: ['We got a new customer. One down, infinity to go.'],
  },
  hiring: {
    group: 'company',
    criteria: 'The author or their company is recruiting people for open roles.',
    says: ["We're hiring. Good luck out there.", 'We have jobs going. Ping pong table included.'],
  },
  team_welcome: {
    group: 'company',
    criteria: 'Welcomes or introduces someone else who has just joined the author’s team or company.',
    says: ['Someone joined our team. Welcome, brave soul.', 'We hired someone. Seemed nice in the interview.'],
  },
  company_culture: {
    group: 'company',
    criteria: 'Shows a team having fun or its workplace: an offsite, a party, a team photo, office perks or company values.',
    says: ['My team did something fun. There are photos.', 'Our office is nice. Please still work from home though.'],
  },
  building_in_public: {
    group: 'company',
    criteria: 'Shares progress, numbers or lessons from something the author is building, as a running update.',
    says: ["Here's an update on my project. Progress: unclear.", "I'm building something. Ask me again next week."],
  },

  // ---------- events ----------
  event_recap: {
    group: 'event',
    criteria: 'The author attended a conference, meetup, summit or trade show and describes being there.',
    says: ['I went to an event. There were name tags.', 'I went to a conference. The coffee was free.'],
  },
  speaking: {
    group: 'event',
    criteria: 'The author is speaking, or spoke, on a stage, a panel or a webinar.',
    says: ["I'm speaking at an event. Slides not final.", 'I gave a talk. Someone clapped.'],
  },
  podcast: {
    group: 'event',
    criteria: 'The author appeared on, or hosts, a podcast, interview or livestream episode.',
    says: ['I was on a podcast. Link somewhere in the comments.'],
  },
  event_promo: {
    group: 'event',
    criteria: 'Invites readers to register for or attend an upcoming event, webinar or workshop.',
    says: ['Please come to our event. There will be snacks.'],
  },

  // ---------- takes ----------
  opinion: {
    group: 'takes',
    criteria: 'Argues an opinion about work, business or society, often framed as unpopular or contrarian.',
    says: ['I have an opinion. Buckle up.', "I have a take. It's spicy, apparently."],
  },
  ai_take: {
    group: 'takes',
    criteria: 'Argues an opinion or prediction about AI and what it will do to jobs, software or work.',
    says: ['I have thoughts about AI. Everyone does now.', 'I have an opinion about AI. Brace for the comments.'],
  },
  prediction: {
    group: 'takes',
    criteria: 'Predicts where an industry, market or technology is heading.',
    says: ['I have a prediction. Bold, unverifiable.', "I think I know what happens next. I don't."],
  },
  news_reaction: {
    group: 'takes',
    criteria: "Reacts to a news story, announcement or another company's move with the author's view of it.",
    says: ['Something happened, and I absolutely have thoughts.'],
  },

  // ---------- advice ----------
  generic_advice: {
    group: 'advice',
    criteria: {
      what: 'Broad career, leadership or business advice, or a list of tips, that most readers have heard before.',
      not_for: 'Specific technical detail, data or instructions a reader could not guess (that is substantive).',
    },
    says: ["Here's advice you've heard a thousand times.", "Here's some advice. You already knew it."],
  },
  lessons_learned: {
    group: 'advice',
    criteria: 'Lists lessons the author says they learned from an experience, a year, a job or a project.',
    says: ['I learned some lessons. The hard way, of course.', "Here's what I learned. Mostly common sense."],
  },
  motivation: {
    group: 'advice',
    criteria: 'A motivational or inspirational message: keep going, believe in yourself, hard work pays off.',
    says: ['Keep going, apparently.', "Believe in yourself. Or don't, whatever works."],
  },
  productivity: {
    group: 'advice',
    criteria: "Shares the author's routine, habits, schedule or productivity system.",
    says: ["Here's my 5am routine. You're welcome.", 'I have good habits. Please be in awe.'],
  },

  // ---------- stories ----------
  parable: {
    group: 'stories',
    criteria: 'Tells a story, often about a stranger, a job candidate, a child or a taxi driver, that ends in a moral lesson.',
    says: ["Here's a suspiciously tidy parable."],
  },
  origin_story: {
    group: 'stories',
    criteria: 'The author describes their own journey from a hard start, rejection or setbacks to where they are now.',
    says: ["I used to struggle, now I don't. Movie rights pending.", 'I overcame something. Cue the montage.'],
  },
  failure_story: {
    group: 'stories',
    criteria: 'The author openly describes a mistake or failure of their own and what it taught them.',
    says: ['I made a mistake. Growth, apparently.'],
  },

  // ---------- thanks ----------
  gratitude: {
    group: 'thanks',
    criteria: 'Mainly thanks colleagues, a manager, mentors, customers or a company.',
    says: ["I'd like to thank some people. It's basically an acceptance speech.", 'Thank you, everyone. Yes, all of you.'],
  },
  shoutout: {
    group: 'thanks',
    criteria: "Praises or recommends a specific colleague or someone else's work.",
    says: ['Someone I know is great. Tag yourself.'],
  },
  congratulations: {
    group: 'thanks',
    criteria: 'Congratulates someone else on their news, launch or achievement.',
    says: ['Congratulations to someone. Well deserved, probably.'],
  },

  // ---------- asks ----------
  selling: {
    group: 'asks',
    criteria: 'Mainly promotes something to buy or sign up for: a course, service, template, product, consulting or a call.',
    says: ['Please buy my thing.', "I'm selling something. Link in a comment."],
  },
  advert: {
    group: 'asks',
    criteria: "A brand's advertisement for its product or service, written by the company rather than a person.",
    says: ['This is an ad. Please clap for capitalism.'],
  },
  lead_magnet: {
    group: 'asks',
    criteria: 'Offers a free guide, template or resource in exchange for a comment, a follow or a connection.',
    says: ["Comment and I'll send you a PDF. Yes, really.", "Comment to get my free thing. It's a PDF."],
  },
  engagement_bait: {
    group: 'asks',
    criteria: 'Mainly exists to collect likes, comments, reposts or follows, for example by asking readers to agree or share.',
    says: ['Please like, comment and repost this. Please.'],
  },
  poll: {
    group: 'asks',
    criteria: 'Asks readers to vote in a poll or pick between options.',
    says: ['Please vote in my very scientific poll.'],
  },
  content_promo: {
    group: 'asks',
    criteria: "Promotes the author's own article, newsletter, video, podcast episode or book for readers to read or watch.",
    says: ['I made a thing. Please consume it.', 'Please read my newsletter. It has a name and everything.'],
  },

  // ---------- status ----------
  humblebrag: {
    group: 'status',
    criteria: {
      what: 'Mainly shows off the author’s success, money, status or popularity while presenting it as modesty, gratitude, luck or a lesson.',
      not_for: 'A plain announcement of a new job, promotion or award, which have their own options.',
    },
    says: ["Look how well I'm doing, humbly.", "I'd like you to be impressed. Casually."],
  },
  follower_milestone: {
    group: 'status',
    criteria: 'Celebrates follower, subscriber, view or impression counts on social media.',
    says: ['I got more followers. Numbers go up, dopamine goes up.', 'People read my posts, apparently.'],
  },
  met_someone: {
    group: 'status',
    criteria: 'The author shares meeting, or a photo with, a famous or important person.',
    says: ['I met someone important. There is a selfie.'],
  },
  business_travel: {
    group: 'status',
    criteria: 'The author is travelling for work, or posting from a business trip or a new city.',
    says: ['I went somewhere for work. Airport lounge included.'],
  },
  hustle: {
    group: 'status',
    criteria: 'Boasts about working long hours, early mornings or giving up rest.',
    says: ['I work very hard. Sleep is for the weak, apparently.'],
  },

  // ---------- left alone ----------
  substantive: {
    group: 'keep',
    criteria: 'Shares specific news, data, a technical explanation, research, a genuine question, or other real information that a one-line summary would lose.',
    says: ['This one actually has real content in it.', 'Genuine information ahead. No fluff detected.'],
  },
  personal_life: {
    group: 'keep',
    criteria: 'About the author’s personal life: family, health, relationships, grief or a hardship.',
    says: ['This is personal life news.', 'A real update from a real life, no pitch attached.'],
  },
};

// More specific sentences, tried in order before the plain ones. Each {slot} is filled
// with words copied from the post itself (or, for {topic}, from the fixed list below),
// and only when Jev is sure which of the candidates is the right one.
export const SPECIFIC = {
  new_job: ['I got a new job as {role} at {joining}. Cue the confetti.', 'I got a new job at {joining}. New badge, who dis?', 'I got a new job as {role}. Fancy.'],
  internship: ['I got an internship at {joining}. Send coffee.'],
  promotion: ['I got promoted to {role} at {employer}. Same desk, fancier title.', 'I got promoted to {role}. Look at me go.', 'I got promoted at {employer}. Look at me go.'],
  career_change: ['I work as {role} now. Bold move.'],
  work_anniversary: ["I've worked at {employer} for {years}. Somehow.", 'I still work at {employer}. Send cake.', "I've worked here for {years}. Send cake."],
  leaving_job: ['I left {employer}. It was time.'],
  laid_off: ['I was laid off from {employer}. Not me, the market.'],
  retirement: ['I retired from {employer}. Finally.'],
  hiring: ["We're hiring at {employer}. Apply within."],
  team_welcome: ['{person} joined our team. Welcome, brave soul.'],
  product_launch: ['We launched {product}. It mostly works.'],
  feature_update: ['We updated {product}. Buttons moved.'],
  fundraising: ['We raised {amount}. Runway: a mystery.'],
  partnership: ["We're working with {partner}. Logos, side by side."],
  customer_win: ['{partner} is our new customer. One down, infinity to go.'],
  event_recap: ['I went to {event}. There were name tags.'],
  speaking: ["I'm speaking at {event}. Slides not final."],
  event_promo: ['Please come to {event}. There will be snacks.'],
  award: ['I won an award: {award}. There was a trophy.'],
  opinion: ['I have an opinion about {topic}. Buckle up.'],
  prediction: ['I have a prediction about {topic}. Bold, unverifiable.'],
  news_reaction: ['Something happened in {topic}, and I absolutely have thoughts.'],
  generic_advice: ["Here's some advice about {topic}. You've heard it."],
  lessons_learned: ['I learned some lessons about {topic}. The hard way.'],
  parable: ["Here's a suspiciously tidy moral about {topic}."],
  congratulations: ['Congratulations, {person}. Well deserved, probably.'],
  shoutout: ['{person} is great. Tag yourself.'],
  met_someone: ['I met {person}. There is a selfie.'],
  selling: ['Please buy {product}. Link in a comment.'],
};

// Closed list for {topic}. Written as they read inside a sentence.
export const TOPICS = [
  'AI', 'remote work', 'hiring', 'leadership', 'management', 'startups', 'fundraising', 'sales', 'marketing',
  'product management', 'design', 'software engineering', 'careers', 'job hunting', 'productivity',
  'work-life balance', 'company culture', 'personal branding', 'LinkedIn', 'the economy', 'investing',
  'education', 'customer service', 'entrepreneurship', 'burnout', 'networking', 'negotiation', 'failure',
];

// Nouls asked alongside the main purpose. When one is clearly yes, its sentence is
// added after the main one, unless the main purpose already says the same thing.
export const EXTRAS = {
  humblebrag: {
    instructions: 'Is `post` showing off the author’s own success, money, status or popularity while presenting it as modesty, gratitude, luck or a lesson?',
    criteria: {
      true: 'The post draws attention to how impressive the author is, dressed up as humility, thanks or advice.',
      false: 'The post does not show off the author, or states an achievement plainly without the false modesty.',
    },
    says: "I'd like you to be impressed. Casually.",
    sameAsGroup: 'status',
  },
  selling: {
    instructions: 'Does `post` promote something for readers to buy, sign up for, download or book, such as a course, newsletter, product, service, template or call?',
    criteria: {
      true: 'There is a pitch: a link, a price, a sign-up, a "DM me" offer, or an invitation to book or buy.',
      false: 'Nothing is offered for readers to buy, sign up for or book.',
    },
    says: 'Also, please buy my thing.',
    sameAsGroup: 'asks',
  },
  asks_engagement: {
    instructions: 'Does `post` explicitly ask readers to like, comment, repost, share, follow, vote, tag someone, or reply with a word?',
    criteria: {
      true: 'An explicit call to engage, including closing lines like "Agree?", "Thoughts?", "Comment YES" or "Repost to help your network".',
      false: 'No request for readers to engage with the post.',
    },
    says: 'Also, please like, comment and share.',
    sameAs: ['engagement_bait', 'poll', 'lead_magnet'],
  },
};

// Asked with every post. Posts about grief, illness or hardship are never translated.
export const SENSITIVE = {
  instructions: 'Is `post` about death, grief, serious illness, mental health, or another serious personal hardship?',
  criteria: {
    true: 'The post is mainly about a death, a loss, an illness, a mental health struggle or a similar hardship.',
    false: 'The post is not about any of these, or only mentions one in passing.',
  },
};

// Added in front when LinkedIn labels the post as promoted. Code spots the label; Jev isn't asked.
export const PROMOTED = 'This is an ad. Please clap for capitalism.';

// Used when Jev's answer can't be read at all, so even that post still gets a line.
export const CATCH_ALL = 'This post is already one sentence. We\'ll allow it.';

export const NONE = 'none_of_these';
