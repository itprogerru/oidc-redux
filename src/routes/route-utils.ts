const getLocation = (href: string) => {
    const match = href.match(/^(http?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/g);
    return (
        match && {
            href,
            protocol: match[1],
            host: match[2],
            hostname: match[3],
            port: match[4],
            path: match[5],
            search: match[6],
            hash: match[7],
        }
    );
};

export const getPath = (href: string) => {
    const location = getLocation(href);
    if (location) {
        let {path} = location;
        const {search, hash} = location;

        if (search) {
            path += search;
        }

        if (hash) {
            path += hash;
        }

        return path;
    }
    return '';
};
