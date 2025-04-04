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
        const response = await fetch('http://localhost:8000/api/configuration/all');
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
  margin-top: 20px;
}

.toggle-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 20px;
}

.toggle-btn:hover {
  background-color: #0056b3;
}

.config-table {
  width: 80%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

.config-table th, .config-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.config-table th {
  background-color: #f4f4f4;
}

.apply-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

.apply-btn:hover {
  background-color: #0056b3;
}

/* Tooltip for full JSON data */
.action-text {
  position: relative;
  display: inline-block;
  max-width: 500px; /* Limit the width of the truncated text */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.action-text:hover {
  white-space: normal;
  background-color: #f4f4f4;  /* Light grey background when hovered */
  padding: 10px;
  border-radius: 5px;
}
</style>
