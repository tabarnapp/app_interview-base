tmux new-session -d -n "app_interview-base"
tmux new-window -n "adminApp"
tmux new-window -n "themeApp"

tmux send-keys -t "adminApp" "cd adminApp && npm start" C-m
tmux send-keys -t "themeApp" "cd themeApp && webpack-cli --watch" C-m
tmux attach-session -d