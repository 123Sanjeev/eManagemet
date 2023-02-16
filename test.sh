echo dir
for files in *
do
    if [[-f "$files" ]];then
        echo "$files";
    fi

done