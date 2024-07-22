# Spicetify Visualizer
formerly NCS Visualizer

### Audio Visualizer for Spicetify

---

![preview](resources/screenshot.png)

### Installation
* Open the Spicetify config directory by running `spicetify config-dir` from the terminal
* Navigate to `CustomApps` and create a folder `visualizer`
* Download the files in the [dist branch](https://github.com/Konsl/spicetify-visualizer/archive/refs/heads/dist.zip) and copy the files (index.js, manifest.json, etc) into the `visualizer` folder
* Add the app to the Spicetify config by running `spicetify config custom_apps visualizer` from the terminal
* Re-apply Spicetify by running `spicetify apply` from the terminal

### Updating
* Open the Spicetify config directory by running `spicetify config-dir` from the terminal
* Navigate to `CustomApps` and into the folder `visualizer`
* Download the latest files from the [dist branch](https://github.com/Konsl/spicetify-visualizer/archive/refs/heads/dist.zip) and copy the files (index.js, manifest.json, etc) into the `visualizer` folder
* Re-apply Spicetify by running `spicetify apply` from the terminal

### Uninstallation
* Open the Spicetify config directory by running `spicetify config-dir` from the terminal
* Navigate to `CustomApps` and delete the folder `visualizer`
* Remove the app from the Spicetify config by running `spicetify config custom_apps visualizer-` from the terminal
* Re-apply Spicetify by running `spicetify apply` from the terminal

---

### Updating from old NCS Visualizer
* Open the Spicetify config directory by running `spicetify config-dir` from the terminal
* Navigate to `CustomApps` and delete the folder `ncs-visualizer`
* Remove the app from the Spicetify config by running `spicetify config custom_apps ncs-visualizer-` from the terminal
* Follow the new [Installation instructions](#installation)

---

[CSS Snippet for Compatibility with Comfy Theme](https://github.com/Konsl/spicetify-visualizer/issues/21#issuecomment-2050515422)
