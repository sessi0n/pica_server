protoc.exe --js_out="import_style=commonjs,binary:./src/" --ts_out="./src/" ./enum/error.proto
protoc.exe --js_out="import_style=commonjs,binary:./src/" --ts_out="./src/" ./enum/login_type.proto
protoc.exe --js_out="import_style=commonjs,binary:./src/" --ts_out="./src/" ./enum/platform.proto

protoc.exe --js_out="import_style=commonjs,binary:./src/" --ts_out="./src/" packet_def.proto
protoc.exe --js_out="import_style=commonjs,binary:./src/" --ts_out="./src/" packet.proto