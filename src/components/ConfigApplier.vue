<template>
  <div class="config-container">
    <h2>Select Configuration</h2>

    <!-- Button to toggle visibility of configuration table -->
    <button @click="toggleConfigTable" class="toggle-btn">
      {{ showConfigTable ? "Hide Configurations" : "Show Configurations" }}
    </button>

    <!-- Conditionally render the configuration table -->
    <div v-if="showConfigTable">
      <table class="config-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="config in configOptions" :key="config.value">
            <td>
              <input 
                type="checkbox" 
                :id="'config-' + config.value"
                :value="config.value"
                v-model="selectedConfigs"
              />
            </td>
            <td>{{ config.value }}</td>
            <!-- Actions: Show truncated version and full version on hover -->
            <td>
              <div class="action-text" :title="config.actionsJSON">{{ config.actionsTruncated }}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <button @click="applySelectedConfigs" class="apply-btn">
        Apply Selected Configurations
      </button>

      <button @click="applyAllConfigs" class="apply-btn">
        Apply All Configurations
      </button>
    </div>
  </div>
</template>

<script>
import ConfigProcessor from '../libs/configProcessor';

export default {
  name: "ConfigApplier",
  data() {
    return {
      configs: [],  // All configurations from API
      selectedConfigs: [],  // Selected configurations by the user
      configOptions: [],     // List of mapped options with actions in JSON format
      showConfigTable: false // Controls visibility of configuration table
    };
  },
  methods: {
    async fetchConfigs() {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJleHAiOjE3NDM5MDcyNjIsImlzcyI6InlvdXItYXBwIn0.GTibdWns2WgBmGxeqt8GwJud8ONy6DpWTxO6cImOL6g'; // Replace this with your token (can be dynamically fetched from localStorage or manually input)

        const response = await fetch('http://localhost:8000/api/configuration/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`  // Include token in the header
        }
      });

        if (!response.ok) throw new Error('Failed to fetch configurations!');
        const data = await response.json();

        // Process the data to create the configuration options
        this.configs = data;
        this.configOptions = data.map(config => ({
          value: config.ID, // Use ID as a unique value
          label: `ID: ${config.ID} (${config.Actions.length} actions)`,  // Display text
          actionsJSON: JSON.stringify(config.Actions, null, 2), // Full Actions JSON
          actionsTruncated: this.truncateActions(config.Actions) // Truncated Actions text
        }));
        
      } catch (error) {
        console.error("Error fetching configurations:", error);
      }
    },

    toggleConfigTable() {
      this.showConfigTable = !this.showConfigTable; // Toggle visibility of the table
    },

    applySelectedConfigs() {
      if (!this.selectedConfigs.length) {
        alert("Please select at least one configuration!");
        return;
      }

      // Filter selected configurations by ID
      const selected = this.configs.filter(config => 
        this.selectedConfigs.includes(config.ID)
      );
      
      const processor = new ConfigProcessor(selected);
      processor.applyConfigs();
    },

    applyAllConfigs() {
      if (this.configs.length === 0) {
        alert("No configurations available to apply!");
        return;
      }

      const processor = new ConfigProcessor(this.configs);
      processor.applyConfigs();
    },

    // Helper method to truncate the actions to 1000 characters
    truncateActions(actions) {
      const actionsStr = JSON.stringify(actions, null, 2);
      return actionsStr.length > 1000 ? actionsStr.substring(0, 1000) + '...' : actionsStr;
    }
  },
  mounted() {
    this.fetchConfigs(); // Fetch configurations when the component is mounted
  }
};
</script>

<style scoped>
.config-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  max-width: 1200px;
  padding: 0 20px;
}

.toggle-btn {
  background-color: #6c9eff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.toggle-btn:hover {
  background-color: #6c9eff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.toggle-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.config-table {
  width: 100%;
  margin: 2rem 0;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.config-table th,
.config-table td {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
}

.config-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.config-table tr:hover td {
  background-color: #f8f9fa;
}

.apply-btn {
  background-color: #67c23a;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  margin: 0.5rem;
}

.apply-btn:hover {
  background-color: #67c23a;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.action-text {
  position: relative;
  max-width: 500px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.action-text:hover {
  white-space: normal;
  overflow: visible;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: white;
  border: 1px solid #e0e0e0;
  transform: scale(1.02);
}

/* Responsive Design */
@media (max-width: 768px) {
  .config-table {
    width: 100%;
    display: block;
    overflow-x: auto;
  }
  
  .toggle-btn,
  .apply-btn {
    width: 100%;
    margin-bottom: 1rem;
  }
}

/* Ripple Effect */
.toggle-btn::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

.toggle-btn:hover::after {
  width: 200px;
  height: 200px;
}
</style>
