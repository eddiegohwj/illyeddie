#!/bin/zsh
# Restore drag-to-top Mission Control (safe now that spans-displays=0) and
# make Mission Control / Space switching react fast.
# Undo: defaults delete com.apple.dock expose-animation-duration;
#       defaults delete com.apple.dock workspaces-edge-delay; killall Dock

set -u

if [[ "$(defaults read com.apple.spaces spans-displays 2>/dev/null)" != "0" ]]; then
  echo "STOP: spans-displays is not 0. Run fix-spaces.sh first."; exit 1
fi

echo "1/3 Drag a window to the top edge opens Mission Control again"
defaults write com.apple.dock enterMissionControlByTopWindowDrag -bool true

echo "2/3 Mission Control animation 0.1 s"
defaults write com.apple.dock expose-animation-duration -float 0.1

echo "3/3 Drag-to-screen-edge Space switch delay 0.1 s"
defaults write com.apple.dock workspaces-edge-delay -float 0.1

killall Dock
echo "DONE. No log out needed. Test: drag a window to the top edge."
