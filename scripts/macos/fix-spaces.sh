#!/bin/zsh
# Fix dual-screen Spaces bug: blank areas, black Mission Control thumbnails,
# 3-finger swipe going to the wrong app.
# Cause: full-screen Spaces made while spans-displays=1 keep the old size/order.
# Run in Terminal, then log out and log in.
# Undo: defaults import com.apple.spaces ~/Desktop/spaces-backup.plist && killall Dock

set -u

echo "1/5 Backup Spaces layout to ~/Desktop/spaces-backup.plist"
defaults export com.apple.spaces ~/Desktop/spaces-backup.plist

echo "2/5 Take every app out of full screen (allow Terminal to control System Events if asked)"
osascript <<'OSA'
tell application "System Events"
  repeat with p in (every application process whose background only is false)
    try
      repeat with w in (every window of p)
        try
          if value of attribute "AXFullScreen" of w is true then
            set value of attribute "AXFullScreen" of w to false
            delay 1
          end if
        end try
      end repeat
    end try
  end repeat
end tell
OSA

echo "3/5 Stop automatic Space re-ordering"
defaults write com.apple.dock mru-spaces -bool false

echo "4/5 Keep earlier fixes"
defaults write com.apple.spaces spans-displays -bool false
defaults write com.apple.dock enterMissionControlByTopWindowDrag -bool false

echo "5/5 Restart Dock"
killall Dock

echo
echo "Check values (all must be 0):"
echo "  spans-displays:            $(defaults read com.apple.spaces spans-displays)"
echo "  mru-spaces:                $(defaults read com.apple.dock mru-spaces)"
echo "  top-drag Mission Control:  $(defaults read com.apple.dock enterMissionControlByTopWindowDrag)"
echo
echo "DONE. Log out and log in again, then test 3-finger swipe."
echo "If still wrong: defaults delete com.apple.spaces && killall Dock, then log out/in."
