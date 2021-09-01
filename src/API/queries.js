export function getInstanceList(provider) {
    if (provider) {
        return fetch('http://netheria.takehome.octoml.ai/hardware')
            .then(data => data.json()).then(jsonData => jsonData.filter((item) => item.provider === provider))
    }
}

export function postBenchmark(benchSpec) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(benchSpec)
    };

    return fetch('http://netheria.takehome.octoml.ai/benchmark', requestOptions)
        .then(response => response)
}

export function postAccelerate(AccSpec) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(AccSpec)
    };

    return fetch('http://netheria.takehome.octoml.ai/accelerate', requestOptions)
        .then(response => response)

}