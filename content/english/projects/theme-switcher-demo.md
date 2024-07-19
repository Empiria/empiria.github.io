---
title: "Theme Switcher Demo"
date: 2024-07-19T16:16:52+01:00
---
A demonstration of controlling an embedded [Anvil](https://anvil.works) web application from its parent page.

Within the embedded app below, you can select a standard anvil colour scheme from the dropdown menu and you can toggle between its light and dark variants using the button. You'll notice that the effect is applied to the embedded app only, not the parent page.

<script src="https://anvil.works/embed.js" async></script>
<iframe style="width:100%;" data-anvil-embed src="https://unselfish-pitiful-commission.anvil.app"; scrolling=no></iframe>

However, if you toggle the theme of this overall site, using the switch in the top right hand corner of this page, you'll see that the change is also applied to the embedded app!

This is achieved by using the `postMessage` API to communicate between the parent page and the embedded app.

When the app starts, it first detects whether it is embedded within an iframe using a simple function:

```python
import anvil.js


def within_iframe():
    return anvil.js.window != anvil.js.window.parent
```

If the app is within an iframe, it listens for messages from the parent page and assigns a handler for those messages. It then sends a message to the parent requesting the current theme:

```python
if within_iframe():
    anvil.js.window.addeventlistener("message", self.on_message)
    anvil.js.window.parent.postmessage({"requesttheme": true}, "*")
```

In this example, the handler for any message received from the parent page is as follows:

```python
def on_message(self, event):
    try:
        self.item = {"scheme": "Material", "variant": event.data.theme}
        switch_colour_scheme(**self.item)
    except Exception:
        return
```

You can see the full code for the embedded app at [Github](https://github.com/empiria/theme-switcher-demo) or, if you have an account with anvil, you can [clone](https://anvil.works/build#clone:ZUMPQFHHBA643IIL=7LRKNVEU53AKJHFH5I5HYFIY) a copy for yourself.
