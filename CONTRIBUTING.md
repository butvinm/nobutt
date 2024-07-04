# Contributing to NoButt

## Setup Development Environment

1. Clone the repository:
    ```bash
    git clone https://github.com/butvinm/nobutt.git
    cd nobutt
    ```

2. Install prerequisites:
    * Python 3.12
    * Poetry (see [installation instructions](https://python-poetry.org/docs/#installation))
    * Npm (for building the web UI)

    Make sure you have the correct versions of the prerequisites installed:
    ```bash
    make check_prerequisites
    ```

3. Install dependencies and generate models from the protocol spec:
    ```bash
    make install
    make generate
    ```
