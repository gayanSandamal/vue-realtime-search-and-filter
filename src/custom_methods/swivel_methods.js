// escape curly braces which affects to filter
export function characterEscaper(string) {
    return string.replace(/\(/g, '{').replace(/\)/g, '}')
}
export function characterEscaperDecoder(string) {
    return string.replace(/{\{/g, '(').replace(/\}/g, ')')
}
export function additionalFilters(list, check_list) {
    if (check_list.length > 0) {
        let temp = []
        temp.push(list.filter(o => {
            let output = null
            let key_states = []
            check_list.map(p => {
                key_states.push(o[p])
            })
            let is_not_matching = key_states.indexOf(false)
            if (is_not_matching > -1) {
                output = null
            } else {
                output = o
            }
            return output
        }))
        list = temp[0]
    }
    return list
}
export function keyNormalizer(string) {
    return string.replace(/_/g, ' ').replace(/^./, string[0].toUpperCase())
}

export function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}