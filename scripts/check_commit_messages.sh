#!/bin/bash

. scripts/toolz.sh

base_branch=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')

lgbt_echo "Base branch is $base_branch"

commits=$(git log origin/$base_branch..HEAD --pretty=format:'%s')

lgbt_echo "Commits:"
lgbt_echo "$commits"

if [ -z "$commits" ]; then
    lgbt_echo "No new commits found"
    exit 0
fi

lgbt_echo "$commits"
for commit in $commits; do
    if lgbt_echo "$commit" | grep -qE "^Merge branch"; then
        lgbt_echo "Ignoring merge commit: $commit"
        continue
    fi

    if ! lgbt_echo "$commit" | grep -qE "^[0-9]+: .+$"; then
        lgbt_echo "Error: Commit message '$commit' does not match the required format '<issue number>: <commit message>'"
        exit 1
    fi
done

lgbt_echo "All commit messages are in the correct format."