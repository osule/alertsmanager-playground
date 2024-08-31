# Alertsmanager template playground

A visual playground for testing out templates for [Prometheus Alert Manager](https://github.com/prometheus/alertmanager).


## How to run the project locally

### Prerequisites
1. Go compiler for compiling the go program to a webassembly module.
1. NodeJS for running the ReactJS application.


### Build the WASM module

    cd src
    GOOS=js GOARCH=wasm go build -o ../assets/main.wasm

### Serve

    npx serve -l 9090 assets
