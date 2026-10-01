# Cut the Crap

A Chrome extension for LinkedIn. It finds long posts as you scroll, asks an AI model
(Jev, by TypeSafe) what the post is actually saying, and writes that one plain
sentence over it in red pen — striking through the original, not deleting it. Click
"Show original" on any post to read it as written.

Posts about grief, illness or a genuine hardship are always left untouched. Every
other post gets a line, even when the model is only guessing.

## How it works

- `content.js` runs on `linkedin.com`, finds posts near the viewport, and reads their
  text (including pressing LinkedIn's own "… more" button when a post is truncated).
- The post text is sent to the background service worker (`background.js`), which is
  the only part of the extension that ever sees your API key.
- The background worker asks TypeSafe's Jev model what kind of post it is, then
  `lib/translate.js` turns that answer into one of the fixed, fairly blunt sentences
  defined in `lib/intents.js`.
- The result is drawn back onto the page over the original post. Nothing on the page
  resizes or moves; the header (photo, name, headline) and the action buttons are
  left alone.
- Judgments are cached locally (by a fingerprint of the post text, not the text
  itself) so scrolling past the same post again is instant and free.

## What leaves your browser

The text of each long post you scroll past is sent to TypeSafe's API
(`api.typesafe.ai`) along with your API key. Nothing else is sent: not the author's
name, images, links, or anything else about your LinkedIn account. Your key is stored
only in your browser's local extension storage and is never synced.

## Installation (load unpacked)

This extension isn't on the Chrome Web Store, so it's installed as an unpacked
extension:

1. Clone or download this repository.
   ```
   git clone https://github.com/Shahnab/cut_the_Crap_ChromeExtension.git
   ```
2. Open `chrome://extensions` in Chrome (or any Chromium browser, e.g. Edge at
   `edge://extensions`).
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the folder containing `manifest.json`.
5. The "Cut the Crap" icon appears in your toolbar.

## Setting up your API key

1. Get an API key from [console.typesafe.ai](https://console.typesafe.ai).
2. Click the extension icon, then **Settings** (or right-click the icon and choose
   **Options**).
3. Paste your key under **TypeSafe API key** and click **Save and test**.
4. Open LinkedIn and scroll your feed — long posts will start getting crossed out.

## Settings

- **How sure Jev has to be** — how confident the model needs to be before it names
  the exact kind of post; otherwise a more generic line is used.
- **Shortest post to translate** — posts shorter than this word count are left alone.
- **Feed** — optionally have the extension press LinkedIn's "Load more" button for
  you as you scroll.
- **Forget saved results** — clears the local cache of past judgments.

## Repository layout

```
manifest.json     Extension manifest (Manifest V3)
background.js     Service worker: talks to TypeSafe, stores settings/results
content.js        Runs on linkedin.com: finds posts and draws the translation
content.css       Styles injected into linkedin.com for the stamp/mark
popup.html/js     Toolbar popup: stats and the on/off switch
options.html/js   Settings page
ui.css            Shared styling for the popup and settings page
lib/              Shared logic: intents, question-building, translation rules, text helpers
fonts/            Kalam handwriting font (SIL Open Font License, see fonts/OFL.txt)
```

## Privacy

No data is collected by this extension beyond what's described above. There is no
analytics and no third-party tracking; the only network calls are to TypeSafe's API,
made directly from your browser with your own key.
