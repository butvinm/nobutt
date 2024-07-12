#!/bin/bash

lgbt_echo() {
    local message="$1"
    local colors=(
        "\033[0;31m" # RED
        "\033[0;33m" # ORANGE
        "\033[0;93m" # YELLOW
        "\033[0;32m" # GREEN
        "\033[0;34m" # BLUE
        "\033[0;35m" # PURPLE
    )
    local NORMAL="\033[0m"
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

# :3
