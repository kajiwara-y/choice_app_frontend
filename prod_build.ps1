yarn run build
remove-item ..\pokemon_choice\public\* -Recurse
copy-item .\build\* ..\pokemon_choice\public\ -Recurse