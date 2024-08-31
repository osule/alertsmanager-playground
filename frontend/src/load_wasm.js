// @ts-nocheck
/* eslint-disable */
// Copyright 2018 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
"use strict";
(async function loadWasm() {
  const go = new Go();
  try {
    const response = await fetch(
      "/alertsmanager-template-playground/main.wasm"
    );
    const { instance } = await WebAssembly.instantiateStreaming(
      response,
      go.importObject
    );
    await go.run(instance);
    console.log("done");
  } catch (err) {
    console.error("Failed to load WebAssembly module:", err);
  }
})();
