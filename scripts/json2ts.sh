#!/bin/bash

# Directories with source JSON schemas and output TypeScript files
schema_directory='spec/messages/v3/'
ts_output_directory='web/components/schema'

# Function for generating TypeScript files from JSON schemas
generateType() {
    local schema_file=$1
    local output_file=$2
    echo "Generating ${output_file} from specification at ${schema_file}"
    NODE_OPTIONS="--no-deprecation" web/node_modules/.bin/quicktype -s schema "$schema_file" -o "$output_file"
}

# Basic function for receiving and processing JSON schemas
getTypes() {
    rm -rf "$ts_output_directory"
    mkdir -p "$ts_output_directory"

    find "$schema_directory" -name "*.json" | while read -r schema_file; do
        local output_file="${ts_output_directory}/$(basename -- "${schema_file%.json}.ts")"
        generateType "$schema_file" "$output_file" &
    done
    wait
}

# Go to the root directory of the project to generate TypeScript from schemas
cd "$(dirname "$0")/../"
echo "Generating TypeScript from Buttplug.io and NoButt specifications"

getTypes
# in my zsh terminal background jobs somehow corrupt the terminal behavior and simple `wait` doesn't work
# if someone knows how to fix this, please let me know :3
sleep 3
