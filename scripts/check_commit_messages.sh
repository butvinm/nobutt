#!/bin/bash

# Get base branch
base_branch=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')

echo "Base branch is $base_branch"

# Get the commit list
commits=$(git log origin/$base_branch..HEAD --pretty=format:'%s')

echo "Commits: $commits"

# Check if there are any commits
if [ -z "$commits" ]; then
echo "No new commits found"
exit 0
fi

# Check every commit
echo "$commits" | while read commit; do
if echo "$commit" | grep -qE "^Merge branch"; then
    echo "Ignoring merge commit: $commit"
    continue
fi

if ! echo "$commit" | grep -qE "^[0-9]+: .+$"; then
    echo "Error: Commit message '$commit' does not match the required format '<issue number>: <commit message>'"
    exit 1
fi
done

echo "All commit messages are in the correct format."
