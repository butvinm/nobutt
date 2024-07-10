#!/bin/sh

yellow="\033[0;33m"
orange="\033[1;33m"
nocolor="\033[0m"

if [ "$(git config --get core.hooksPath)" != ".githooks" ]; then
    echo -e "${yellow}Git hooks are not configured correctly."
    echo -e "Please run the command: ${orange}git config core.hooksPath .githooks"
    echo -e "${yellow}Or use Makefile with command: ${orange}make githooks-setup${nocolor}"
fi
