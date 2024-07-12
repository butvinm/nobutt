#!/bin/bash

# fix ascii colors in GitHub Actions
if [ "${TERM:-}" = "" ]; then
  echo "Setting TERM to dumb" # makes tput happy
  TERM="dumb"
fi

lgbt_echo() {
    local message="$1"
    local colors=(
        "$(tput setaf 1)" # RED
        "$(tput setaf 3)" # ORANGE
        "$(tput setaf 11)" # YELLOW
        "$(tput setaf 2)" # GREEN
        "$(tput setaf 4)" # BLUE
        "$(tput setaf 5)" # PURPLE
    )
    local NORMAL=$(tput sgr0)
    local colorized_message=""
    local length=${#message}

    for (( i=0; i<$length; i++ )); do
        local char="${message:i:1}"
        local color="${colors[$((i % ${#colors[@]}))]}"
        colorized_message+="${color}${char}"
    done

    colorized_message+="${NORMAL}"
    echo -e "$colorized_message"
}

# if called directly, execute function
if [ "${BASH_SOURCE[0]}" == "${0}" ]; then
    "$@"
fi
