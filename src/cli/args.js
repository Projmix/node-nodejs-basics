const parseArgs = () => {
    const args = process.argv.slice(2);
    let result = '';

    for (let i = 0; i < args.length; i += 2) {
        const propName = args[i].replace('--', '');
        const value = args[i + 1];
        result += `${propName} is ${value}`;
        if (i + 2 < args.length) result += ', ';
    }

    console.log(result);
};

parseArgs();