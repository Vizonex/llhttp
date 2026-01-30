#!/usr/bin/env -S node --import tsx

import { copyFileSync, readFileSync, mkdirSync, writeFileSync } from "fs";

mkdirSync("release/src", { recursive: true });
mkdirSync("release/include", { recursive: true });

// per Makefile release:
copyFileSync("build/llhttp.h", "release/include/llhttp.h");
copyFileSync("build/c/llhttp.c", "release/src/llhttp.c");
copyFileSync("src/native/api.c", "release/src/api.c");
copyFileSync("src/native/api.h", "release/src/http.h");
copyFileSync("src/native/http.c", "release/src/http.c");
copyFileSync("src/llhttp.gyp", "release/llhttp.gyp");
copyFileSync("src/common.gypi", "release/common.gypi");
copyFileSync("libllhttp.pc.in", "release/libllhttp.pc.in");
copyFileSync("README.md", "release/README.md");

// release/CMakeLists.txt
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const cmake = readFileSync("CMakeLists.txt", "utf8");
const out = cmake.replace(/_RELEASE_/, pkg["version"]);
writeFileSync("release/CMakeLists.txt", out);
