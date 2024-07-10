#!/bin/bash

# Directories with source JSON schemas and output TypeScript files
schema_directory='spec/messages/v3/'
ts_output_directory='web/components/schema'

# Function for adding a license to the beginning of the file
addLicensing() {
    local file=$1
    { cat license.txt; echo ; cat "$file"; } > "$file.tmp" && mv "$file.tmp" "$file"
}

# Function for generating TypeScript files from JSON schemas
generateType() {
    local schema_file=$1
    local output_file=$2
    echo "Generating ${output_file} from specification at ${schema_file}"
    ./node_modules/.bin/quicktype -s schema "$schema_file" -o "$output_file"  > /dev/null 2>&1

    if [ -s "$output_file" ]; then
        addLicensing "$output_file"
    else
        rm -f "$output_file"
    fi
}

# Basic function for receiving and processing JSON schemas
getTypes() {
    rm -rf "$ts_output_directory"
    mkdir -p "$ts_output_directory"

    find "$schema_directory" -name "*.json" | while read -r schema_file; do
        local output_file="${ts_output_directory}/$(basename -- "${schema_file%.json}.ts")"
        generateType "$schema_file" "$output_file" &
        ((++jobcount % 30 == 0)) && wait
    done

    wait
}

# Go to the root directory of the project to generate TypeScript from schemas
cd "$(dirname "$0")/../"
echo "Generating TypeScript from Buttplug.io and NoButt specifications"
getTypes