const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

function sendLatestRecord(callback) {
    const latestRecord = { id: 1, data: 'latest data' };
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(latestRecord));
        }
    });
    productModel.getLatestRecord((error, latestRecord) => {
        if (error) {
            return res.status(500).json({ success: false, error: 'Lỗi khi truy vấn dữ liệu' });
        }
        if (!latestRecord) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy bản ghi nào' });
        }
        res.status(200).json({ success: true, data: latestRecord });
    });
}

module.exports = {
    sendLatestRecord
};
