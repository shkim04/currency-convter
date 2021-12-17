#!/bin/bash

BRANCH="master"

self_update() {
    cd $SCRIPTPATH
    git fetch

    [ -n $(git diff --name-only origin/$BRANCH) ] && {
        echo "Found a new version of me, updating myself..."
        git pull --force
        git checkout $BRANCH
        git pull --force
        echo "Running the new version..."

        # Now exit this old instance
        exit 1
    }
    echo "Already the latest version."
}
self_update
echo “some code”
