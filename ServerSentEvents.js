class ServerSentEvents {
    constructor() {
        this.listeners = []
    }

    addListener(res, initialData) {
        res.sendData = (data) => {
            res.write("data: " + JSON.stringify(data) + "\n\n")
        }
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        })
        initialData && res.sendData(initialData)
        this.listeners.push(res)
    }

    notifyListeners(data) {
        this.listeners.forEach(listener => listener.sendData(data))
    }

}

module.exports = ServerSentEvents