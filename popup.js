const body = document.getElementById('body');
const toggle = document.getElementById('enabled');
const toggleLabel = document.getElementById('switch-label');
const saved = document.getElementById('saved');

const send = (message) => chrome.runtime.sendMessage(message);
const fmt = (n) => n.toLocaleString('en-GB');

// Friendly names for the internal group ids, for the "what you've been spared" bars.
const GROUP_LABELS = {
  job_news: 'Job news',
  leaving: 'Leaving a job',
  job_search: 'Job hunting',
  recognition: 'Recognition',
  company: 'Company news',
  event: 'Events',
  takes: 'Hot takes',
  advice: 'Advice',
  stories: 'Stories',
  thanks: 'Thank-yous',
  asks: 'Asks & ads',
  status: 'Humblebrags',
  keep: 'Real content',
};

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function chip(count, label) {
  const node = el('span', 'chip');
  node.append(el('strong', null, fmt(count)), ` ${label}`);
  return node;
}

function settingsButton(label) {
  const button = el('button', 'button button-primary', label);
  button.type = 'button';
  button.addEventListener('click', () => chrome.runtime.openOptionsPage());
  return button;
}

// A words-cut count turned into a rough reading-time estimate, at ~200 words a minute.
function timeSaved(words) {
  const minutes = words / 200;
  if (minutes < 1) return 'a moment';
  if (minutes < 60) return `${Math.round(minutes)} min`;
  return `${(minutes / 60).toFixed(minutes < 600 ? 1 : 0)} hr`;
}

// A slim bar showing the translated/left-as-written split. Animated in on a frame so
// the width transition actually plays instead of starting already at its target.
function meter(translated, total) {
  const pct = total ? Math.round((translated / total) * 100) : 0;
  const wrap = el('div', 'meter');
  const label = el('div', 'meter-label');
  label.append(el('span', null, `${pct}% translated`), el('span', null, `${100 - pct}% kept`));
  const fill = el('div', 'meter-fill');
  const track = el('div', 'meter-track', null);
  track.append(fill);
  wrap.append(label, track);
  requestAnimationFrame(() => requestAnimationFrame(() => (fill.style.width = `${pct}%`)));
  return wrap;
}

// The three kinds of post cut most often, each as a mini bar scaled to the busiest one.
function barList(groups) {
  const top = Object.entries(groups || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  if (!top.length) return null;
  const max = top[0][1];
  const wrap = el('div', 'bars');
  wrap.append(el('p', 'bars-title', "What you've been spared"));
  for (const [group, count] of top) {
    const fill = el('div', 'bar-fill');
    const track = el('div', 'bar-track');
    track.append(fill);
    const row = el('div', 'bar-row');
    row.append(el('span', 'bar-name', GROUP_LABELS[group] || group), track, el('span', 'bar-count num', fmt(count)));
    wrap.append(row);
    requestAnimationFrame(() => requestAnimationFrame(() => (fill.style.width = `${Math.max(6, Math.round((count / max) * 100))}%`)));
  }
  return wrap;
}

function render(status) {
  toggle.checked = status.enabled;
  toggleLabel.textContent = status.enabled ? 'On' : 'Paused';
  document.body.classList.toggle('paused', !status.enabled);
  saved.textContent = status.saved ? `${fmt(status.saved)} ${status.saved === 1 ? 'result' : 'results'} saved` : '';
  body.replaceChildren();

  if (!status.hasKey) {
    body.append(
      el('p', 'notice', 'Add your TypeSafe key to start.'),
      el('p', 'line', 'Jev reads each long post and says what it means. You pay TypeSafe directly for that, with your own key.'),
      settingsButton('Add key'),
    );
    return;
  }

  if (status.keyState && status.keyState.status === 401) {
    body.append(
      el('p', 'notice', 'TypeSafe rejected your key.'),
      el('p', 'line', 'Posts are showing as written until you save a working one.'),
      settingsButton('Fix key'),
    );
    return;
  }

  const { posts, wordsCut, leftAlone, ads, groups } = status.stats;
  if (!posts && !leftAlone) {
    body.append(
      el('p', 'notice', 'Nothing cut yet.'),
      el('p', 'line', 'Scroll your LinkedIn feed and long posts will fold into one plain sentence.'),
    );
    return;
  }

  const hero = el('div', 'hero');
  hero.append(el('span', 'hero-emoji', '\u{1F4A9}'));
  const total = el('p', 'total num');
  total.append(fmt(wordsCut), ' ', el('small', null, wordsCut === 1 ? 'word cut' : 'words cut'));
  hero.append(total);
  body.append(hero);
  body.append(el('p', 'line num', `From ${fmt(posts)} ${posts === 1 ? 'post' : 'posts'}. \u2248 ${timeSaved(wordsCut)} of scrolling saved.`));

  if (posts + leftAlone) body.append(meter(posts, posts + leftAlone));
  const bars = barList(groups);
  if (bars) body.append(bars);
  if (ads) body.append(el('span', 'badge', `\u{1F6A9} ${fmt(ads)} ${ads === 1 ? 'ad' : 'ads'} called out`));
  if (leftAlone) body.append(el('p', 'line', `${fmt(leftAlone)} left as written: grief, illness or hardship, or Jev couldn't be reached.`));
  if (!status.enabled) body.append(el('p', 'line', 'Paused. Posts show as written until you turn it back on.'));
}

document.getElementById('settings').addEventListener('click', (event) => {
  event.preventDefault();
  chrome.runtime.openOptionsPage();
});

toggle.addEventListener('change', async () => {
  render(await send({ type: 'setSettings', patch: { enabled: toggle.checked } }));
  pageLine();
});

// What the content script saw on the current tab. Only LinkedIn tabs answer.
async function pageLine() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;
    const stats = await chrome.tabs.sendMessage(tab.id, { type: 'pageStats' });
    if (!stats) return;
    if (!stats.found) {
      body.append(el('p', 'chips-head', "No posts found on this page. If you're on your feed, LinkedIn has probably changed its layout."));
      return;
    }
    const c = stats.counts;
    const n = (...states) => states.reduce((sum, s) => sum + (c[s] || 0), 0);
    const parts = [
      [n('stamped', 'ready', 'restored'), 'Translated'],
      [n('kept'), 'Left as written'],
      [n('short'), 'Too short'],
      [n('waiting', 'asking', 'expanding', 'new'), 'Not read yet'],
      [n('skipped'), 'Waiting for a key'],
    ].filter(([count]) => count);
    body.append(el('p', 'chips-head', `This page: ${fmt(stats.found)} ${stats.found === 1 ? 'post' : 'posts'} found`));
    const row = el('div', 'chips');
    for (const [count, label] of parts) row.append(chip(count, label));
    body.append(row);
  } catch {
    // Not a LinkedIn tab, or the page was open before the extension was loaded.
  }
}

render(await send({ type: 'status' }));
pageLine();
