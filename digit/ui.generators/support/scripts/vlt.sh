#!/bin/bash

WORKING_DIR=$(pwd)
VALID_COMMANDS=("add" "checkout" "checkout:force" "commit" "update")

SYNC_DIR=./sync

AEM_HOST=localhost
AEM_PORT=4502
AEM_SCHEME=http
AEM_USER=admin
AEM_PASS=admin

containsElement() {
  local e match="$1"
  shift
  for e; do [[ "$e" == "$match" ]] && return 0; done
  return 1
}

showHelp() {
cat << EOF
Usage: yarn vlt:[command] [options]
Use VLT to sync and commit changes from and to your AEM instance.

  -d      The folder path to where synced files will stored             (default: ./sync)
  -H      Set the hostname/IP address for your AEM instance             (default: localhost)
  -p      Set the port for your AEM instance                            (default: 4502)
  -s      Set the URL scheme for your AEM instance                      (default: http)
  -U      Set the username to authenticate with your AEM instance       (default: admin)
  -P      Set the password to authenticate with your AEM instance       (default: admin)
EOF
}

parseOptions() {
  while getopts ":hd:H:p:s:U:P:" options; do
    case "${options}" in
      h)
        showHelp
        exit 0
        ;;
      d)
        export SYNC_DIR=${OPTARG}
        ;;
      H)
        export AEM_HOST=${OPTARG}
        ;;
      p)
        export AEM_PORT=${OPTARG}
        ;;
      s)
        export AEM_SCHEME=${OPTARG}
        ;;
      U)
        export AEM_USER=${OPTARG}
        ;;
      P)
        export AEM_PASS=${OPTARG}
        ;;
      :)
        showHelp
        exit 1
        ;;
      \?)
        echo "Invalid option: -$OPTARG" 1>&2
        exit 1
      ;;
    esac
  done
}

main() {
  # Before anything else, ensure that we have VLT installed
  if ! command -v vlt &> /dev/null; then
    echo "VLT is required in order to sync your AEM filesystem. Please follow the instructions in the readme."
    exit 1
  fi

  while getopts ":h" options; do
    case "${options}" in
      h)
        showHelp
        exit 0
        ;;
      \?)
        echo "Invalid option: -$OPTARG" 1>&2
        exit 1
      ;;
    esac
  done
  shift $((OPTIND -1))

  subcommand=$1; shift

  containsElement $subcommand "${VALID_COMMANDS[@]}"
  if [[ $? == 0 ]]; then
    parseOptions "$@"

    # Checkout and forced checkout
    if [[ $subcommand == "checkout" ]]; then
      eval "vlt --credentials '$AEM_USER:$AEM_PASS' co --filter sync-filters.xml $AEM_SCHEME://$AEM_HOST:$AEM_PORT/crx/-/jcr:root $SYNC_DIR"
    fi

    if [[ $subcommand == "checkout:force" ]]; then
      eval "vlt --credentials '$AEM_USER:$AEM_PASS' co --force --filter sync-filters.xml $AEM_SCHEME://$AEM_HOST:$AEM_PORT/crx/-/jcr:root $SYNC_DIR"
    fi

    # Add, commit, update
    if [[ $subcommand == "add" || $subcommand == "commit" || $subcommand == "update" ]]; then
      echo "Changing directory to: $SYNC_DIR/jcr_root"
      cd "$SYNC_DIR/jcr_root"

      # Add
      if [[ $subcommand == "add" ]]; then
        eval "vlt add $1"
      fi

      # Commit
      if [[ $subcommand == "commit" ]]; then
        eval "vlt --credentials '$AEM_USER:$AEM_PASS' ci"
      fi

      # Update
      if [[ $subcommand == "update" ]]; then
        eval "vlt --credentials '$AEM_USER:$AEM_PASS' up"
      fi

      echo "Changing back to the working directory: $WORKING_DIR"
      cd "$WORKING_DIR"
    fi
  else
    echo "Invalid command provided, please use one of the following: ${VALID_COMMANDS[@]}"
  fi
}

[[ $BASH_SOURCE != "$0" ]] || main "$@"
