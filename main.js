const GreekSubs = require('greek-subs')
const signale = require('signale');
const { Signale } = signale;
const signaleConfig = {
    underlineLabel: false
}
signale.config(signaleConfig);

module.exports = (file_name, { timer }) => {

    if (timer) {
        signale.time('Execution time');
        process.on('exit', function () {
            signale.timeEnd('Execution time');
        })
    }

    const subs = new GreekSubs(file_name);
    const searchLogger = new Signale({ interactive: true, scope: 'search', config: signaleConfig });
    const downloadLogger = new Signale({ interactive: true, scope: 'download', config: signaleConfig });

    subs.on('search::start', data => {
        searchLogger.await(`Searching for: ${data.query}`)
    })

    subs.on('search::finish', data => {
        const msg = `Query "${data.query}" returned ${data.results.length} ${data.results.length === 1 ? 'result' : 'results'}`
        data.results.length > 0 && searchLogger.success({
            suffix: `@ (${data.searchModule})`,
            message: msg,
        });
        data.results.length === 0 && searchLogger.warn({
            suffix: `@ (${data.searchModule})`,
            message: msg,
        });

        data.results.length === 0 && console.log();
    })

    subs.on('search::error', data => {
        searchLogger.error(`Query "${data.query}" failed with "${data.error}"`)
    })

    subs.on('ranked_results', data => {
        console.table(
            data.map(item => ({
                url : item.url,
                text : item.text.replace(/ +/g, ' '),
                rating : item.rating
            }))
        )
        console.log()
    })

    subs.on('download::start', data => {
        downloadLogger.await(`Downloading ${data.url}`)
    })

    subs.on('download::finish', data => {
        downloadLogger.success('Download complete')
    })

    subs.on('download::error', data => {
        downloadLogger.error(`Downloading "${data.url}" failed with "${data.error}"`)
    })

    subs.search()
        .then(subs => {
            signale.complete({ prefix: '[subtitles]', message: subs })
        })
}
