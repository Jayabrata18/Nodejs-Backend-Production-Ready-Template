import os from 'os';
export default {
    getSystemHealth: () => {
        return {
            cpuUsage: os.loadavg(),
            totalmemory: `${(os.totalmem() /1024/1024).toFixed(2)} MB`,
            freememory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`,
            uptime: `${os.uptime() / 3600} hours`,
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch(),
            release: os.release(),
            type: os.type(),
            endianness: os.endianness(),
            totalcpus: os.cpus().length,
            currentdate: new Date().toISOString(),
            memoryusage: `${(process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2)} MB`,
            cpus: os.cpus().map((cpu) => {
                return {
                    model: cpu.model,
                    speed: cpu.speed,
                    times: cpu.times
                }
            })
        }
    },
    getApplicationHealth: () => {
        return {
            env: process.env.NODE_ENV,
            memoryusage: {
                heapUsed: `${(process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2)} MB`,
                heapTotal: `${(process.memoryUsage().heapTotal / (1024 * 1024)).toFixed(2)} MB`,
                rss: `${(process.memoryUsage().rss / (1024 * 1024)).toFixed(2)} MB`
            },
            uptime: process.uptime() / 3600,
            pid: process.pid,
            hostname: os.hostname(),
            currentdate: new Date().toISOString()
        }
    }
}