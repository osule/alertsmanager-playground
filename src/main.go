package main

import (
	"fmt"
	"syscall/js"
)

func jsonWrapper() js.Func {
        jsonFunc := js.FuncOf(func(this js.Value, args []js.Value) any {
                if len(args) != 1 {
                        return "Invalid no of arguments passed"
                }
                inputName := args[0].String()
                fmt.Printf("input %s\n", inputName)
                greeting, err := printName(inputName)
                if err != nil {
                        fmt.Printf("unable to convert to json %s\n", err)
                        return err.Error()
                }
                return greeting
        })
        return jsonFunc
}

func printName(name string) (string, error) {
	if name == "" {
		name = "world"
	}
    return fmt.Sprintf("Hello %s\n", name ), nil
} 


func main() {
	js.Global().Set("printName", jsonWrapper())
	<-make(chan struct{})
}