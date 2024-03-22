# brainCodeCamp

## Build Instructions

    # using python >=3.10
    pip install jupyter-book
    jupyter-book clean .
    jupyter-book build .


## Build Instructions Poetry

    # install poetry https://python-poetry.org/docs/
    poetry install
    poetry run jupyter-book clean .
    poetry run jupyter-book build .