<template>
  <div id="app">
    <div class="container">
      <h1>PLC设备监控系统</h1>
      <div class="control-panel">
        <device-control 
          v-for="device in devices" 
          :key="device.id"
          :device="device"
          @control-device="handleDeviceControl"
        />

      </div>
      <button @click="refreshData" class="refresh-btn">刷新数据</button>
    </div>
  </div>
</template>

<script>
import DeviceControl from './components/DeviceControl.vue'

export default {
  name: 'App',
  components: {
    DeviceControl
  },
  data() {
    return {
      devices: [],
      refreshInterval: null
    }
  },
  created() {
    this.fetchDeviceData();
    // 每5秒自动刷新数据
    this.refreshInterval = setInterval(this.fetchDeviceData, 5000);
  },
  beforeDestroy() {
    clearInterval(this.refreshInterval);
  },
  methods: {
    async fetchDeviceData() {
      try {
        const response = await this.axios.get('http://localhost:44325/api/device/status');
        console.log("测试",response)
        const status = response.data.status;
        const values = response.data.values;
        
        
        this.devices = Array(8).fill().map((_, i) => ({
          id: i + 1,
          running: 0,//status[i],
          value: values[i]
        }));
        console.log("devices",this.devices)
      } catch (error) {
        console.error('获取设备数据失败:', error);
      }
    },
    async handleDeviceControl(deviceId, start) {
      try {
        await this.axios.post('http://localhost:44325/api/device/control', {
          deviceId: deviceId,
          start: start
        });
        this.fetchDeviceData();
      } catch (error) {
        console.error('控制设备失败:', error);
      }
    },
    refreshData() {
      this.fetchDeviceData();
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.control-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.data-chart {
  margin-bottom: 30px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.refresh-btn {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.refresh-btn:hover {
  background: #369f6b;
}
</style>