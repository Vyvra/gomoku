#!/bin/bash
SESSION_NAME="Gomaku"

# Create a new tmux session
tmux new-session -d -s $SESSION_NAME

# Create the first window (index 0) and run a command
tmux rename-window -t $SESSION_NAME:0 'Editor'
tmux send-keys -t $SESSION_NAME:0 'nvim .' C-m

# Create the second window and split it into panes
tmux new-window -t $SESSION_NAME:1 -n 'Server'
tmux send-keys -t $SESSION_NAME:1 'npm run dev' C-m

# Create a third window
tmux new-window -t $SESSION_NAME:2 -n 'CLI'
tmux send-keys -t $SESSION_NAME:2 '' C-m

# Switch back to the first window
tmux select-window -t $SESSION_NAME:0

# Attach to the session
tmux attach-session -t $SESSION_NAME
