# Px2rem

Px2rem is a extension for Brackets.

## Setting

The root size is `10px`, set root size <kbd>Ctrl+:</kbd>.

## Using

When the cursor is on the value, press <kbd>Shift+Tab</kbd>.

## Custom

If you don't like the shortcut, you can reset it.
Debug -> Open Your Key Map -> Add your convert key in `overrides`, such as:
```json
{
    "overrides": {
        "<key>": "me.convert.pxrem"
    }
}
```
That's my keymap.json:
```json
{
    "overrides": {
		"`": "me.convert.pxrem"
    }
}
```