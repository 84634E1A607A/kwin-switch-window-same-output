# Switch Window Same Output

A small KWin script for switching to the next window above or below the active
window in the stacking order, limited to the same monitor/output.

## Shortcuts

- `Meta+Alt+Shift+Down`: switch to the window below the active window
- `Meta+Alt+Shift+Up`: switch to the window above the active window

The script ignores minimized windows, docks, desktop windows, splash screens,
notifications, and windows outside the current desktop or activity.

## Install

From this directory:

```sh
kpackagetool6 --type KWin/Script --install .
```

Then enable the script in System Settings:

```text
Window Management > KWin Scripts
```

If you are on Plasma 5, use `kpackagetool5` instead of `kpackagetool6`.

## Update

```sh
kpackagetool6 --type KWin/Script --upgrade .
```
