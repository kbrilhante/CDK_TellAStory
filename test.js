function setup() {
    httpGet('./ibagens/', 'text', true, (response) => {
        console.log(response)
    });
}