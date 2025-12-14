const AudioHelper = {
  async getInputDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((d) => d.kind === "audioinput");
  },

  async getOutputDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((d) => d.kind === "audiooutput");
  },
};

export { AudioHelper };
