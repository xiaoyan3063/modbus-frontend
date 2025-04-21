<template>
    <div class="device-card" :class="{ 'running': device.running }">
      <h3>设备 {{ device.id }}</h3>
      <p>状态: {{ device.running ? '运行中' : '已停止' }}</p>
      <p>当前值: {{ device.value || '--' }}</p>
      <button 
        v-if="!device.running" 
        @click="startDevice"
        class="start-btn"
      >
        启动
      </button>
      <button 
        v-else 
        @click="stopDevice"
        class="stop-btn"
      >
        停止
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DeviceControl',
    props: {
      device: {
        type: Object,
        required: true
      }
    },
    methods: {
      startDevice() {
        this.$emit('control-device', this.device.id, true);
      },
      stopDevice() {
        this.$emit('control-device', this.device.id, false);
      }
    }
  }
  </script>
  
  <style scoped>
  .device-card {
    padding: 15px;
    border-radius: 8px;
    background: #f0f0f0;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .device-card.running {
    background: #e6f7e6;
    border-left: 4px solid #42b983;
  }
  
  h3 {
    margin-top: 0;
  }
  
  button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .start-btn {
    background: #42b983;
    color: white;
  }
  
  .stop-btn {
    background: #ff6b6b;
    color: white;
  }
  
  button:hover {
    opacity: 0.8;
  }
  </style>