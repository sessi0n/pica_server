protoc.exe --js_out="import_style=commonjs,binary:./src/" --ts_out="./src/" ./enum/result.proto

protoc.exe --js_out="import_style=commonjs,binary:./src/" --ts_out="./src/" packet_def.proto
protoc.exe --js_out="import_style=commonjs,binary:./src/" --ts_out="./src/" packet.proto