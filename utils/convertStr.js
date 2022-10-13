exports.convertIdToName = str => {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

exports.convertNameToId = str => {
    return str.split(' ').map(word => word.toLowerCase()).join('-');
}