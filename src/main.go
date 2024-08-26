package main

import (
	"encoding/json"
	"fmt"

	"github.com/prometheus/alertmanager/template"

	"syscall/js"
)

func jsonWrapper() js.Func {
        jsonFunc := js.FuncOf(func(this js.Value, args []js.Value) any {
                if len(args) != 2 {
                        return "Invalid no of arguments passed"
                }
                tpl := args[0].String()
                context := args[1].String()

                fmt.Printf("tpl %s\n", tpl)
                fmt.Printf("context %s\n", context)

                result, err := render(tpl, context)
                if err != nil {
                        fmt.Printf("unable to render template %s\n", err)
                        return err.Error()
                }
                return result
        })
        return jsonFunc
}

func render(html string, context string) (string, error) {
        tpl, _ := template.New()
        var data template.Data
        contextbytes := []byte(context)
        _ = json.Unmarshal(contextbytes, &data)
        buf, _ := tpl.ExecuteHTMLString(html, data);
        return buf, nil
}


func main() {
	js.Global().Set("render", jsonWrapper())
	<-make(chan struct{})
}