function sameDesktop(w) {
    if (w.onAllDesktops || w.desktops.length === 0) {
        return true;
    }

    for (let i = 0; i < w.desktops.length; i++) {
        if (w.desktops[i] === workspace.currentDesktop) {
            return true;
        }
    }

    return false;
}

function sameActivity(w) {
    if (w.activities.length === 0) {
        return true;
    }

    for (let i = 0; i < w.activities.length; i++) {
        if (w.activities[i] === workspace.currentActivity) {
            return true;
        }
    }

    return false;
}

function usableWindow(w) {
    return w &&
        !w.deleted &&
        !w.minimized &&
        !w.skipSwitcher &&
        !w.desktopWindow &&
        !w.dock &&
        !w.splash &&
        !w.notification &&
        !w.onScreenDisplay &&
        sameDesktop(w) &&
        sameActivity(w) &&
        (w.normalWindow || w.dialog || w.utility);
}

function sameOutput(a, b) {
    return a.output &&
        b.output &&
        a.output.name === b.output.name;
}

/*
  KWin stackingOrder is back -> front:
  lower Z-order windows have smaller indexes;
  higher Z-order windows have larger indexes.
*/
function switchStackSameOutput(direction) {
    const active = workspace.activeWindow;

    if (!usableWindow(active)) {
        return;
    }

    const stack = workspace.stackingOrder;
    const candidates = [];

    for (let i = 0; i < stack.length; i++) {
        const w = stack[i];

        if (!usableWindow(w)) {
            continue;
        }

        if (!sameOutput(active, w)) {
            continue;
        }

        candidates.push(w);
    }

    let activeIndex = -1;

    for (let i = 0; i < candidates.length; i++) {
        if (candidates[i] === active) {
            activeIndex = i;
            break;
        }
    }

    if (activeIndex < 0) {
        return;
    }

    let targetIndex = -1;

    if (direction === "down") {
        targetIndex = activeIndex - 1;
    } else if (direction === "up") {
        targetIndex = activeIndex + 1;
    }

    /*
      No wraparound:
      - If active is already bottommost, Down does nothing.
      - If active is already topmost, Up does nothing.
    */
    if (targetIndex < 0 || targetIndex >= candidates.length) {
        return;
    }

    const target = candidates[targetIndex];

    if (target && target !== active) {
        workspace.activeWindow = target;
    }
}

registerShortcut(
    "Switch to Window Below Same Output",
    "Switch to Window Below Same Output",
    "Meta+Alt+Shift+Down",
    function () {
        switchStackSameOutput("down");
    }
);

registerShortcut(
    "Switch to Window Above Same Output",
    "Switch to Window Above Same Output",
    "Meta+Alt+Shift+Up",
    function () {
        switchStackSameOutput("up");
    }
);
