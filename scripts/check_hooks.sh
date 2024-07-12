#!/bin/sh

. scripts/toolz.sh

if [ "$(git config --get core.hooksPath)" != ".githooks" ]; then
    lgbt_echo "Git hooks are not configured correctly."
    lgbt_echo "Please run the command: git config core.hooksPath .githooks"
    lgbt_echo "Or use Makefile with command: make githooks-setup."
    exit 1
else
    lgbt_echo "Git hooks are configured correctly."
    exit 0
fi
