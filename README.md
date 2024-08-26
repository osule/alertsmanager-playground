


## Build the WASM module

    cd src
    GOOS=js GOARCH=wasm go build -o ../assets/main.wasm

## Serve

    python -m http.server --directory assets 9090